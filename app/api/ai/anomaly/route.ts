import { NextResponse } from 'next/server';
import { runAnomalyDetection } from '@/ai/anomaly';
import { getChainStats } from '@/lib/rpc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await getChainStats();
    const anomalies = runAnomalyDetection({
      tps: stats.tps ?? 0,
      mempoolSize: stats.mempoolSize ?? 0,
      gasUsed: 12_000_000,
      gasLimit: 15_000_000,
      blockTime: stats.avgBlockTime ?? 0,
    });
    return NextResponse.json({ anomalies, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: 'Anomaly detection failed' }, { status: 503 });
  }
}
