'use client';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash, formatBytes, formatNumber, timeAgo } from '@/lib/utils';
import type { Block } from '@/lib/explorer-types';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface BlockStreamProps {
  limit?: number;
  compact?: boolean;
}

export default function BlockStream({ limit = 20, compact = false }: BlockStreamProps) {
  const { data: initialBlocks, isLoading } = useSWR<Block[]>(`/api/blocks?count=${limit}`, fetcher);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newBlock, setNewBlock] = useState<number | null>(null);
  const [streamUnavailable, setStreamUnavailable] = useState(false);
  const prevHeightRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialBlocks) {
      setBlocks(initialBlocks);
    }
  }, [initialBlocks]);

  useEffect(() => {
    if (!blocks.length) return;
    const latest = blocks[0].height;
    if (prevHeightRef.current !== null && latest > prevHeightRef.current) {
      setNewBlock(latest);
      setTimeout(() => setNewBlock(null), 1000);
    }
    prevHeightRef.current = latest;
  }, [blocks]);

  const streamStartHeight = initialBlocks?.[0]?.height ?? blocks[0]?.height ?? 0;

  useEffect(() => {
    if (!streamStartHeight) return;

    const fromHeight = streamStartHeight + 1;
    const source = typeof EventSource !== 'undefined'
      ? new EventSource(`/api/stream/blocks?fromHeight=${fromHeight}`)
      : null;
    let fallbackTimer: ReturnType<typeof setInterval> | null = null;

    const startFallback = () => {
      if (fallbackTimer) return;
      setStreamUnavailable(true);
      fallbackTimer = setInterval(async () => {
        try {
          const freshBlocks = await fetch(`/api/blocks?count=${limit}`).then(r => r.json() as Promise<Block[]>);
          setBlocks(freshBlocks);
        } catch {
          // best-effort fallback polling
        }
      }, 3000);
    };

    if (!source) {
      startFallback();
      return () => {
        if (fallbackTimer) clearInterval(fallbackTimer);
      };
    }

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data) as Block | { type: string };
      if ('type' in payload) return;
      setStreamUnavailable(false);
      if (fallbackTimer) {
        clearInterval(fallbackTimer);
        fallbackTimer = null;
      }
      setBlocks((current) => {
        const next = [payload, ...current.filter(block => block.height !== payload.height)];
        return next.slice(0, limit);
      });
    };

    source.onerror = () => {
      source.close();
      startFallback();
    };

    return () => {
      source.close();
      if (fallbackTimer) clearInterval(fallbackTimer);
    };
  }, [limit, streamStartHeight]);

  if (isLoading && blocks.length === 0) {
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
      {streamUnavailable && (
        <div className="text-[10px] font-mono text-warning uppercase tracking-wider">
          Stream unavailable · polling fallback active
        </div>
      )}
      {blocks.map(block => (
        <GlassCard
          key={block.height}
          className={cn(
            'p-3 transition-all duration-500',
            newBlock === block.height && 'border-[rgba(0,255,225,0.6)] shadow-neon-cyan animate-slide-in',
          )}
        >
          {compact ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#00ffe1] font-mono font-bold text-sm">#{formatNumber(block.height)}</span>
                <span className="text-gray-500 font-mono text-xs">{block.hash ? formatHash(block.hash, 6) : 'hash unavailable'}</span>
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
                <div className="text-gray-300 font-mono text-xs">{block.hash ? formatHash(block.hash) : 'hash unavailable'}</div>
                <div className="text-gray-600 font-mono text-xs">by {block.proposer ? formatHash(block.proposer, 6) : '—'}</div>
              </div>
              <div className="text-center">
                <div className="text-[#ff00d4] font-mono text-sm font-medium">{block.txCount}</div>
                <div className="text-gray-600 font-mono text-xs">txs</div>
              </div>
              <div className="text-center">
                <div className="text-[#7a00ff] font-mono text-sm">{block.size != null ? formatBytes(block.size) : '—'}</div>
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
