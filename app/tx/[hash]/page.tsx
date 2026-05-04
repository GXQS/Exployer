'use client';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash, formatGas, timeAgo } from '@/lib/utils';
import type { Transaction } from '@/lib/rpc';

export default function TxPage({ params }: { params: { hash: string } }) {
  const [tx, setTx] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tx/${params.hash}`)
      .then(r => r.json())
      .then(setTx)
      .finally(() => setLoading(false));
  }, [params.hash]);

  if (loading) return (
    <div className="p-6">
      <GlassCard className="p-6 animate-pulse">
        <div className="h-6 bg-[rgba(255,255,255,0.05)] rounded mb-4 w-1/2" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-[rgba(255,255,255,0.03)] rounded" />
          ))}
        </div>
      </GlassCard>
    </div>
  );

  if (!tx) return (
    <div className="p-6">
      <GlassCard className="p-6">
        <NeonText color="pink">Transaction not found</NeonText>
      </GlassCard>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <NeonText size="2xl" color="cyan" className="font-bold block">TRANSACTION</NeonText>
        <div className="text-gray-600 font-mono text-xs mt-1">{formatHash(params.hash, 16)}</div>
      </div>

      <GlassCard className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'Hash', value: formatHash(tx.hash, 20) },
            { label: 'Status', value: <GlowBadge label={tx.status.toUpperCase()} color={tx.status === 'success' ? 'green' : 'red'} /> },
            { label: 'Block', value: `#${tx.blockHeight}` },
            { label: 'From', value: tx.from },
            { label: 'To', value: tx.to },
            { label: 'Value', value: tx.value },
            { label: 'Gas Used', value: formatGas(tx.gasUsed) },
            { label: 'Gas Price', value: `${tx.gasPrice} gwei` },
            { label: 'Type', value: <GlowBadge label={tx.type?.toUpperCase() ?? 'TX'} color="cyan" /> },
            { label: 'Timestamp', value: timeAgo(tx.timestamp) },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-4 py-2 border-b border-[rgba(255,255,255,0.03)]">
              <div className="w-24 text-xs font-mono text-gray-600 uppercase shrink-0">{row.label}</div>
              <div className="text-sm font-mono text-gray-200 flex-1">{row.value}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
