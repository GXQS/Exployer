'use client';
import ValidatorGrid from '@/components/explorer/ValidatorGrid';
import NeonText from '@/components/ui/NeonText';
import StatCard from '@/components/ui/StatCard';
import useSWR from 'swr';
import type { Validator } from '@/lib/explorer-types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ValidatorsPage() {
  const { data: validators } = useSWR<Validator[]>('/api/validators', fetcher, { refreshInterval: 10000 });

  const active = validators?.filter(v => v.status === 'active').length ?? 0;
  const uptimes = validators?.map(v => v.uptime).filter((uptime): uptime is number => uptime != null) ?? [];
  const avgUptime = uptimes.length > 0 ? uptimes.reduce((sum, uptime) => sum + uptime, 0) / uptimes.length : 0;
  const totalStake = validators?.reduce((sum, validator) => sum + validator.stake, 0) ?? 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <NeonText size="2xl" color="purple" className="font-bold block">VALIDATOR NETWORK</NeonText>
        <div className="text-gray-600 font-mono text-xs mt-1">Active validator set monitoring</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active Validators" value={active} color="primary" icon="⬟" />
        <StatCard label="Avg Uptime" value={avgUptime} suffix="%" decimals={2} color="secondary" icon="♡" subValue={uptimes.length === 0 ? 'not exposed' : undefined} />
        <StatCard
          label="Total Stake"
          value={totalStake}
          color="primary"
          icon="◈"
          formatFn={value => (value / 1_000_000).toFixed(2) + 'M'}
          subValue="GXQS"
        />
      </div>

      <ValidatorGrid />
    </div>
  );
}
