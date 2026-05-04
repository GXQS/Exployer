export interface EconomicSignals {
  tpsVelocity: number;      // Rate of TPS change
  feePressureIndex: number; // 0-100
  congestionIndex: number;  // 0-100
  utilizationRate: number;  // Gas utilization 0-1
  mempoolPressure: number;  // 0-100
  timestamp: number;
}

let prevTps = 0;
let prevTimestamp = Date.now();

export function computeSignals(data: {
  tps: number;
  gasUsed: number;
  gasLimit: number;
  mempoolSize: number;
  avgGasPrice: number;
  maxGasPrice: number;
}): EconomicSignals {
  const now = Date.now();
  const dt = (now - prevTimestamp) / 1000;
  const tpsVelocity = dt > 0 ? (data.tps - prevTps) / dt : 0;
  prevTps = data.tps;
  prevTimestamp = now;

  const utilizationRate = data.gasUsed / Math.max(1, data.gasLimit);
  const feePressureIndex = Math.min(100, (data.avgGasPrice / Math.max(1, data.maxGasPrice)) * 100);
  const congestionIndex = Math.min(100, (data.mempoolSize / 500) * 100);
  const mempoolPressure = Math.min(100, (data.mempoolSize / 300) * 100);

  return {
    tpsVelocity,
    feePressureIndex,
    congestionIndex,
    utilizationRate,
    mempoolPressure,
    timestamp: now,
  };
}
