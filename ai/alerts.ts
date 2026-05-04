export interface Alert {
  id: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  timestamp: number;
  acknowledged: boolean;
  source: string;
  metadata?: Record<string, unknown>;
}

const alerts: Alert[] = [];
const cooldowns = new Map<string, number>();
const COOLDOWN_MS = 30_000;
const MAX_ALERTS = 100;
let alertCounter = 0;

export function createAlert(
  type: string,
  severity: Alert['severity'],
  message: string,
  source: string,
  metadata?: Record<string, unknown>
): Alert | null {
  const cooldownKey = `${type}-${severity}`;
  const lastFired = cooldowns.get(cooldownKey) ?? 0;
  if (Date.now() - lastFired < COOLDOWN_MS) return null;

  cooldowns.set(cooldownKey, Date.now());

  const alert: Alert = {
    id: `alert-${++alertCounter}`,
    type,
    severity,
    message,
    timestamp: Date.now(),
    acknowledged: false,
    source,
    metadata,
  };

  alerts.unshift(alert);
  if (alerts.length > MAX_ALERTS) alerts.pop();

  return alert;
}

export function getAlerts(
  severityFilter?: Alert['severity'][],
  limit = 20
): Alert[] {
  let filtered = alerts;
  if (severityFilter && severityFilter.length > 0) {
    filtered = alerts.filter(a => severityFilter.includes(a.severity));
  }
  return filtered.slice(0, limit);
}

export function acknowledgeAlert(id: string): boolean {
  const alert = alerts.find(a => a.id === id);
  if (alert) {
    alert.acknowledged = true;
    return true;
  }
  return false;
}

export function getUnacknowledgedCount(): number {
  return alerts.filter(a => !a.acknowledged).length;
}

export function clearAlerts(): void {
  alerts.length = 0;
  alertCounter = 0;
}

// Seed some initial alerts
createAlert('SYSTEM', 'LOW', 'Block explorer initialized', 'system');
createAlert('VALIDATOR', 'LOW', 'All validators online', 'validator-agent');
