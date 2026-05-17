import { BaseAgent } from './base-agent';
import { getValidators } from '../lib/rpc';
import { createAlert } from '../ai/alerts';

export class ValidatorAgent extends BaseAgent {
  constructor() {
    super('ValidatorMonitor', 'validator-agent', 10000);
  }

  protected async tick(): Promise<void> {
    try {
      const validators = await getValidators();
      const inactive = validators.filter(v => v.status === 'inactive');
      const jailed = validators.filter(v => v.status === 'jailed');
      const lowUptime = validators.filter(v => v.uptime != null && v.uptime < 95);

      if (jailed.length > 0) {
        createAlert(
          'VALIDATOR_JAILED',
          'HIGH',
          `${jailed.length} validator(s) jailed`,
          this.name,
          { validators: jailed.map(v => v.name ?? v.address) },
        );
        this.logDecision('ALERT', `${jailed.length} validators jailed`, 0.9);
      }

      if (inactive.length > 2) {
        createAlert(
          'VALIDATOR_OFFLINE',
          'MEDIUM',
          `${inactive.length} validators offline`,
          this.name,
        );
        this.logDecision('ALERT', `${inactive.length} validators offline`, 0.85);
      }

      if (lowUptime.length > 0) {
        this.logDecision('MONITOR', `${lowUptime.length} validators with low uptime`, 0.7);
      } else {
        this.logDecision('MONITOR', 'Validator set healthy', 0.98);
      }
    } catch (error) {
      this.logDecision('ERROR', `Validator check failed: ${(error as Error).message}`, 0, false);
    }
  }
}

export const validatorAgent = new ValidatorAgent();
