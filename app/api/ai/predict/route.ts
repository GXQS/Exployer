import { NextResponse } from 'next/server';
import { predictTps, predictMempool, predictBlockTime, predictGasPrice } from '@/ai/predictor';
import { getChainStats } from '@/lib/rpc';

export async function GET() {
  try {
    const stats = await getChainStats();
    const predictions = [
      predictTps(stats.tps),
      predictMempool(stats.mempoolSize),
      predictBlockTime(stats.avgBlockTime),
      predictGasPrice(25),
    ];
    return NextResponse.json({ predictions, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Prediction failed' }, { status: 500 });
  }
}
