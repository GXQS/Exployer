import { NextResponse } from 'next/server';
import { getRecentTransactions } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseInt(searchParams.get('count') ?? '10', 10);
    const count = Math.min(50, Number.isNaN(parsed) || parsed < 1 ? 10 : parsed);
    const cacheKey = `transactions-${count}`;
    const cached = cache.get(cacheKey);
    if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } });
    const transactions = await getRecentTransactions(count);
    cache.set(cacheKey, transactions, 1500);
    return NextResponse.json(transactions, { headers: { 'X-Cache': 'MISS' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 503 });
  }
}
