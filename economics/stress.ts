export interface StressTest {
  scenario: string;
  currentLoad: number;
  projectedLoad: number;
  breakingPoint: number;
  safetyMargin: number;
  recommendation: string;
}

export function runStressTests(data: {
  currentTps: number;
  maxTps: number;
  mempoolSize: number;
  activeValidators: number;
}): StressTest[] {
  const tests: StressTest[] = [
    {
      scenario: 'TPS Saturation',
      currentLoad: data.currentTps / data.maxTps,
      projectedLoad: Math.min(1, (data.currentTps * 1.5) / data.maxTps),
      breakingPoint: data.maxTps,
      safetyMargin: (data.maxTps - data.currentTps) / data.maxTps,
      recommendation: data.currentTps / data.maxTps > 0.8 ? 'Consider scaling' : 'Capacity adequate',
    },
    {
      scenario: 'Validator Failure',
      currentLoad: 1 - data.activeValidators / 20,
      projectedLoad: 1 - (data.activeValidators - 3) / 20,
      breakingPoint: 0.67,
      safetyMargin: data.activeValidators / 20 - 0.67,
      recommendation: data.activeValidators < 15 ? 'WARNING: Near consensus failure' : 'Resilient to failures',
    },
    {
      scenario: 'Mempool Overflow',
      currentLoad: data.mempoolSize / 500,
      projectedLoad: Math.min(1, (data.mempoolSize * 1.3) / 500),
      breakingPoint: 500,
      safetyMargin: (500 - data.mempoolSize) / 500,
      recommendation: data.mempoolSize > 350 ? 'Increase gas floor' : 'Mempool healthy',
    },
  ];

  return tests;
}
