'use client';
import { useEffect, useState } from 'react';
import { timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  reason: string;
  confidence: number;
  timestamp: number;
  approved: boolean;
}

function generateActivity(): AgentActivity {
  const agents = ['AnomalyDetector', 'ValidatorMonitor', 'MempoolMonitor', 'DefenseEngine'];
  const actions = ['MONITOR', 'ALERT', 'THROTTLE', 'DEFEND', 'IDLE'];
  const reasons = [
    'Chain metrics nominal', 'TPS within expected range', 'Mempool pressure elevated',
    'Validator set healthy', 'No active threats', 'Tracking high-severity events',
  ];
  return {
    id: Math.random().toString(36).slice(2),
    agent: agents[Math.floor(Math.random() * agents.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    reason: reasons[Math.floor(Math.random() * reasons.length)],
    confidence: 0.7 + Math.random() * 0.3,
    timestamp: Date.now(),
    approved: Math.random() > 0.1,
  };
}

export default function AgentActivityFeed() {
  const [activities, setActivities] = useState<AgentActivity[]>(() =>
    Array.from({ length: 8 }, generateActivity)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActivities(prev => [generateActivity(), ...prev].slice(0, 20));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const agentColors: Record<string, string> = {
    AnomalyDetector: '#ff00d4',
    ValidatorMonitor: '#00ffe1',
    MempoolMonitor: '#7a00ff',
    DefenseEngine: '#ff6600',
  };

  return (
    <div className="space-y-1 max-h-96 overflow-auto">
      {activities.map(a => (
        <div
          key={a.id}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg',
            'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]',
            'animate-slide-in'
          )}
        >
          <span className="text-xs font-mono font-bold w-28 shrink-0 truncate" style={{ color: agentColors[a.agent] ?? '#00ffe1' }}>
            {a.agent.slice(0, 12)}
          </span>
          <span className="text-xs font-mono text-gray-400 w-20 shrink-0">{a.action}</span>
          <span className="flex-1 text-xs font-mono text-gray-600 truncate">{a.reason}</span>
          <span className="text-xs font-mono text-gray-700 shrink-0">{(a.confidence * 100).toFixed(0)}%</span>
          <span className="text-xs font-mono text-gray-700 shrink-0">{timeAgo(a.timestamp)}</span>
        </div>
      ))}
    </div>
  );
}
