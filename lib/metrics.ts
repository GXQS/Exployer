import type { Block, ChainStats } from './explorer-types';

interface TpsPoint {
  timestamp: number;
  tps: number;
}

const tpsHistory: TpsPoint[] = [];
const MAX_HISTORY = 60;

export function recordTps(tps: number): void {
  tpsHistory.push({ timestamp: Date.now(), tps });
  if (tpsHistory.length > MAX_HISTORY) {
    tpsHistory.shift();
  }
}

export function getAverageTps(windowMs = 60_000): number {
  const cutoff = Date.now() - windowMs;
  const recent = tpsHistory.filter(point => point.timestamp > cutoff);
  if (recent.length === 0) return 0;
  return recent.reduce((sum, point) => sum + point.tps, 0) / recent.length;
}

export function getTpsHistory(): TpsPoint[] {
  return [...tpsHistory];
}

export function computeHealthScore(stats: ChainStats, validatorUptime: number): number {
  let score = 100;
  const avgBlockTime = stats.avgBlockTime ?? 0;
  const mempoolSize = stats.mempoolSize ?? 0;

  if (avgBlockTime > 2.5) score -= 10;
  if (avgBlockTime > 3.0) score -= 20;

  if (mempoolSize > 200) score -= 10;
  if (mempoolSize > 400) score -= 20;

  const participation = stats.activeValidators / 20;
  if (participation < 0.9) score -= 15;
  if (participation < 0.75) score -= 25;

  if (validatorUptime < 98) score -= 5;
  if (validatorUptime < 95) score -= 15;

  return Math.max(0, Math.min(100, score));
}

export function computeBlockRate(blocks: Block[]): number {
  if (blocks.length < 2) return 0;
  const sorted = [...blocks].sort((left, right) => left.timestamp - right.timestamp);
  const timeDiff = sorted[sorted.length - 1].timestamp - sorted[0].timestamp;
  if (timeDiff === 0) return 0;
  return ((sorted.length - 1) / timeDiff) * 1000;
}

export function formatHealthScore(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'OPTIMAL', color: '#00ffe1' };
  if (score >= 75) return { label: 'HEALTHY', color: '#00ff88' };
  if (score >= 60) return { label: 'DEGRADED', color: '#ffaa00' };
  if (score >= 40) return { label: 'STRESSED', color: '#ff6600' };
  return { label: 'CRITICAL', color: '#ff0044' };
}
