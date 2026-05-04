'use client';
import useSWR from 'swr';
import StatCard from '@/components/ui/StatCard';
import LiveIndicator from '@/components/ui/LiveIndicator';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import { formatNumber } from '@/lib/utils';
import type { ChainStats } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CommandDashboard() {
  const { data: stats } = useSWR<ChainStats>('/api/stats', fetcher, { refreshInterval: 2000 });

  const health = stats
    ? Math.min(100, Math.max(0, 100 - (stats.avgBlockTime > 2.5 ? 20 : 0) - (stats.mempoolSize > 200 ? 15 : 0)))
    : 0;

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

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TPS"
          value={stats?.tps ?? 0}
          suffix=" tx/s"
          color="cyan"
          icon="⚡"
          subValue="transactions/sec"
        />
        <StatCard
          label="BLOCK HEIGHT"
          value={stats?.blockHeight ?? 0}
          color="pink"
          icon="⬡"
          formatFn={v => formatNumber(Math.floor(v))}
        />
        <StatCard
          label="FINALITY"
          value={stats?.finality ?? 0}
          suffix="s"
          color="purple"
          icon="✓"
          decimals={2}
          subValue="avg finality time"
        />
        <StatCard
          label="VALIDATORS"
          value={stats?.activeValidators ?? 0}
          color="cyan"
          icon="⬟"
          subValue={`/ 20 total`}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="MEMPOOL"
          value={stats?.mempoolSize ?? 0}
          suffix=" txs"
          color="pink"
          icon="≋"
        />
        <StatCard
          label="BLOCK TIME"
          value={stats?.avgBlockTime ?? 0}
          suffix="s"
          decimals={2}
          color="purple"
          icon="⏱"
        />
        <StatCard
          label="TOTAL TXS"
          value={stats?.totalTx ?? 0}
          color="cyan"
          icon="◈"
          formatFn={v => formatNumber(Math.floor(v))}
          subValue="all time"
        />
        <StatCard
          label="CHAIN HEALTH"
          value={health}
          suffix="%"
          color={health >= 90 ? 'cyan' : health >= 70 ? 'purple' : 'pink'}
          icon="♡"
          decimals={0}
        />
      </div>

      {/* Price ticker */}
      <GlassCard className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-gray-500 font-mono text-xs">GXQS/USD</span>
            <div className="text-[#00ffe1] font-mono font-bold text-lg">
              ${stats?.price?.toFixed(4) ?? '0.0000'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-xs">MARKET CAP</span>
            <div className="text-[#ff00d4] font-mono font-bold">
              ${stats ? formatNumber(stats.marketCap) : '0'}
            </div>
          </div>
          <div>
            <span className="text-gray-500 font-mono text-xs">TOTAL STAKE</span>
            <div className="text-[#7a00ff] font-mono font-bold">
              {stats ? formatNumber(stats.totalStake) : '0'} GXQS
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-gray-600">NETWORK STATUS</div>
          <div className="text-[#00ff88] font-mono text-sm font-bold">OPERATIONAL</div>
        </div>
      </GlassCard>
    </div>
  );
}
