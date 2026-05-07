import { NextResponse } from 'next/server';
import { getAlerts, acknowledgeAlert } from '@/ai/alerts';

const MAX_LIMIT = 100;
const VALID_SEVERITIES = new Set(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity');
    const rawLimit = parseInt(searchParams.get('limit') ?? '20', 10);
    const limit = Number.isNaN(rawLimit) || rawLimit < 1 ? 20 : Math.min(rawLimit, MAX_LIMIT);

    if (severity !== null && !VALID_SEVERITIES.has(severity)) {
      return NextResponse.json({ error: 'Invalid severity value' }, { status: 400 });
    }

    const severities = severity ? [severity as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'] : undefined;
    const alerts = getAlerts(severities, limit);
    return NextResponse.json({ alerts, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Body must be a JSON object' }, { status: 400 });
    }

    const { id } = body as Record<string, unknown>;
    if (typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'id must be a non-empty string' }, { status: 400 });
    }

    const ok = acknowledgeAlert(id.trim());
    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json({ error: 'Failed to acknowledge alert' }, { status: 500 });
  }
}
