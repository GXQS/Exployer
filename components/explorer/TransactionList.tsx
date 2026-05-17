'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash, timeAgo } from '@/lib/utils';
import type { Transaction } from '@/lib/explorer-types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const txTypeColors: Record<string, 'cyan' | 'pink' | 'purple' | 'green'> = {
  transfer: 'cyan',
  contract: 'pink',
  deploy: 'purple',
  stake: 'green',
};

export default function TransactionList({ limit = 10 }: { limit?: number }) {
  const { data: txs, isLoading } = useSWR<Transaction[]>(
    `/api/transactions?count=${limit}`,
    fetcher,
    { refreshInterval: 3000 },
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-[rgba(255,255,255,0.03)] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {(txs ?? []).map((tx) => (
        <GlassCard key={tx.hash} className="px-4 py-2.5">
          <div className="flex items-center gap-4">
            <GlowBadge label={tx.type.toUpperCase()} color={txTypeColors[tx.type] ?? 'cyan'} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-[#00ffe1] font-mono text-xs truncate">{formatHash(tx.hash)}</div>
              <div className="text-gray-600 font-mono text-xs">
                {tx.from ? formatHash(tx.from, 6) : '—'} → {tx.to ? formatHash(tx.to, 6) : '—'}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-gray-300 font-mono text-xs">{tx.value}</div>
              <div className="text-gray-600 font-mono text-xs">{timeAgo(tx.timestamp)}</div>
            </div>
            <GlowBadge
              label={tx.status === 'success' ? 'OK' : tx.status === 'failed' ? 'FAIL' : 'UNK'}
              color={tx.status === 'success' ? 'green' : tx.status === 'failed' ? 'red' : 'cyan'}
              size="sm"
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
