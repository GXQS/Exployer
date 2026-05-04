import { BaseAgent } from './base-agent';
import { getAlerts } from '../ai/alerts';

export class DefenseAgent extends BaseAgent {
  private actionsThisMinute = 0;
  private lastMinuteReset = Date.now();
  private readonly MAX_ACTIONS_PER_MINUTE = 10;

  constructor() {
    super('DefenseEngine', 'defense-agent', 8000);
  }

  protected async tick(): Promise<void> {
    try {
      // Reset per-minute counter
      if (Date.now() - this.lastMinuteReset > 60_000) {
        this.actionsThisMinute = 0;
        this.lastMinuteReset = Date.now();
      }

      const criticalAlerts = getAlerts(['CRITICAL'], 5);

      for (const alert of criticalAlerts) {
        if (!alert.acknowledged && this.actionsThisMinute < this.MAX_ACTIONS_PER_MINUTE) {
          this.logDecision('DEFEND', `Responding to ${alert.type}: ${alert.message}`, 0.85);
          this.actionsThisMinute++;
        }
      }

      const highAlerts = getAlerts(['HIGH'], 3);
      if (highAlerts.length > 0) {
        this.logDecision('MONITOR', `Tracking ${highAlerts.length} high-severity alerts`, 0.7);
      } else {
        this.logDecision('IDLE', 'No active threats detected', 0.99);
      }
    } catch (e) {
      this.logDecision('ERROR', `Defense check failed: ${(e as Error).message}`, 0, false);
    }
  }
}

export const defenseAgent = new DefenseAgent();
