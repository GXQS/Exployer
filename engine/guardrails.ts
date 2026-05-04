export interface GuardrailCheck {
  passed: boolean;
  reason?: string;
}

const actionLog: { timestamp: number; action: string }[] = [];
const BLOCKED_ACTIONS = ['SHUTDOWN', 'WIPE', 'OVERRIDE_CONSENSUS'];

export function checkGuardrails(action: string, confidence: number): GuardrailCheck {
  // Block explicitly dangerous actions
  if (BLOCKED_ACTIONS.includes(action.toUpperCase())) {
    return { passed: false, reason: `Action "${action}" is blocked by guardrails` };
  }

  // Require minimum confidence for critical actions
  if (action === 'ESCALATE' && confidence < 0.7) {
    return { passed: false, reason: `Insufficient confidence (${confidence.toFixed(2)}) for ESCALATE` };
  }

  // Rate limiting: max 10 actions per minute
  const oneMinuteAgo = Date.now() - 60_000;
  const recentActions = actionLog.filter(a => a.timestamp > oneMinuteAgo);
  if (recentActions.length >= 10) {
    return { passed: false, reason: 'Rate limit exceeded: max 10 actions per minute' };
  }

  actionLog.push({ timestamp: Date.now(), action });
  if (actionLog.length > 200) actionLog.shift();

  return { passed: true };
}

export function getActionRate(): number {
  const oneMinuteAgo = Date.now() - 60_000;
  return actionLog.filter(a => a.timestamp > oneMinuteAgo).length;
}
