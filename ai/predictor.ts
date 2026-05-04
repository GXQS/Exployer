export interface Prediction {
  metric: string;
  current: number;
  prediction: number;
  confidence: number;
  horizon: string;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface Series {
  values: number[];
  timestamps: number[];
}

const series: Record<string, Series> = {};

function addToSeries(key: string, value: number): void {
  if (!series[key]) series[key] = { values: [], timestamps: [] };
  series[key].values.push(value);
  series[key].timestamps.push(Date.now());
  if (series[key].values.length > 50) {
    series[key].values.shift();
    series[key].timestamps.shift();
  }
}

function exponentialSmoothing(values: number[], alpha = 0.3): number[] {
  if (values.length === 0) return [];
  const smoothed = [values[0]];
  for (let i = 1; i < values.length; i++) {
    smoothed.push(alpha * values[i] + (1 - alpha) * smoothed[i - 1]);
  }
  return smoothed;
}

function linearTrend(values: number[]): { slope: number; intercept: number } {
  const n = values.length;
  if (n < 2) return { slope: 0, intercept: values[0] ?? 0 };
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

function computeConfidence(values: number[], predicted: number): number {
  if (values.length < 3) return 0.5;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const std = Math.sqrt(values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length);
  const cv = std / (Math.abs(mean) + 1);
  return Math.max(0.3, Math.min(0.99, 1 - cv * 0.5));
}

export function predictMetric(
  key: string,
  currentValue: number,
  unit: string,
  horizonSteps = 5
): Prediction {
  addToSeries(key, currentValue);
  const s = series[key];

  if (s.values.length < 3) {
    return {
      metric: key,
      current: currentValue,
      prediction: currentValue,
      confidence: 0.5,
      horizon: '10s',
      trend: 'stable',
      unit,
    };
  }

  const smoothed = exponentialSmoothing(s.values);
  const { slope } = linearTrend(smoothed);
  const lastSmoothed = smoothed[smoothed.length - 1];
  const predicted = lastSmoothed + slope * horizonSteps;
  const confidence = computeConfidence(s.values, predicted);

  const trend: Prediction['trend'] =
    Math.abs(slope) < 0.01 * lastSmoothed ? 'stable' : slope > 0 ? 'up' : 'down';

  return {
    metric: key,
    current: currentValue,
    prediction: Math.max(0, predicted),
    confidence,
    horizon: `${horizonSteps * 2}s`,
    trend,
    unit,
  };
}

export function predictTps(tps: number): Prediction {
  return predictMetric('tps', tps, 'tx/s');
}

export function predictMempool(size: number): Prediction {
  return predictMetric('mempool', size, 'txs');
}

export function predictBlockTime(blockTime: number): Prediction {
  return predictMetric('blockTime', blockTime, 's');
}

export function predictGasPrice(gasPrice: number): Prediction {
  return predictMetric('gasPrice', gasPrice, 'gwei');
}
