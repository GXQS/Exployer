'use client';
import ValidatorGrid from '@/components/explorer/ValidatorGrid';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import StatCard from '@/components/ui/StatCard';
import useSWR from 'swr';
import type { Validator } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ValidatorsPage() {
  const { data: validators } = useSWR<Validator[]>('/api/validators', fetcher, { refreshInterval: 10000 });

  const active = validators?.filter(v => v.status === 'active').length ?? 0;
  const avgUptime = validators
    ? validators.reduce((s, v) => s + v.uptime, 0) / validators.length
    : 0;
  const totalStake = validators?.reduce((s, v) => s + v.stake, 0) ?? 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <NeonText size="2xl" color="purple" className="font-bold block">VALIDATOR NETWORK</NeonText>
        <div className="text-gray-600 font-mono text-xs mt-1">Active validator set monitoring</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active Validators" value={active} color="cyan" icon="⬟" />
        <StatCard label="Avg Uptime" value={avgUptime} suffix="%" decimals={2} color="pink" icon="♡" />
        <StatCard
          label="Total Stake"
          value={totalStake}
          color="purple"
          icon="◈"
          formatFn={v => (v / 1_000_000).toFixed(2) + 'M'}
          subValue="GXQS"
        />
      </div>

      <ValidatorGrid />
    </div>
  );
}
