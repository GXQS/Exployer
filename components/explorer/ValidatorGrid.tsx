'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatNumber, formatHash } from '@/lib/utils';
import type { Validator } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const statusConfig = {
  active: { color: 'green' as const, label: 'ACTIVE' },
  inactive: { color: 'orange' as const, label: 'OFFLINE' },
  jailed: { color: 'red' as const, label: 'JAILED' },
};

export default function ValidatorGrid() {
  const { data: validators, isLoading } = useSWR<Validator[]>(
    '/api/validators',
    fetcher,
    { refreshInterval: 10000 }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <GlassCard key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded mb-2" />
            <div className="h-3 bg-[rgba(255,255,255,0.03)] rounded w-2/3" />
          </GlassCard>        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {(validators ?? []).map((v) => {
        const cfg = statusConfig[v.status];
        return (
          <GlassCard key={v.address} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[#00ffe1] font-mono font-bold text-sm">{v.name}</div>
                <div className="text-gray-600 font-mono text-xs">{formatHash(v.address, 6)}</div>
              </div>
              <GlowBadge label={cfg.label} color={cfg.color} size="sm" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-gray-600 font-mono">STAKE</div>
                <div className="text-sm font-mono text-[#ff00d4]">{formatNumber(v.stake)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-mono">UPTIME</div>
                <div className={`text-sm font-mono ${v.uptime > 99 ? 'text-[#00ff88]' : v.uptime > 95 ? 'text-[#ffaa00]' : 'text-[#ff0044]'}`}>
                  {v.uptime.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-mono">APY</div>
                <div className="text-sm font-mono text-[#7a00ff]">{v.apy.toFixed(1)}%</div>
              </div>
            </div>
            <div className="mt-2 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00ffe1] rounded-full transition-all"
                style={{ width: `${v.uptime}%` }}
              />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
