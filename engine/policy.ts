export interface Policy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: string;
  action: string;
  priority: number;
}

const policies: Policy[] = [
  {
    id: 'p1',
    name: 'Critical Escalation',
    description: 'Escalate all critical anomalies immediately',
    enabled: true,
    condition: 'severity === CRITICAL',
    action: 'ESCALATE + ALERT',
    priority: 1,
  },
  {
    id: 'p2',
    name: 'Mempool Throttle',
    description: 'Throttle transactions when mempool > 400',
    enabled: true,
    condition: 'mempoolSize > 400',
    action: 'THROTTLE',
    priority: 2,
  },
  {
    id: 'p3',
    name: 'Validator Guard',
    description: 'Alert when active validators drop below 15',
    enabled: true,
    condition: 'activeValidators < 15',
    action: 'ALERT + ESCALATE',
    priority: 1,
  },
  {
    id: 'p4',
    name: 'Gas Price Monitor',
    description: 'Monitor gas spikes above 90% utilization',
    enabled: true,
    condition: 'gasUtilization > 0.9',
    action: 'ALERT',
    priority: 3,
  },
];

export function getPolicies(): Policy[] {
  return [...policies];
}

export function togglePolicy(id: string): boolean {
  const policy = policies.find(p => p.id === id);
  if (policy) {
    policy.enabled = !policy.enabled;
    return policy.enabled;
  }
  return false;
}

export function evaluatePolicies(state: Record<string, number>): string[] {
  const triggered: string[] = [];
  for (const policy of policies) {
    if (!policy.enabled) continue;
    // Simple evaluation - in production would use a proper rule engine
    if (policy.condition.includes('mempoolSize') && state.mempoolSize > 400) {
      triggered.push(policy.id);
    }
  }
  return triggered;
}
