export interface SimulationScenario {
  name: string;
  description: string;
  params: Record<string, number>;
}

export interface SimulationResult {
  scenario: string;
  tpsImpact: number;
  mempoolImpact: number;
  feeImpact: number;
  blockTimeImpact: number;
  healthScoreImpact: number;
  recommendation: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export const SCENARIOS: SimulationScenario[] = [
  {
    name: 'Gas Floor +50%',
    description: 'Increase minimum gas price by 50%',
    params: { gasPriceMultiplier: 1.5 },
  },
  {
    name: 'Validator Drop 25%',
    description: 'Simulate 5 validators going offline',
    params: { validatorDropCount: 5 },
  },
  {
    name: 'Traffic Surge 3x',
    description: 'Simulate 3x normal transaction volume',
    params: { trafficMultiplier: 3 },
  },
  {
    name: 'Network Partition',
    description: 'Simulate 30% network partition',
    params: { partitionPercent: 0.3 },
  },
];

export function runSimulation(
  scenario: SimulationScenario,
  baseState: { tps: number; mempoolSize: number; avgBlockTime: number; healthScore: number }
): SimulationResult {
  const p = scenario.params;
  let tpsImpact = 0;
  let mempoolImpact = 0;
  let feeImpact = 0;
  let blockTimeImpact = 0;
  let healthScoreImpact = 0;
  let recommendation = '';
  let risk: SimulationResult['risk'] = 'LOW';

  if (p.gasPriceMultiplier) {
    tpsImpact = -baseState.tps * 0.15;
    mempoolImpact = -baseState.mempoolSize * 0.3;
    feeImpact = p.gasPriceMultiplier - 1;
    blockTimeImpact = -0.1;
    healthScoreImpact = 5;
    recommendation = 'Reduces congestion but may decrease throughput';
    risk = 'LOW';
  } else if (p.validatorDropCount) {
    const dropFraction = p.validatorDropCount / 20;
    tpsImpact = -baseState.tps * dropFraction * 0.5;
    blockTimeImpact = dropFraction * 2;
    healthScoreImpact = -dropFraction * 40;
    mempoolImpact = baseState.mempoolSize * dropFraction * 0.5;
    feeImpact = dropFraction * 0.3;
    recommendation = p.validatorDropCount > 6 ? 'CRITICAL: May break consensus' : 'Monitor closely';
    risk = p.validatorDropCount > 6 ? 'CRITICAL' : p.validatorDropCount > 4 ? 'HIGH' : 'MEDIUM';
  } else if (p.trafficMultiplier) {
    tpsImpact = baseState.tps * (p.trafficMultiplier - 1) * 0.7;
    mempoolImpact = baseState.mempoolSize * (p.trafficMultiplier - 1);
    feeImpact = (p.trafficMultiplier - 1) * 0.5;
    blockTimeImpact = (p.trafficMultiplier - 1) * 0.3;
    healthScoreImpact = -(p.trafficMultiplier - 1) * 20;
    recommendation = 'Scale validators and increase block size limit';
    risk = p.trafficMultiplier > 4 ? 'CRITICAL' : 'HIGH';
  } else if (p.partitionPercent) {
    tpsImpact = -baseState.tps * p.partitionPercent;
    blockTimeImpact = p.partitionPercent * 5;
    healthScoreImpact = -p.partitionPercent * 60;
    mempoolImpact = baseState.mempoolSize * p.partitionPercent;
    feeImpact = p.partitionPercent * 0.5;
    recommendation = 'Network partition detected - initiate recovery protocol';
    risk = p.partitionPercent > 0.33 ? 'CRITICAL' : 'HIGH';
  }

  return {
    scenario: scenario.name,
    tpsImpact,
    mempoolImpact,
    feeImpact,
    blockTimeImpact,
    healthScoreImpact,
    recommendation,
    risk,
  };
}
