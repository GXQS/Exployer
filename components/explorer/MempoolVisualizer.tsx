'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import { formatHash, formatNumber } from '@/lib/utils';
import type { MempoolTx } from '@/lib/rpc';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const priorityConfig = {
  high: { color: '#ff00d4', bg: 'rgba(255,0,212,0.1)', label: 'HIGH' },
  medium: { color: '#ffaa00', bg: 'rgba(255,170,0,0.1)', label: 'MED' },
  low: { color: '#7a00ff', bg: 'rgba(122,0,255,0.1)', label: 'LOW' },
};

export default function MempoolVisualizer() {
  const { data: mempool, isLoading } = useSWR<MempoolTx[]>(
    '/api/mempool',
    fetcher,
    { refreshInterval: 3000 }
  );

  const byPriority = {
    high: (mempool ?? []).filter(t => t.priority === 'high').length,
    medium: (mempool ?? []).filter(t => t.priority === 'medium').length,
    low: (mempool ?? []).filter(t => t.priority === 'low').length,
  };
  const total = (mempool ?? []).length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {(['high', 'medium', 'low'] as const).map(p => {
          const cfg = priorityConfig[p];
          const count = byPriority[p];
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <GlassCard key={p} className="p-3 text-center">
              <div className="text-xs font-mono text-gray-500 mb-1">{cfg.label} PRIORITY</div>
              <div className="text-xl font-bold font-mono" style={{ color: cfg.color }}>{formatNumber(count)}</div>
              <div className="mt-2 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Transaction list */}
      <div className="space-y-1 max-h-80 overflow-auto">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 bg-[rgba(255,255,255,0.03)] rounded animate-pulse" />
          ))
          : (mempool ?? []).slice(0, 20).map((tx, i) => {
            const cfg = priorityConfig[tx.priority];
            return (
              <div key={i} className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]'
              )}>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                  {cfg.label}
                </span>
                <span className="flex-1 text-xs font-mono text-gray-400 truncate">{formatHash(tx.hash)}</span>
                <span className="text-xs font-mono text-gray-600">{tx.gasPrice} gwei</span>
                <span className="text-xs font-mono text-gray-500">{tx.size}B</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
