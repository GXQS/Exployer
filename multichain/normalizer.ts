export interface ChainSnapshot {
  chain: string;
  blockHeight: number;
  tps: number;
  mempoolSize: number;
  validatorCount: number;
  latency: number;
  status: 'online' | 'degraded' | 'offline';
  health: number;
  timestamp: number;
}

export function normalize(raw: Omit<ChainSnapshot, 'timestamp'>): ChainSnapshot {
  return {
    ...raw,
    tps: Math.max(0, raw.tps),
    mempoolSize: Math.max(0, raw.mempoolSize),
    health: Math.min(100, Math.max(0, raw.health)),
    latency: Math.max(0, raw.latency),
    timestamp: Date.now(),
  };
}
