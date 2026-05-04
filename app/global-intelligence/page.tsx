'use client';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import GlowBadge from '@/components/ui/GlowBadge';
import LiveIndicator from '@/components/ui/LiveIndicator';
import { formatNumber } from '@/lib/utils';
import type { ChainSnapshot } from '@/multichain/normalizer';

export default function GlobalIntelligencePage() {
  const [chains, setChains] = useState<ChainSnapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const [statsRes] = await Promise.all([
          fetch('/api/stats').then(r => r.json()),
        ]);
        // Simulate multi-chain data
        const mockChains: ChainSnapshot[] = [
          {
            chain: 'GXQS',
            blockHeight: statsRes.blockHeight ?? 14_892_341,
            tps: statsRes.tps ?? 2000,
            mempoolSize: statsRes.mempoolSize ?? 120,
            validatorCount: statsRes.activeValidators ?? 20,
            latency: 15 + Math.random() * 10,
            status: 'online',
            health: 94,
            timestamp: Date.now(),
          },
          {
            chain: 'Ethereum',
            blockHeight: 20_234_567 + Math.floor(Math.random() * 10),
            tps: 12 + Math.floor(Math.random() * 8),
            mempoolSize: 180 + Math.floor(Math.random() * 100),
            validatorCount: 1024000,
            latency: 100 + Math.random() * 50,
            status: 'online',
            health: 88,
            timestamp: Date.now(),
          },
          {
            chain: 'Polygon',
            blockHeight: 59_123_456 + Math.floor(Math.random() * 50),
            tps: 380 + Math.floor(Math.random() * 50),
            mempoolSize: 240 + Math.floor(Math.random() * 80),
            validatorCount: 100,
            latency: 40 + Math.random() * 20,
            status: 'online',
            health: 91,
            timestamp: Date.now(),
          },
          {
            chain: 'BSC',
            blockHeight: 41_234_567 + Math.floor(Math.random() * 20),
            tps: 75 + Math.floor(Math.random() * 20),
            mempoolSize: 320 + Math.floor(Math.random() * 100),
            validatorCount: 21,
            latency: 60 + Math.random() * 30,
            status: Math.random() > 0.1 ? 'online' : 'degraded',
            health: 82,
            timestamp: Date.now(),
          },
          {
            chain: 'Arbitrum',
            blockHeight: 230_123_456 + Math.floor(Math.random() * 100),
            tps: 190 + Math.floor(Math.random() * 30),
            mempoolSize: 90 + Math.floor(Math.random() * 50),
            validatorCount: 1024000,
            latency: 30 + Math.random() * 15,
            status: 'online',
            health: 96,
            timestamp: Date.now(),
          },
        ];
        setChains(mockChains);
        setLoading(false);
      } catch {}
    };

    fetchChains();
    const timer = setInterval(fetchChains, 5000);
    return () => clearInterval(timer);
  }, []);

  const statusColor = { online: 'green' as const, degraded: 'orange' as const, offline: 'red' as const };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="cyan" className="font-bold block">GLOBAL INTELLIGENCE</NeonText>
          <div className="text-gray-600 font-mono text-xs mt-1">Cross-chain monitoring and analysis</div>
        </div>
        <LiveIndicator live label="MULTI-CHAIN" />
      </div>

      {/* Chain grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
            <GlassCard key={i} className="p-4 animate-pulse h-40" />
          ))
          : chains.map(chain => (
            <GlassCard
              key={chain.chain}
              glow={chain.chain === 'GXQS' ? 'cyan' : 'none'}
              className="p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <NeonText
                    color={chain.chain === 'GXQS' ? 'cyan' : 'white'}
                    size="lg"
                    className="font-bold"
                  >
                    {chain.chain}
                  </NeonText>
                  <div className="text-gray-600 font-mono text-xs">Block #{formatNumber(chain.blockHeight)}</div>
                </div>
                <GlowBadge label={chain.status.toUpperCase()} color={statusColor[chain.status]} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-mono text-gray-600">TPS</div>
                  <div className="text-sm font-mono text-[#00ffe1]">{formatNumber(chain.tps)}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-600">MEMPOOL</div>
                  <div className="text-sm font-mono text-[#ff00d4]">{chain.mempoolSize}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-600">LATENCY</div>
                  <div className="text-sm font-mono text-[#7a00ff]">{chain.latency.toFixed(0)}ms</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-600">HEALTH</div>
                  <div className="text-sm font-mono" style={{
                    color: chain.health >= 90 ? '#00ffe1' : chain.health >= 75 ? '#00ff88' : '#ffaa00'
                  }}>{chain.health}%</div>
                </div>
              </div>
              <div className="mt-3 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${chain.health}%`,
                    backgroundColor: chain.chain === 'GXQS' ? '#00ffe1' : '#7a00ff'
                  }}
                />
              </div>
            </GlassCard>
          ))
        }
      </div>

      {/* Summary stats */}
      <GlassCard className="p-4">
        <NeonText color="purple" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          Cross-Chain Summary
        </NeonText>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-[#00ffe1]">
              {chains.filter(c => c.status === 'online').length}/{chains.length}
            </div>
            <div className="text-xs font-mono text-gray-600">Chains Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-[#ff00d4]">
              {formatNumber(chains.reduce((s, c) => s + c.tps, 0))}
            </div>
            <div className="text-xs font-mono text-gray-600">Total TPS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-[#7a00ff]">
              {chains.length > 0 ? Math.round(chains.reduce((s, c) => s + c.health, 0) / chains.length) : 0}%
            </div>
            <div className="text-xs font-mono text-gray-600">Avg Health</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-[#00ff88]">
              {chains.length > 0 ? Math.round(chains.reduce((s, c) => s + c.latency, 0) / chains.length) : 0}ms
            </div>
            <div className="text-xs font-mono text-gray-600">Avg Latency</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
