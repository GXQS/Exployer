import { NextResponse } from 'next/server';
import { predictTps, predictMempool, predictBlockTime, predictGasPrice } from '@/ai/predictor';
import { getChainStats } from '@/lib/rpc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await getChainStats();
    const predictions = [
      predictTps(stats.tps ?? 0),
      predictMempool(stats.mempoolSize ?? 0),
      predictBlockTime(stats.avgBlockTime ?? 0),
      predictGasPrice(25),
    ];
    return NextResponse.json({ predictions, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Prediction failed' }, { status: 503 });
  }
}
