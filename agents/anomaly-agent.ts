import { BaseAgent } from './base-agent';
import { runAnomalyDetection } from '../ai/anomaly';
import { createAlert } from '../ai/alerts';
import { getChainStats } from '../lib/rpc';

export class AnomalyAgent extends BaseAgent {
  constructor() {
    super('AnomalyDetector', 'anomaly-agent', 3000);
  }

  protected async tick(): Promise<void> {
    try {
      const stats = await getChainStats();
      const anomalies = runAnomalyDetection({
        tps: stats.tps,
        mempoolSize: stats.mempoolSize,
        gasUsed: 12_000_000,
        gasLimit: 15_000_000,
        blockTime: stats.avgBlockTime,
      });

      for (const anomaly of anomalies) {
        createAlert(
          anomaly.type,
          anomaly.severity,
          anomaly.message,
          this.name,
          anomaly.metadata
        );
        this.logDecision('ALERT', anomaly.message, anomaly.score / 100);
      }

      if (anomalies.length === 0) {
        this.logDecision('MONITOR', 'Chain metrics nominal', 0.95);
      }
    } catch (e) {
      this.logDecision('ERROR', `Detection failed: ${(e as Error).message}`, 0, false);
    }
  }
}

export const anomalyAgent = new AnomalyAgent();
