import { NextResponse } from 'next/server';
import { runAnomalyDetection } from '@/ai/anomaly';
import { getChainStats } from '@/lib/rpc';

export async function GET() {
  try {
    const stats = await getChainStats();
    const anomalies = runAnomalyDetection({
      tps: stats.tps,
      mempoolSize: stats.mempoolSize,
      gasUsed: 12_000_000,
      gasLimit: 15_000_000,
      blockTime: stats.avgBlockTime,
    });
    return NextResponse.json({ anomalies, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Anomaly detection failed' }, { status: 500 });
  }
}
