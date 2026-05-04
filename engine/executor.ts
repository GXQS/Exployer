import type { Decision } from './decision';

export interface ExecutionResult {
  decisionId: string;
  success: boolean;
  message: string;
  timestamp: number;
}

const executionLog: ExecutionResult[] = [];

export async function executeDecision(decision: Decision): Promise<ExecutionResult> {
  let success = true;
  let message = '';

  switch (decision.action) {
    case 'ESCALATE':
      message = `Escalated critical event: ${decision.reason}`;
      break;
    case 'ALERT':
      message = `Alert dispatched: ${decision.reason}`;
      break;
    case 'THROTTLE':
      message = `Throttle signal sent: ${decision.reason}`;
      break;
    case 'PRIORITIZE':
      message = `Prioritization applied: ${decision.reason}`;
      break;
    case 'IGNORE':
      message = `No action required: ${decision.reason}`;
      break;
    default:
      success = false;
      message = `Unknown action: ${decision.action}`;
  }

  const result: ExecutionResult = {
    decisionId: decision.id,
    success,
    message,
    timestamp: Date.now(),
  };

  executionLog.unshift(result);
  if (executionLog.length > 100) executionLog.pop();

  return result;
}

export function getExecutionLog(limit = 20): ExecutionResult[] {
  return executionLog.slice(0, limit);
}
