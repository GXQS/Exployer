import { NextResponse } from 'next/server';
import { getAlerts, acknowledgeAlert } from '@/ai/alerts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity');
    const limit = parseInt(searchParams.get('limit') ?? '20');
    const severities = severity ? [severity as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'] : undefined;
    const alerts = getAlerts(severities, limit);
    return NextResponse.json({ alerts, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const ok = acknowledgeAlert(id);
    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json({ error: 'Failed to acknowledge alert' }, { status: 500 });
  }
}
