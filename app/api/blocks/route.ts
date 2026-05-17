import { NextResponse } from 'next/server';
import { getLatestBlocks } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseInt(searchParams.get('count') ?? '20', 10);
    const count = Math.min(50, Number.isNaN(parsed) || parsed < 1 ? 20 : parsed);
    const cacheKey = `blocks-${count}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT', 'X-RateLimit-Limit': '100' },
      });
    }
    const blocks = await getLatestBlocks(count);
    cache.set(cacheKey, blocks, 1500);
    return NextResponse.json(blocks, {
      headers: { 'X-Cache': 'MISS', 'X-RateLimit-Limit': '100' },
    });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 503 });
  }
}
