import { NextResponse } from 'next/server';
import { getHealthCheck } from '@/lib/rpc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const health = await getHealthCheck();
  return NextResponse.json({ ...health, timestamp: Date.now() }, { status: health.status === 'down' ? 503 : 200 });
}
