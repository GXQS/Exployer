'use client';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import GlowBadge from '@/components/ui/GlowBadge';
import NeonText from '@/components/ui/NeonText';
import { cn } from '@/lib/utils';

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  running: boolean;
  decisions: number;
  lastAction: string;
  color: 'cyan' | 'pink' | 'purple';
}

export default function AgentControlPanel() {
  const [agents, setAgents] = useState<AgentConfig[]>([
    { id: 'anomaly', name: 'AnomalyDetector', description: 'Z-score anomaly detection on chain metrics', running: true, decisions: 142, lastAction: 'MONITOR', color: 'pink' },
    { id: 'validator', name: 'ValidatorMonitor', description: 'Track validator uptime and participation', running: true, decisions: 89, lastAction: 'MONITOR', color: 'cyan' },
    { id: 'mempool', name: 'MempoolMonitor', description: 'Mempool congestion and growth analysis', running: true, decisions: 203, lastAction: 'ALERT', color: 'purple' },
    { id: 'defense', name: 'DefenseEngine', description: 'Orchestrate responses to critical events', running: false, decisions: 34, lastAction: 'IDLE', color: 'cyan' },
  ]);

  const [emergencyStop, setEmergencyStop] = useState(false);

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, running: !a.running } : a));
  };

  const handleEmergencyStop = () => {
    setEmergencyStop(true);
    setAgents(prev => prev.map(a => ({ ...a, running: false })));
  };

  const resetEmergency = () => {
    setEmergencyStop(false);
  };

  return (
    <div className="space-y-4">
      {emergencyStop && (
        <GlassCard glow="pink" className="p-4 border-[rgba(255,0,68,0.5)]">
          <div className="flex items-center justify-between">
            <div>
              <NeonText color="pink" size="sm" className="font-bold">EMERGENCY STOP ACTIVE</NeonText>
              <div className="text-gray-500 font-mono text-xs mt-1">All agents halted</div>
            </div>
            <NeonButton variant="cyan" onClick={resetEmergency}>RESUME</NeonButton>
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map(agent => (
          <GlassCard key={agent.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <NeonText color={agent.color} size="sm" className="font-bold">{agent.name}</NeonText>
                <div className="text-gray-600 font-mono text-xs mt-0.5">{agent.description}</div>
              </div>
              <div className={cn(
                'w-3 h-3 rounded-full mt-1',
                agent.running
                  ? 'bg-[#00ff88] animate-blink shadow-[0_0_8px_rgba(0,255,136,0.8)]'
                  : 'bg-[#ff0044]'
              )} />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>
                <div className="text-xs font-mono text-gray-600">DECISIONS</div>
                <div className="text-sm font-mono text-[#00ffe1]">{agent.decisions}</div>
              </div>
              <div>
                <div className="text-xs font-mono text-gray-600">LAST ACTION</div>
                <GlowBadge label={agent.lastAction} color={agent.running ? 'cyan' : 'red'} size="sm" />
              </div>
            </div>
            <NeonButton
              variant={agent.running ? 'danger' : 'cyan'}
              size="sm"
              className="w-full"
              onClick={() => toggleAgent(agent.id)}
              disabled={emergencyStop}
            >
              {agent.running ? 'STOP AGENT' : 'START AGENT'}
            </NeonButton>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-4 border-[rgba(255,0,68,0.2)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#ff0044] font-mono font-bold text-sm">EMERGENCY STOP</div>
            <div className="text-gray-600 font-mono text-xs">Immediately halt all agent operations</div>
          </div>
          <NeonButton
            variant="danger"
            onClick={handleEmergencyStop}
            disabled={emergencyStop}
          >
            {emergencyStop ? 'HALTED' : 'STOP ALL AGENTS'}
          </NeonButton>
        </div>
      </GlassCard>
    </div>
  );
}
