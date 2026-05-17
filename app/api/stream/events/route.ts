import { streamEvents } from '@/lib/core/client';
import { mapCoreChainEvent } from '@/lib/core/mappers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const encoder = new TextEncoder();

function serialize(data: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromHeight = Math.max(0, Number.parseInt(searchParams.get('fromHeight') ?? '0', 10) || 0);
  const eventTypes = searchParams.getAll('eventType');

  const readable = new ReadableStream<Uint8Array>({
    start(controller) {
      const call = streamEvents({ fromHeight, eventTypes });
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(': keep-alive\n\n'));
      }, 15_000);

      const close = () => {
        clearInterval(heartbeat);
        call.cancel();
      };

      request.signal.addEventListener('abort', () => {
        close();
        controller.close();
      });

      controller.enqueue(serialize({ type: 'ready', fromHeight, eventTypes }));

      call.on('data', (event) => {
        controller.enqueue(serialize(mapCoreChainEvent(event)));
      });

      call.on('error', (error) => {
        close();
        if (!request.signal.aborted) {
          controller.error(error);
        }
      });

      call.on('end', () => {
        close();
        if (!request.signal.aborted) {
          controller.close();
        }
      });
    },
    cancel() {
      return undefined;
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
