export interface HealthScore {
  overall: number;
  components: {
    blockHealth: number;
    validatorHealth: number;
    mempoolHealth: number;
    networkHealth: number;
  };
  label: string;
  color: string;
  trend: 'improving' | 'stable' | 'degrading';
}

const scoreHistory: number[] = [];

export function computeChainHealth(data: {
  avgBlockTime: number;
  activeValidators: number;
  totalValidators: number;
  avgValidatorUptime: number;
  mempoolSize: number;
  tps: number;
  networkLatency: number;
}): HealthScore {
  // Block health (0-100)
  const blockHealth = Math.max(0, 100 - Math.max(0, (data.avgBlockTime - 2) * 25));

  // Validator health (0-100)
  const participationRate = data.activeValidators / Math.max(1, data.totalValidators);
  const validatorHealth = Math.round(
    participationRate * 60 + (data.avgValidatorUptime / 100) * 40
  );

  // Mempool health (0-100)
  const mempoolHealth = Math.max(0, 100 - Math.round((data.mempoolSize / 500) * 100));

  // Network health (0-100)
  const networkHealth = Math.max(0, 100 - Math.round(data.networkLatency / 2));

  const overall = Math.round(
    blockHealth * 0.3 + validatorHealth * 0.3 + mempoolHealth * 0.2 + networkHealth * 0.2
  );

  scoreHistory.push(overall);
  if (scoreHistory.length > 10) scoreHistory.shift();

  let trend: HealthScore['trend'] = 'stable';
  if (scoreHistory.length >= 3) {
    const recent = scoreHistory.slice(-3);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    if (overall > avg + 2) trend = 'improving';
    else if (overall < avg - 2) trend = 'degrading';
  }

  let label: string;
  let color: string;
  if (overall >= 90) { label = 'OPTIMAL'; color = '#00ffe1'; }
  else if (overall >= 75) { label = 'HEALTHY'; color = '#00ff88'; }
  else if (overall >= 60) { label = 'DEGRADED'; color = '#ffaa00'; }
  else if (overall >= 40) { label = 'STRESSED'; color = '#ff6600'; }
  else { label = 'CRITICAL'; color = '#ff0044'; }

  return {
    overall,
    components: { blockHealth, validatorHealth, mempoolHealth, networkHealth },
    label,
    color,
    trend,
  };
}
