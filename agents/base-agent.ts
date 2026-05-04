export interface AgentDecision {
  timestamp: number;
  action: string;
  reason: string;
  confidence: number;
  approved: boolean;
}

export interface AgentMetrics {
  decisionsTotal: number;
  decisionsApproved: number;
  decisionsRejected: number;
  avgConfidence: number;
  uptime: number;
}

export abstract class BaseAgent {
  readonly name: string;
  readonly id: string;
  protected running = false;
  private startTime = 0;
  private decisions: AgentDecision[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  protected intervalMs: number;

  constructor(name: string, id: string, intervalMs = 5000) {
    this.name = name;
    this.id = id;
    this.intervalMs = intervalMs;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.startTime = Date.now();
    this.intervalId = setInterval(() => this.tick(), this.intervalMs);
    this.tick();
  }

  stop(): void {
    if (!this.running) return;
    this.running = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  protected abstract tick(): Promise<void>;

  protected logDecision(
    action: string,
    reason: string,
    confidence: number,
    approved = true
  ): AgentDecision {
    const decision: AgentDecision = {
      timestamp: Date.now(),
      action,
      reason,
      confidence,
      approved,
    };
    this.decisions.unshift(decision);
    if (this.decisions.length > 50) this.decisions.pop();
    return decision;
  }

  getDecisions(limit = 10): AgentDecision[] {
    return this.decisions.slice(0, limit);
  }

  getMetrics(): AgentMetrics {
    const approved = this.decisions.filter(d => d.approved).length;
    const avgConf =
      this.decisions.length > 0
        ? this.decisions.reduce((s, d) => s + d.confidence, 0) / this.decisions.length
        : 0;
    return {
      decisionsTotal: this.decisions.length,
      decisionsApproved: approved,
      decisionsRejected: this.decisions.length - approved,
      avgConfidence: avgConf,
      uptime: this.running ? Date.now() - this.startTime : 0,
    };
  }
}
