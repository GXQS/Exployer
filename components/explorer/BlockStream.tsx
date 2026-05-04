'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash, formatBytes, formatNumber, timeAgo } from '@/lib/utils';
import type { Block } from '@/lib/rpc';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface BlockStreamProps {
  limit?: number;
  compact?: boolean;
}

export default function BlockStream({ limit = 20, compact = false }: BlockStreamProps) {
  const { data: blocks, isLoading } = useSWR<Block[]>(
    `/api/blocks?count=${limit}`,
    fetcher,
    { refreshInterval: 2000 }
  );
  const [newBlock, setNewBlock] = useState<number | null>(null);
  const [prevHeight, setPrevHeight] = useState<number | null>(null);

  useEffect(() => {
    if (blocks && blocks.length > 0) {
      const latest = blocks[0].height;
      if (prevHeight !== null && latest > prevHeight) {
        setNewBlock(latest);
        setTimeout(() => setNewBlock(null), 1000);
      }
      setPrevHeight(latest);
    }
  }, [blocks]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <GlassCard key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-3/4" />
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {(blocks ?? []).map(block => (
        <GlassCard
          key={block.height}
          className={cn(
            'p-3 transition-all duration-500',
            newBlock === block.height && 'border-[rgba(0,255,225,0.6)] shadow-neon-cyan animate-slide-in'
          )}
        >
          {compact ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#00ffe1] font-mono font-bold text-sm">#{formatNumber(block.height)}</span>
                <span className="text-gray-500 font-mono text-xs">{formatHash(block.hash, 6)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono text-xs">{block.txCount} txs</span>
                <span className="text-gray-600 font-mono text-xs">{timeAgo(block.timestamp)}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-2 items-center">
              <div>
                <div className="text-[#00ffe1] font-mono font-bold">#{formatNumber(block.height)}</div>
                <div className="text-gray-600 font-mono text-xs">{timeAgo(block.timestamp)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-300 font-mono text-xs">{formatHash(block.hash)}</div>
                <div className="text-gray-600 font-mono text-xs">by {formatHash(block.proposer, 6)}</div>
              </div>
              <div className="text-center">
                <div className="text-[#ff00d4] font-mono text-sm font-medium">{block.txCount}</div>
                <div className="text-gray-600 font-mono text-xs">txs</div>
              </div>
              <div className="text-center">
                <div className="text-[#7a00ff] font-mono text-sm">{formatBytes(block.size)}</div>
                <div className="text-gray-600 font-mono text-xs">size</div>
              </div>
              <div className="text-right">
                <GlowBadge
                  label={block.finalized ? 'FINAL' : 'PENDING'}
                  color={block.finalized ? 'green' : 'orange'}
                  size="sm"
                />
              </div>
            </div>
          )}
        </GlassCard>
      ))}
    </div>
  );
}
