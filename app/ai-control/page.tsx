'use client';
import AgentControlPanel from '@/components/ai/AgentControlPanel';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import TerminalPanel from '@/components/ui/TerminalPanel';
import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: number;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source?: string;
}

function generateLog(): LogEntry {
  const levels: LogEntry['level'][] = ['info', 'info', 'info', 'success', 'warn'];
  const messages = [
    'Anomaly scan complete - no deviations',
    'Validator heartbeat received from NeonForge',
    'Mempool size: 145 txs (nominal)',
    'Chain health score updated: 94/100',
    'Block #14892341 finalized',
    'TPS measurement: 2341 tx/s',
    'Decision engine: no action required',
    'Defense agent: no threats detected',
  ];
  return {
    timestamp: Date.now(),
    level: levels[Math.floor(Math.random() * levels.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    source: ['AnomalyAgent', 'ValidatorAgent', 'MempoolAgent', 'DefenseAgent'][Math.floor(Math.random() * 4)],
  };
}

export default function AiControlPage() {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 10 }, generateLog)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(prev => [...prev, generateLog()].slice(-50));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <NeonText size="2xl" color="purple" className="font-bold block">AI CONTROL PANEL</NeonText>
        <div className="text-gray-600 font-mono text-xs mt-1">Agent management and oversight console</div>
      </div>

      <AgentControlPanel />

      <GlassCard className="p-4">
        <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          System Log
        </NeonText>
        <TerminalPanel logs={logs} title="AGENT RUNTIME" maxHeight="300px" />
      </GlassCard>
    </div>
  );
}
