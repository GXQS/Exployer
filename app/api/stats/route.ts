import { NextResponse } from 'next/server';
import { getChainStats } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cached = cache.get('stats');
    if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } });
    const stats = await getChainStats();
    cache.set('stats', stats, 1500);
    return NextResponse.json(stats, { headers: { 'X-Cache': 'MISS' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 503 });
  }
}
