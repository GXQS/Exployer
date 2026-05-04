import { getChainSummary as getGxqs } from './adapters/gxqs';
import { getChainSummary as getEvm } from './adapters/evm';
import { normalize, type ChainSnapshot } from './normalizer';

export async function getAllChains(): Promise<ChainSnapshot[]> {
  const results = await Promise.allSettled([
    getGxqs().then(d => normalize(d)),
    getEvm('Ethereum').then(d => normalize(d)),
    getEvm('Polygon').then(d => normalize(d)),
    getEvm('BSC').then(d => normalize(d)),
    getEvm('Arbitrum').then(d => normalize(d)),
  ]);

  return results
    .filter((r): r is PromiseFulfilledResult<ChainSnapshot> => r.status === 'fulfilled')
    .map(r => r.value);
}
