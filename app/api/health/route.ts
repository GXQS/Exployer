import { NextResponse } from 'next/server';
import { getHealthCheck } from '@/lib/rpc';

export async function GET() {
  try {
    const health = await getHealthCheck();
    return NextResponse.json({ ...health, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ status: 'down', timestamp: Date.now() }, { status: 503 });
  }
}
