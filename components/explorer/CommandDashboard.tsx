'use client';
import { memo } from 'react';
import useSWR from 'swr';
import StatCard from '@/components/ui/StatCard';
import LiveIndicator from '@/components/ui/LiveIndicator';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import NeonBadge from '@/components/ui/NeonBadge';
import { formatNumber } from '@/lib/utils';
import type { ChainStats } from '@/lib/explorer-types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const DEGRADED_BLOCK_TIME_THRESHOLD = 2.5;
const DEGRADED_MEMPOOL_THRESHOLD = 500;

function useNetworkStatus(stats: ChainStats | undefined, error: unknown) {
  if (error) return { label: 'OFFLINE', cls: 'text-danger' };
  if (!stats) return { label: 'LOADING…', cls: 'text-gray-500' };
  if (
    (stats.avgBlockTime !== null && stats.avgBlockTime > DEGRADED_BLOCK_TIME_THRESHOLD) ||
    (stats.mempoolSize !== null && stats.mempoolSize > DEGRADED_MEMPOOL_THRESHOLD)
  ) {
    return { label: 'DEGRADED', cls: 'text-warning' };
  }
  return { label: 'OPERATIONAL', cls: 'text-success' };
}

const PriceTicker = memo(function PriceTicker({
  stats,
  networkStatus,
}: {
  stats?: ChainStats;
  networkStatus: { label: string; cls: string };
}) {
  return (
    <GlassCard depth={2} glow="primary" className="px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">GXQS/USD</span>
            <div className="text-[#00ffe1] font-mono font-bold text-lg leading-tight">
              {stats?.price != null ? `$${stats.price.toFixed(4)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">MARKET CAP</span>
            <div className="text-[#7a00ff] font-mono font-bold">
              {stats?.marketCap != null ? `$${formatNumber(stats.marketCap)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">TOTAL STAKE</span>
            <div className="text-[#00ffe1] font-mono font-bold">
              {stats ? `${formatNumber(stats.totalStake)} GXQS` : '0 GXQS'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">BLOCK</span>
            <span className="text-[#00ffe1] font-mono font-bold text-sm">
              #{stats ? formatNumber(stats.blockHeight) : '—'}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">MEMPOOL</span>
            <span className={`font-mono font-bold text-sm ${
              (stats?.mempoolSize ?? 0) > 200 ? 'text-warning' : 'text-success'
            }`}>
              {stats?.mempoolSize != null ? `${stats.mempoolSize} txs` : 'N/A'}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">CHAIN</span>
            <NeonBadge label="MAINNET" color="success" size="sm" />
          </div>

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
    ? Math.min(
        100,
        Math.max(
          0,
          100 -
            ((stats.avgBlockTime ?? 0) > 2.5 ? 20 : 0) -
            ((stats.mempoolSize ?? 0) > 200 ? 15 : 0),
        ),
      )
    : 0;

  const healthColor: 'primary' | 'secondary' = health >= 70 ? 'primary' : 'secondary';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="cyan" className="font-bold block">GXQS COMMAND CENTER</NeonText>
          <div className="text-gray-500 font-mono text-xs mt-1">Live Blockchain Intelligence Dashboard</div>
        </div>
        <LiveIndicator live={!!stats} label="MAINNET LIVE" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TPS"
          value={stats?.tps ?? 0}
          suffix=" tx/s"
          color="primary"
          icon="⚡"
          subValue={stats?.tps == null ? 'not exposed' : 'transactions/sec'}
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
          subValue={stats?.finality == null ? 'not exposed' : 'avg finality time'}
        />
        <StatCard
          label="VALIDATORS"
          value={stats?.activeValidators ?? 0}
          color="secondary"
          icon="⬟"
          subValue="active set"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="MEMPOOL"
          value={stats?.mempoolSize ?? 0}
          suffix=" txs"
          color="primary"
          icon="≋"
          subValue={stats?.mempoolSize == null ? 'not exposed' : undefined}
        />
        <StatCard
          label="BLOCK TIME"
          value={stats?.avgBlockTime ?? 0}
          suffix="s"
          decimals={2}
          color="secondary"
          icon="⏱"
          subValue={stats?.avgBlockTime == null ? 'derived unavailable' : undefined}
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

      <PriceTicker stats={stats} networkStatus={networkStatus} />
    </div>
  );
}
