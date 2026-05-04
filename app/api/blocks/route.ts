import { NextResponse } from 'next/server';
import { getLatestBlocks, getChainStats } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = Math.min(50, parseInt(searchParams.get('count') ?? '20'));
    const cacheKey = `blocks-${count}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT', 'X-RateLimit-Limit': '100' },
      });
    }
    const blocks = await getLatestBlocks(count);
    cache.set(cacheKey, blocks, 2000);
    return NextResponse.json(blocks, {
      headers: { 'X-Cache': 'MISS', 'X-RateLimit-Limit': '100' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 500 });
  }
}
