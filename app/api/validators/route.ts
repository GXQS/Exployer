import { NextResponse } from 'next/server';
import { getValidators } from '@/lib/rpc';
import { cache } from '@/lib/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cached = cache.get('validators');
    if (cached) return NextResponse.json(cached, { headers: { 'X-Cache': 'HIT' } });
    const validators = await getValidators();
    cache.set('validators', validators, 10000);
    return NextResponse.json(validators, { headers: { 'X-Cache': 'MISS' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch validators' }, { status: 500 });
  }
}
