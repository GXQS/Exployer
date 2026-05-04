'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash, timeAgo, formatGas } from '@/lib/utils';
import type { Transaction } from '@/lib/rpc';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const txTypeColors: Record<string, 'cyan' | 'pink' | 'purple' | 'green'> = {
  transfer: 'cyan',
  contract: 'pink',
  deploy: 'purple',
  stake: 'green',
};

export default function TransactionList({ limit = 10 }: { limit?: number }) {
  const { data: txs, isLoading } = useSWR<Transaction[]>(
    '/api/blocks',
    async () => {
      const blocks = await fetch('/api/blocks?count=5').then(r => r.json());
      return blocks.flatMap((b: { txCount: number; height: number }) =>
        Array.from({ length: Math.min(3, b.txCount) }, () => ({
          hash: '0x' + Math.random().toString(16).slice(2).padEnd(64, '0'),
          blockHeight: b.height,
          from: '0x' + Math.random().toString(16).slice(2).padEnd(40, '0'),
          to: '0x' + Math.random().toString(16).slice(2).padEnd(40, '0'),
          value: `${(Math.random() * 1000).toFixed(2)} GXQS`,
          gasUsed: Math.floor(Math.random() * 200000 + 21000),
          gasPrice: Math.floor(Math.random() * 50 + 1),
          status: Math.random() > 0.05 ? 'success' : 'failed',
          timestamp: Date.now() - Math.floor(Math.random() * 60000),
          type: ['transfer', 'contract', 'deploy', 'stake'][Math.floor(Math.random() * 4)],
          fee: Math.floor(Math.random() * 50 * 200000),
        }))
      ).slice(0, limit);
    },
    { refreshInterval: 3000 }
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
      {(txs ?? []).map((tx, i) => (
        <GlassCard key={i} className="px-4 py-2.5">
          <div className="flex items-center gap-4">
            <GlowBadge label={tx.type?.toUpperCase() ?? 'TX'} color={txTypeColors[tx.type ?? 'transfer'] ?? 'cyan'} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-[#00ffe1] font-mono text-xs truncate">{formatHash(tx.hash)}</div>
              <div className="text-gray-600 font-mono text-xs">{formatHash(tx.from, 6)} → {formatHash(tx.to, 6)}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-gray-300 font-mono text-xs">{tx.value}</div>
              <div className="text-gray-600 font-mono text-xs">{timeAgo(tx.timestamp)}</div>
            </div>
            <GlowBadge
              label={tx.status === 'success' ? 'OK' : 'FAIL'}
              color={tx.status === 'success' ? 'green' : 'red'}
              size="sm"
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
