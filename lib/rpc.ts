import 'server-only';

import { getCoreConfig } from '@/lib/core/config';
import { CoreRpcError, getExplorerClient, invokeUnary } from '@/lib/core/client';
import { mapCoreBlock, mapCoreChainStats, mapCoreHealthCheck, mapCoreTransaction, mapCoreValidator } from '@/lib/core/mappers';
import type { ExployerGetBlockResponse__Output } from '@/lib/core/generated/gxqs/v1/services/ExployerGetBlockResponse';
import type { ExployerGetTransactionResponse__Output } from '@/lib/core/generated/gxqs/v1/services/ExployerGetTransactionResponse';
import type { GetChainInfoResponse__Output } from '@/lib/core/generated/gxqs/v1/services/GetChainInfoResponse';
import type { GetValidatorSetResponse__Output } from '@/lib/core/generated/gxqs/v1/services/GetValidatorSetResponse';
import type { Block, ChainStats, HealthCheck, MempoolTx, Transaction, Validator } from '@/lib/explorer-types';

export type { Block, ChainStats, HealthCheck, MempoolTx, Transaction, Validator } from '@/lib/explorer-types';

class UnsupportedCoreFeatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedCoreFeatureError';
  }
}

function decodeHex(input: string): Buffer {
  const normalized = input.startsWith('0x') ? input.slice(2) : input;

  if (!/^[0-9a-fA-F]+$/.test(normalized) || normalized.length % 2 !== 0) {
    throw new CoreRpcError('Invalid hex identifier supplied to Core');
  }

  return Buffer.from(normalized, 'hex');
}

async function getChainInfoResponse(): Promise<GetChainInfoResponse__Output> {
  const client = getExplorerClient();
  return invokeUnary('GetChainInfo', (metadata, options, callback) =>
    client.getChainInfo({}, metadata, options, callback),
  );
}

async function getBlockResponse(height: number): Promise<ExployerGetBlockResponse__Output | null> {
  const client = getExplorerClient();
  const response = await invokeUnary('GetBlock', (metadata, options, callback) =>
    client.getBlock({ height }, metadata, options, callback),
  );

  return response.found ? response : null;
}

async function getTransactionResponse(hash: string): Promise<ExployerGetTransactionResponse__Output | null> {
  const client = getExplorerClient();
  const response = await invokeUnary('GetTransaction', (metadata, options, callback) =>
    client.getTransaction({ txId: decodeHex(hash) }, metadata, options, callback),
  );

  return response.found ? response : null;
}

async function getValidatorSetResponse(height: number): Promise<GetValidatorSetResponse__Output> {
  const client = getExplorerClient();
  return invokeUnary('GetValidatorSet', (metadata, options, callback) =>
    client.getValidatorSet({ height }, metadata, options, callback),
  );
}

async function fetchLatestCoreBlocks(count: number): Promise<Array<{ raw: NonNullable<ExployerGetBlockResponse__Output['block']>; hash: string | null }>> {
  const chainInfo = await getChainInfoResponse();
  const latestHeight = Number(chainInfo.latestHeight);

  if (!Number.isFinite(latestHeight) || latestHeight <= 0) {
    return [];
  }

  const startHeight = Math.max(1, latestHeight - count + 1);
  const heights = Array.from({ length: latestHeight - startHeight + 1 }, (_, index) => latestHeight - index);
  const responses = await Promise.all(heights.map(getBlockResponse));
  const blocks = responses
    .filter((response): response is ExployerGetBlockResponse__Output & { block: NonNullable<ExployerGetBlockResponse__Output['block']> } => Boolean(response?.block))
    .map(response => response.block)
    .sort((left, right) => Number(right.header?.height ?? 0) - Number(left.header?.height ?? 0));

  const hashes = new Map<number, string | null>();
  hashes.set(latestHeight, chainInfo.latestBlockId.length > 0 ? `0x${chainInfo.latestBlockId.toString('hex')}` : null);

  for (const block of blocks) {
    const height = Number(block.header?.height ?? 0);
    const parentHash = block.header?.parentId?.length ? `0x${block.header.parentId.toString('hex')}` : null;
    if (parentHash) {
      hashes.set(height - 1, parentHash);
    }
  }

  return blocks.map(block => ({
    raw: block,
    hash: hashes.get(Number(block.header?.height ?? 0)) ?? null,
  }));
}

export async function getLatestBlocks(count = 20): Promise<Block[]> {
  const coreBlocks = await fetchLatestCoreBlocks(count);

  return coreBlocks.map((entry, index) =>
    mapCoreBlock(entry.raw, {
      hash: entry.hash,
      previousTimestamp: coreBlocks[index + 1] ? Number(coreBlocks[index + 1].raw.header?.timestamp ?? 0) : null,
    }),
  );
}

export async function getBlockByHeight(height: number): Promise<Block | null> {
  const [chainInfo, response] = await Promise.all([getChainInfoResponse(), getBlockResponse(height)]);

  if (!response?.block) {
    return null;
  }

  const latestHeight = Number(chainInfo.latestHeight);
  const hash = latestHeight === height && chainInfo.latestBlockId.length > 0
    ? `0x${chainInfo.latestBlockId.toString('hex')}`
    : null;

  return mapCoreBlock(response.block, { hash });
}

export async function getTransaction(hash: string): Promise<Transaction | null> {
  if (!hash) return null;

  const response = await getTransactionResponse(hash);
  if (!response?.transaction) return null;

  return mapCoreTransaction(response.transaction, {
    hash,
    blockHeight: Number(response.blockHeight),
    position: Number(response.position),
  });
}

export async function getRecentTransactions(count = 20): Promise<Transaction[]> {
  const blocks = await fetchLatestCoreBlocks(Math.max(5, Math.min(20, count)));

  return blocks
    .flatMap(({ raw }) => {
      const blockHeight = Number(raw.header?.height ?? 0);
      return raw.transactions.map((transaction, position) =>
        mapCoreTransaction(transaction, {
          blockHeight,
          position,
        }),
      );
    })
    .sort((left, right) => right.timestamp - left.timestamp)
    .slice(0, count);
}

export async function getMempool(): Promise<MempoolTx[]> {
  return [];
}

export async function getValidators(): Promise<Validator[]> {
  const chainInfo = await getChainInfoResponse();
  const validatorSet = await getValidatorSetResponse(Number(chainInfo.latestHeight));

  return validatorSet.validators.map((validator, index) => mapCoreValidator(validator, index));
}

export async function getChainStats(): Promise<ChainStats> {
  const chainInfo = await getChainInfoResponse();
  const [blocks, validators] = await Promise.all([
    getLatestBlocks(6),
    getValidators(),
  ]);

  return mapCoreChainStats(chainInfo, blocks, validators);
}

export async function deployContract(_abi: unknown[], _bytecode: string): Promise<never> {
  throw new UnsupportedCoreFeatureError(
    'Core v0.1.0 does not expose contract deployment over the Exployer gRPC surface.',
  );
}

export async function getHealthCheck(): Promise<HealthCheck> {
  const startedAt = Date.now();

  try {
    const chainInfo = await getChainInfoResponse();
    return mapCoreHealthCheck(Date.now() - startedAt, chainInfo, getCoreConfig().endpoint);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Core connectivity failure';
    return {
      status: 'down',
      latency: Date.now() - startedAt,
      lastBlock: 0,
      details: {
        endpoint: getCoreConfig().endpoint,
        error: message,
      },
    };
  }
}

export function isUnsupportedCoreFeatureError(error: unknown): error is Error {
  return error instanceof UnsupportedCoreFeatureError;
}
