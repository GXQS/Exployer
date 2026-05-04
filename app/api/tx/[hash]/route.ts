import { NextResponse } from 'next/server';
import { getTransaction } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export async function GET(
  request: Request,
  { params }: { params: { hash: string } }
) {
  try {
    const { hash } = params;
    const cacheKey = `tx-${hash}`;
    const cached = cache.get(cacheKey);
    if (cached) return NextResponse.json(cached);
    const tx = await getTransaction(hash);
    if (!tx) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    cache.set(cacheKey, tx, 15000);
    return NextResponse.json(tx);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}
