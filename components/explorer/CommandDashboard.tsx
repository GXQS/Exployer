'use client';
import { memo } from 'react';
import useSWR from 'swr';
import StatCard from '@/components/ui/StatCard';
import LiveIndicator from '@/components/ui/LiveIndicator';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import NeonBadge from '@/components/ui/NeonBadge';
import { formatNumber } from '@/lib/utils';
import type { ChainStats } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

/** Thresholds for network status classification */
const DEGRADED_BLOCK_TIME_THRESHOLD = 2.5; // seconds
const DEGRADED_MEMPOOL_THRESHOLD    = 500;  // transactions

/** Derive network status label + Tailwind color class from live stats */
function useNetworkStatus(stats: ChainStats | undefined, error: unknown) {
  if (error) return { label: 'OFFLINE',      cls: 'text-danger'  };
  if (!stats)  return { label: 'LOADING…',   cls: 'text-gray-500' };
  if (stats.avgBlockTime > DEGRADED_BLOCK_TIME_THRESHOLD || stats.mempoolSize > DEGRADED_MEMPOOL_THRESHOLD)
               return { label: 'DEGRADED',   cls: 'text-warning'  };
               return { label: 'OPERATIONAL', cls: 'text-success'  };
}

/** Memoized price ticker to avoid unnecessary re-renders */
const PriceTicker = memo(function PriceTicker({
  stats,
  networkStatus,
}: {
  stats?: ChainStats;
  networkStatus: { label: string; cls: string };
}) {
  return (
    <GlassCard depth={2} glow="primary" className="px-4 py-3">
      {/* Blockchain identity bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: token prices */}
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">GXQS/USD</span>
            <div className="text-[#00ffe1] font-mono font-bold text-lg leading-tight">
              ${stats?.price?.toFixed(4) ?? '0.0000'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">MARKET CAP</span>
            <div className="text-[#7a00ff] font-mono font-bold">
              ${stats ? formatNumber(stats.marketCap) : '0'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">TOTAL STAKE</span>
            <div className="text-[#00ffe1] font-mono font-bold">
              {stats ? formatNumber(stats.totalStake) : '0'} GXQS
            </div>
          </div>
        </div>

        {/* Right: blockchain identity */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live block ticker */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">BLOCK</span>
            <span className="text-[#00ffe1] font-mono font-bold text-sm">
              #{stats ? formatNumber(stats.blockHeight) : '—'}
            </span>
          </div>

          {/* Mempool counter */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">MEMPOOL</span>
            <span className={`font-mono font-bold text-sm ${
              (stats?.mempoolSize ?? 0) > 200 ? 'text-warning' : 'text-success'
            }`}>
              {stats?.mempoolSize ?? '—'} txs
            </span>
          </div>

          {/* Chain status */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">CHAIN</span>
            <NeonBadge
              label="MAINNET"
              color="success"
              size="sm"
            />
          </div>

          {/* Network operational status */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">STATUS</span>
            <span className={`font-mono text-sm font-bold ${networkStatus.cls}`}>{networkStatus.label}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
});

export default function CommandDashboard() {
  const { data: stats, error } = useSWR<ChainStats>('/api/stats', fetcher, { refreshInterval: 2000 });
  const networkStatus = useNetworkStatus(stats, error);

  const health = stats
    ? Math.min(100, Math.max(0, 100 - (stats.avgBlockTime > 2.5 ? 20 : 0) - (stats.mempoolSize > 200 ? 15 : 0)))
    : 0;

  // Health uses warning/danger for alerts, primary/secondary for normal KPI
  const healthColor: 'primary' | 'secondary' = health >= 70 ? 'primary' : 'secondary';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="cyan" className="font-bold block">GXQS COMMAND CENTER</NeonText>
          <div className="text-gray-500 font-mono text-xs mt-1">Live Blockchain Intelligence Dashboard</div>
        </div>
        <LiveIndicator live={!!stats} label="MAINNET LIVE" />
      </div>

      {/* KPI Stats grid — primary/secondary only per design rules */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TPS"
          value={stats?.tps ?? 0}
          suffix=" tx/s"
          color="primary"
          icon="⚡"
          subValue="transactions/sec"
        />
        <StatCard
          label="BLOCK HEIGHT"
          value={stats?.blockHeight ?? 0}
          color="secondary"
          icon="⬡"
          formatFn={v => formatNumber(Math.floor(v))}
        />
        <StatCard
          label="FINALITY"
          value={stats?.finality ?? 0}
          suffix="s"
          color="primary"
          icon="✓"
          decimals={2}
          subValue="avg finality time"
        />
        <StatCard
          label="VALIDATORS"
          value={stats?.activeValidators ?? 0}
          color="secondary"
          icon="⬟"
          subValue="/ 20 total"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="MEMPOOL"
          value={stats?.mempoolSize ?? 0}
          suffix=" txs"
          color="primary"
          icon="≋"
        />
        <StatCard
          label="BLOCK TIME"
          value={stats?.avgBlockTime ?? 0}
          suffix="s"
          decimals={2}
          color="secondary"
          icon="⏱"
        />
        <StatCard
          label="TOTAL TXS"
          value={stats?.totalTx ?? 0}
          color="primary"
          icon="◈"
          formatFn={v => formatNumber(Math.floor(v))}
          subValue="all time"
        />
        <StatCard
          label="CHAIN HEALTH"
          value={health}
          suffix="%"
          color={healthColor}
          icon="♡"
          decimals={0}
        />
      </div>

      {/* Blockchain identity ticker */}
      <PriceTicker stats={stats} networkStatus={networkStatus} />
    </div>
  );
}
