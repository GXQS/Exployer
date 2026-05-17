import { streamBlocks } from '@/lib/core/client';
import { getLatestBlocks } from '@/lib/rpc';

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

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const call = streamBlocks({ fromHeight });
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

      controller.enqueue(serialize({ type: 'ready', fromHeight }));

      call.on('data', async () => {
        try {
          const latest = await getLatestBlocks(1);
          if (latest[0]) {
            controller.enqueue(serialize(latest[0]));
          }
        } catch {
          close();
          controller.error(new Error('Failed to map streamed block'));
        }
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
