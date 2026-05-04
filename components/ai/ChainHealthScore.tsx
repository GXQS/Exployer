'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import { computeChainHealth } from '@/ai/scoring';
import type { ChainStats } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ChainHealthScore() {
  const { data: stats } = useSWR<ChainStats>('/api/stats', fetcher, { refreshInterval: 3000 });

  const health = stats
    ? computeChainHealth({
        avgBlockTime: stats.avgBlockTime,
        activeValidators: stats.activeValidators,
        totalValidators: 20,
        avgValidatorUptime: 98,
        mempoolSize: stats.mempoolSize,
        tps: stats.tps,
        networkLatency: 25,
      })
    : null;

  if (!health) return <GlassCard className="p-6 animate-pulse h-32" />;

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (health.overall / 100) * circumference;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <circle
              cx="50" cy="50" r="40"
              stroke={health.color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 8px ${health.color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold font-mono" style={{ color: health.color }}>{health.overall}</span>
            <span className="text-xs font-mono text-gray-600">/ 100</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-mono font-bold text-lg" style={{ color: health.color }}>{health.label}</div>
          <div className="text-gray-500 font-mono text-xs mb-3">
            Trend: {health.trend === 'improving' ? 'UP IMPROVING' : health.trend === 'degrading' ? 'DOWN DEGRADING' : 'STABLE'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(health.components).map(([key, val]) => (
              <div key={key}>
                <div className="text-xs font-mono text-gray-600 uppercase">{key.replace('Health', '')}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${val}%`, backgroundColor: health.color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-400">{val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
