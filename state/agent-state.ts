import type { AgentDecision, AgentMetrics } from '../agents/base-agent';

export interface AgentState {
  id: string;
  name: string;
  running: boolean;
  metrics: AgentMetrics;
  recentDecisions: AgentDecision[];
  lastUpdated: number;
}

export interface GlobalAgentState {
  agents: Record<string, AgentState>;
  emergencyStop: boolean;
  totalDecisions: number;
}

const state: GlobalAgentState = {
  agents: {},
  emergencyStop: false,
  totalDecisions: 0,
};

export function updateAgentState(id: string, partial: Partial<AgentState>): void {
  state.agents[id] = {
    ...(state.agents[id] ?? { id, name: id, running: false, metrics: { decisionsTotal: 0, decisionsApproved: 0, decisionsRejected: 0, avgConfidence: 0, uptime: 0 }, recentDecisions: [], lastUpdated: 0 }),
    ...partial,
    lastUpdated: Date.now(),
  };
}

export function getGlobalState(): GlobalAgentState {
  return { ...state, agents: { ...state.agents } };
}

export function setEmergencyStop(value: boolean): void {
  state.emergencyStop = value;
}

export function isEmergencyStop(): boolean {
  return state.emergencyStop;
}
