import { NextResponse } from 'next/server';
import { getMempool } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cached = cache.get('mempool');
    if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } });
    const mempool = await getMempool();
    cache.set('mempool', mempool, 1500);
    return NextResponse.json(mempool, { headers: { 'X-Cache': 'MISS' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch mempool' }, { status: 503 });
  }
}
