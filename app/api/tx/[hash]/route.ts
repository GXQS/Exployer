import { NextResponse } from 'next/server';
import { getTransaction } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params;
    const cacheKey = `tx-${hash}`;
    const cached = cache.get(cacheKey);
    if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } });
    const tx = await getTransaction(hash);
    if (!tx) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    cache.set(cacheKey, tx, 10_000);
    return NextResponse.json(tx, { headers: { 'X-Cache': 'MISS' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 400 });
  }
}
