interface DataPoint {
  timestamp: number;
  value: number;
}

export interface Anomaly {
  id: string;
  type: 'TPS_SPIKE' | 'TPS_DROP' | 'MEMPOOL_SURGE' | 'VALIDATOR_DOWN' | 'GAS_SPIKE' | 'BLOCK_DELAY' | 'FEE_SPIKE';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  score: number;
  timestamp: number;
  message: string;
  metadata: Record<string, unknown>;
}

const tpsWindow: DataPoint[] = [];
const mempoolWindow: DataPoint[] = [];
const gasWindow: DataPoint[] = [];
const blockTimeWindow: DataPoint[] = [];

function addPoint(window: DataPoint[], value: number, maxLen = 30): void {
  window.push({ timestamp: Date.now(), value });
  if (window.length > maxLen) window.shift();
}

function computeStats(window: DataPoint[]): { mean: number; std: number } {
  if (window.length === 0) return { mean: 0, std: 0 };
  const mean = window.reduce((s, p) => s + p.value, 0) / window.length;
  const variance = window.reduce((s, p) => s + Math.pow(p.value - mean, 2), 0) / window.length;
  return { mean, std: Math.sqrt(variance) };
}

function zScore(value: number, mean: number, std: number): number {
  if (std === 0) return 0;
  return Math.abs((value - mean) / std);
}

function getSeverity(z: number): Anomaly['severity'] {
  if (z > 3.5) return 'CRITICAL';
  if (z > 2.5) return 'HIGH';
  if (z > 2.0) return 'MEDIUM';
  return 'LOW';
}

let anomalyCounter = 0;

export function detectTpsAnomaly(currentTps: number): Anomaly | null {
  addPoint(tpsWindow, currentTps);
  if (tpsWindow.length < 5) return null;

  const { mean, std } = computeStats(tpsWindow.slice(0, -1));
  const z = zScore(currentTps, mean, std);

  if (z > 2.0) {
    const isSpike = currentTps > mean;
    return {
      id: `tps-${++anomalyCounter}`,
      type: isSpike ? 'TPS_SPIKE' : 'TPS_DROP',
      severity: getSeverity(z),
      score: Math.min(100, Math.round(z * 25)),
      timestamp: Date.now(),
      message: isSpike
        ? `TPS spike detected: ${currentTps.toFixed(0)} (avg: ${mean.toFixed(0)})`
        : `TPS drop detected: ${currentTps.toFixed(0)} (avg: ${mean.toFixed(0)})`,
      metadata: { currentTps, mean, std, zScore: z },
    };
  }
  return null;
}

export function detectMempoolAnomaly(mempoolSize: number): Anomaly | null {
  addPoint(mempoolWindow, mempoolSize);
  if (mempoolWindow.length < 5) return null;

  if (mempoolSize > 300) {
    return {
      id: `mempool-${++anomalyCounter}`,
      type: 'MEMPOOL_SURGE',
      severity: mempoolSize > 500 ? 'CRITICAL' : mempoolSize > 400 ? 'HIGH' : 'MEDIUM',
      score: Math.min(100, Math.round((mempoolSize / 500) * 100)),
      timestamp: Date.now(),
      message: `Mempool surge: ${mempoolSize} pending transactions`,
      metadata: { mempoolSize },
    };
  }
  return null;
}

export function detectGasAnomaly(gasUsed: number, gasLimit: number): Anomaly | null {
  const utilization = gasUsed / gasLimit;
  addPoint(gasWindow, utilization);
  if (gasWindow.length < 5) return null;

  const { mean, std } = computeStats(gasWindow.slice(0, -1));
  const z = zScore(utilization, mean, std);

  if (z > 2.0 && utilization > 0.9) {
    return {
      id: `gas-${++anomalyCounter}`,
      type: 'GAS_SPIKE',
      severity: utilization > 0.98 ? 'CRITICAL' : 'HIGH',
      score: Math.round(utilization * 100),
      timestamp: Date.now(),
      message: `Gas utilization at ${(utilization * 100).toFixed(1)}%`,
      metadata: { gasUsed, gasLimit, utilization, zScore: z },
    };
  }
  return null;
}

export function detectBlockDelayAnomaly(blockTime: number): Anomaly | null {
  addPoint(blockTimeWindow, blockTime);
  if (blockTimeWindow.length < 5) return null;

  if (blockTime > 4.0) {
    return {
      id: `blockdelay-${++anomalyCounter}`,
      type: 'BLOCK_DELAY',
      severity: blockTime > 6.0 ? 'CRITICAL' : blockTime > 5.0 ? 'HIGH' : 'MEDIUM',
      score: Math.min(100, Math.round(((blockTime - 2.0) / 4.0) * 100)),
      timestamp: Date.now(),
      message: `Block delay detected: ${blockTime.toFixed(2)}s (target: 2s)`,
      metadata: { blockTime },
    };
  }
  return null;
}

export function runAnomalyDetection(data: {
  tps: number;
  mempoolSize: number;
  gasUsed: number;
  gasLimit: number;
  blockTime: number;
}): Anomaly[] {
  const anomalies: Anomaly[] = [];
  const tpsA = detectTpsAnomaly(data.tps);
  const memA = detectMempoolAnomaly(data.mempoolSize);
  const gasA = detectGasAnomaly(data.gasUsed, data.gasLimit);
  const blockA = detectBlockDelayAnomaly(data.blockTime);

  if (tpsA) anomalies.push(tpsA);
  if (memA) anomalies.push(memA);
  if (gasA) anomalies.push(gasA);
  if (blockA) anomalies.push(blockA);

  return anomalies;
}
