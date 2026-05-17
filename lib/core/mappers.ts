import 'server-only';

import { createHash } from 'node:crypto';
import type { Block__Output } from '@/lib/core/generated/gxqs/v1/Block';
import type { Transaction__Output } from '@/lib/core/generated/gxqs/v1/Transaction';
import type { ChainEvent__Output } from '@/lib/core/generated/gxqs/v1/services/ChainEvent';
import type { GetChainInfoResponse__Output } from '@/lib/core/generated/gxqs/v1/services/GetChainInfoResponse';
import type { ValidatorInfo__Output } from '@/lib/core/generated/gxqs/v1/services/ValidatorInfo';
import type { Block, ChainEvent, ChainStats, HealthCheck, Transaction, TransactionType, Validator } from '@/lib/explorer-types';

function numeric(value: string | number | bigint | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function bytesToHex(value: Buffer | Uint8Array | string | null | undefined): string | null {
  if (!value) return null;
  if (typeof value === 'string') {
    return value.startsWith('0x') ? value : `0x${value}`;
  }

  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer.length > 0 ? `0x${buffer.toString('hex')}` : null;
}

function zeroAddress(hex: string | null): boolean {
  return !hex || /^0x0+$/.test(hex);
}

function displayValue(rawValue: string): string {
  return `${rawValue} GXQS`;
}

function inferTransactionType(transaction: Transaction__Output): TransactionType {
  const hasData = transaction.data.length > 0;
  const to = bytesToHex(transaction.to);

  if (hasData && zeroAddress(to)) return 'deploy';
  if (hasData) return 'contract';
  if (numeric(transaction.value) === 0) return 'unknown';
  return 'transfer';
}

function syntheticTransactionHash(transaction: Transaction__Output, blockHeight: number | null, position: number | null): string {
  const digest = createHash('sha256')
    .update(transaction.from)
    .update(transaction.to)
    .update(transaction.data)
    .update(transaction.timestamp)
    .update(String(blockHeight ?? ''))
    .update(String(position ?? ''))
    .digest('hex');

  return `0x${digest}`;
}

export function mapCoreTransaction(
  transaction: Transaction__Output,
  context: { hash?: string | null; blockHeight?: number | null; position?: number | null } = {},
): Transaction {
  const gasUsed = numeric(transaction.gasLimit);
  const gasPrice = numeric(transaction.gasPrice);
  const rawValue = transaction.value || '0';
  const type = inferTransactionType(transaction);

  return {
    hash: context.hash ?? syntheticTransactionHash(transaction, context.blockHeight ?? null, context.position ?? null),
    blockHeight: context.blockHeight ?? null,
    from: bytesToHex(transaction.from),
    to: bytesToHex(transaction.to),
    value: displayValue(rawValue),
    rawValue,
    gasUsed,
    gasPrice,
    status: 'success',
    timestamp: numeric(transaction.timestamp) ?? Date.now(),
    type,
    data: transaction.data.length > 0 ? bytesToHex(transaction.data) ?? undefined : undefined,
    fee: gasUsed !== null && gasPrice !== null ? gasUsed * gasPrice : null,
    availability: {
      hash: context.hash ? 'core' : 'derived',
      type: 'derived',
      status: 'derived',
    },
  };
}

export function mapCoreBlock(
  block: Block__Output,
  context: { hash?: string | null; previousTimestamp?: number | null } = {},
): Block {
  const timestamp = numeric(block.header?.timestamp) ?? Date.now();
  const txCount = block.transactions.length;
  const gasUsed = block.transactions.reduce((sum, transaction) => sum + (numeric(transaction.gasLimit) ?? 0), 0);
  const previousTimestamp = context.previousTimestamp ?? null;
  const tps = previousTimestamp && timestamp > previousTimestamp
    ? Number((txCount / ((timestamp - previousTimestamp) / 1000)).toFixed(2))
    : null;

  return {
    height: numeric(block.header?.height) ?? 0,
    hash: context.hash ?? null,
    parentHash: bytesToHex(block.header?.parentId),
    timestamp,
    txCount,
    size: Buffer.byteLength(JSON.stringify(block)),
    gasUsed,
    gasLimit: null,
    proposer: bytesToHex(block.header?.proposerAddress),
    finalized: true,
    tps,
    availability: {
      hash: context.hash ? 'core' : 'unavailable',
      size: 'derived',
      gasUsed: 'derived',
      gasLimit: 'unavailable',
      tps: tps !== null ? 'derived' : 'unavailable',
    },
  };
}

export function mapCoreValidator(validator: ValidatorInfo__Output, index: number): Validator {
  const votingPower = numeric(validator.votingPower) ?? 0;

  return {
    address: bytesToHex(validator.address) ?? `validator-${index}`,
    name: null,
    stake: votingPower,
    votingPower,
    delegators: null,
    uptime: null,
    blocksProposed: null,
    commission: null,
    status: 'active',
    apy: null,
    availability: {
      address: 'core',
      stake: 'core',
      votingPower: 'core',
      name: 'unavailable',
      delegators: 'unavailable',
      uptime: 'unavailable',
      blocksProposed: 'unavailable',
      commission: 'unavailable',
      apy: 'unavailable',
    },
  };
}

export function mapCoreChainStats(
  chainInfo: GetChainInfoResponse__Output,
  blocks: Block[],
  validators: Validator[],
): ChainStats {
  const timestamps = blocks.map(block => block.timestamp).sort((a, b) => a - b);
  const diffs = timestamps.slice(1).map((timestamp, index) => timestamp - timestamps[index]).filter(diff => diff > 0);
  const avgBlockTime = diffs.length > 0
    ? Number((diffs.reduce((sum, diff) => sum + diff, 0) / diffs.length / 1000).toFixed(2))
    : null;
  const totalTxCount = blocks.reduce((sum, block) => sum + block.txCount, 0);
  const durationMs = timestamps.length > 1 ? timestamps[timestamps.length - 1] - timestamps[0] : 0;
  const tps = durationMs > 0 ? Number((totalTxCount / (durationMs / 1000)).toFixed(2)) : null;

  return {
    blockHeight: numeric(chainInfo.latestHeight) ?? 0,
    tps,
    avgBlockTime,
    totalTx: numeric(chainInfo.totalTransactions) ?? 0,
    activeValidators: validators.length,
    totalStake: validators.reduce((sum, validator) => sum + validator.stake, 0),
    marketCap: null,
    price: null,
    mempoolSize: null,
    finality: null,
    availability: {
      blockHeight: 'core',
      totalTx: 'core',
      activeValidators: 'core',
      totalStake: 'core',
      tps: tps !== null ? 'derived' : 'unavailable',
      avgBlockTime: avgBlockTime !== null ? 'derived' : 'unavailable',
      marketCap: 'unavailable',
      price: 'unavailable',
      mempoolSize: 'unavailable',
      finality: 'unavailable',
    },
  };
}

export function mapCoreChainEvent(event: ChainEvent__Output): ChainEvent {
  return {
    eventType: event.eventType,
    height: numeric(event.height) ?? 0,
    payload: bytesToHex(event.payload) ?? '0x',
    timestamp: numeric(event.timestamp) ?? Date.now(),
    eventHash: bytesToHex(event.eventHash),
  };
}

export function mapCoreHealthCheck(
  latency: number,
  chainInfo: GetChainInfoResponse__Output,
  endpoint: string,
): HealthCheck {
  const latestTimestamp = numeric(chainInfo.latestTimestamp) ?? 0;
  const lagMs = latestTimestamp > 0 ? Date.now() - latestTimestamp : Number.POSITIVE_INFINITY;

  return {
    status: latency > 1_500 || lagMs > 30_000 ? 'degraded' : 'healthy',
    latency,
    lastBlock: numeric(chainInfo.latestHeight) ?? 0,
    details: {
      endpoint,
      latestTimestamp,
    },
  };
}
