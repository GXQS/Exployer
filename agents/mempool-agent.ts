import { BaseAgent } from './base-agent';
import { getMempool } from '../lib/rpc';
import { createAlert } from '../ai/alerts';

export class MempoolAgent extends BaseAgent {
  private prevSize = 0;

  constructor() {
    super('MempoolMonitor', 'mempool-agent', 5000);
  }

  protected async tick(): Promise<void> {
    try {
      const mempool = await getMempool();
      const size = mempool.length;
      const growth = size - this.prevSize;
      const growthRate = this.prevSize > 0 ? growth / this.prevSize : 0;

      if (size > 400) {
        createAlert('MEMPOOL_CONGESTION', 'HIGH', `Critical mempool congestion: ${size} txs`, this.name, { size });
        this.logDecision('THROTTLE', `Mempool at ${size} txs`, 0.9);
      } else if (size > 250) {
        createAlert('MEMPOOL_HIGH', 'MEDIUM', `Mempool elevated: ${size} txs`, this.name, { size });
        this.logDecision('MONITOR', `Mempool at ${size} txs`, 0.75);
      } else {
        this.logDecision('MONITOR', `Mempool nominal: ${size} txs`, 0.95);
      }

      if (growthRate > 0.3) {
        createAlert('MEMPOOL_GROWTH', 'MEDIUM', `Rapid mempool growth: +${Math.round(growthRate * 100)}%`, this.name);
        this.logDecision('ALERT', `Rapid growth: ${Math.round(growthRate * 100)}%`, 0.8);
      }

      this.prevSize = size;
    } catch (e) {
      this.logDecision('ERROR', `Mempool check failed: ${(e as Error).message}`, 0, false);
    }
  }
}

export const mempoolAgent = new MempoolAgent();
