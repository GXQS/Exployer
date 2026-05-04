import type { Anomaly } from '../ai/anomaly';
import type { Prediction } from '../ai/predictor';

export type ActionType = 'ALERT' | 'THROTTLE' | 'PRIORITIZE' | 'IGNORE' | 'ESCALATE';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export interface Decision {
  id: string;
  action: ActionType;
  confidence: number;
  reason: string;
  riskLevel: RiskLevel;
  timestamp: number;
  anomalies: string[];
}

let decisionCounter = 0;

function computeRiskLevel(anomalies: Anomaly[], predictions: Prediction[]): RiskLevel {
  const criticalCount = anomalies.filter(a => a.severity === 'CRITICAL').length;
  const highCount = anomalies.filter(a => a.severity === 'HIGH').length;

  if (criticalCount > 0) return 'CRITICAL';
  if (highCount > 1) return 'HIGH';
  if (highCount > 0) return 'MEDIUM';

  const badPredictions = predictions.filter(p => p.trend === 'down' && p.confidence > 0.7);
  if (badPredictions.length > 1) return 'MEDIUM';

  if (anomalies.length > 0) return 'LOW';
  return 'NONE';
}

function determineAction(riskLevel: RiskLevel, anomalies: Anomaly[]): ActionType {
  switch (riskLevel) {
    case 'CRITICAL': return 'ESCALATE';
    case 'HIGH': return 'ALERT';
    case 'MEDIUM': return 'THROTTLE';
    case 'LOW': return 'PRIORITIZE';
    default: return 'IGNORE';
  }
}

export function makeDecision(
  anomalies: Anomaly[],
  predictions: Prediction[],
  chainState: { tps: number; mempoolSize: number; activeValidators: number }
): Decision {
  const riskLevel = computeRiskLevel(anomalies, predictions);
  const action = determineAction(riskLevel, anomalies);

  const reasons: string[] = [];
  if (anomalies.length > 0) {
    reasons.push(`${anomalies.length} anomalie(s) detected`);
  }
  if (chainState.mempoolSize > 300) {
    reasons.push(`mempool congestion (${chainState.mempoolSize} txs)`);
  }
  if (chainState.activeValidators < 16) {
    reasons.push(`low validator count (${chainState.activeValidators})`);
  }
  if (reasons.length === 0) reasons.push('nominal chain state');

  const maxScore = anomalies.reduce((max, a) => Math.max(max, a.score), 0);
  const confidence = anomalies.length > 0 ? maxScore / 100 : 0.95;

  return {
    id: `decision-${++decisionCounter}`,
    action,
    confidence,
    reason: reasons.join('; '),
    riskLevel,
    timestamp: Date.now(),
    anomalies: anomalies.map(a => a.id),
  };
}
