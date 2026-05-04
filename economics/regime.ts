export type MarketRegime = 'EXPANSION' | 'STABLE' | 'CONGESTED' | 'STRESSED' | 'CRITICAL';

export interface RegimeData {
  regime: MarketRegime;
  confidence: number;
  indicators: string[];
  color: string;
}

export function detectRegime(data: {
  tps: number;
  avgBlockTime: number;
  mempoolSize: number;
  activeValidators: number;
  totalValidators: number;
}): RegimeData {
  const tpsNorm = data.tps / 5000;
  const blockTimeOk = data.avgBlockTime < 2.5;
  const mempoolOk = data.mempoolSize < 200;
  const validatorRate = data.activeValidators / Math.max(1, data.totalValidators);
  const indicators: string[] = [];

  if (data.mempoolSize > 400) indicators.push('MEMPOOL_CRITICAL');
  if (!blockTimeOk) indicators.push('BLOCK_DELAY');
  if (validatorRate < 0.75) indicators.push('LOW_PARTICIPATION');
  if (tpsNorm > 0.9) indicators.push('HIGH_THROUGHPUT');
  if (tpsNorm > 0.8 && blockTimeOk && mempoolOk) indicators.push('EXPANSION');

  let regime: MarketRegime;
  let confidence: number;
  let color: string;

  if (indicators.includes('MEMPOOL_CRITICAL') || indicators.includes('LOW_PARTICIPATION')) {
    regime = 'CRITICAL'; confidence = 0.9; color = '#ff0044';
  } else if (!blockTimeOk || data.mempoolSize > 300) {
    regime = 'STRESSED'; confidence = 0.8; color = '#ff6600';
  } else if (data.mempoolSize > 150 || !mempoolOk) {
    regime = 'CONGESTED'; confidence = 0.75; color = '#ffaa00';
  } else if (indicators.includes('EXPANSION')) {
    regime = 'EXPANSION'; confidence = 0.85; color = '#00ffe1';
  } else {
    regime = 'STABLE'; confidence = 0.95; color = '#00ff88';
  }

  return { regime, confidence, indicators, color };
}
