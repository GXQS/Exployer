import { randomBetween } from '../../lib/utils';

export async function getChainSummary(chainName: string) {
  const configs: Record<string, { baseHeight: number; baseTps: number }> = {
    Ethereum: { baseHeight: 20_234_567, baseTps: 15 },
    Polygon: { baseHeight: 59_123_456, baseTps: 400 },
    BSC: { baseHeight: 41_234_567, baseTps: 80 },
    Arbitrum: { baseHeight: 230_123_456, baseTps: 200 },
  };

  const cfg = configs[chainName] ?? { baseHeight: 10_000_000, baseTps: 50 };

  return {
    chain: chainName,
    blockHeight: cfg.baseHeight + randomBetween(0, 100),
    tps: cfg.baseTps + randomBetween(-5, 5),
    mempoolSize: randomBetween(50, 500),
    validatorCount: randomBetween(10, 200),
    latency: randomBetween(20, 200),
    status: Math.random() > 0.05 ? 'online' : 'degraded' as 'online' | 'degraded',
    health: randomBetween(70, 100),
  };
}
