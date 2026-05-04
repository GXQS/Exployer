export interface LiquidityMetrics {
  available: number;
  locked: number;
  utilization: number;
  depth: number;
  spreadBps: number;
}

export function estimateLiquidity(totalStake: number, tps: number, mempoolSize: number): LiquidityMetrics {
  const locked = totalStake * 0.85;
  const available = totalStake - locked;
  const utilization = Math.min(1, (tps / 5000) * 0.8 + (mempoolSize / 500) * 0.2);
  const depth = available * (1 - utilization * 0.3);
  const spreadBps = Math.max(1, 5 + utilization * 20);

  return { available, locked, utilization, depth, spreadBps };
}
