// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * GetChainInfoResponse carries chain-level metadata.
 */
export interface GetChainInfoResponse {
  'chainId'?: (number | string | Long);
  'latestHeight'?: (number | string | Long);
  /**
   * latest_block_id is the SHA3-256 hash of the most recent block (32 bytes).
   */
  'latestBlockId'?: (Buffer | Uint8Array | string);
  'latestTimestamp'?: (number | string | Long);
  /**
   * total_transactions is the cumulative transaction count across all blocks.
   */
  'totalTransactions'?: (number | string | Long);
}

/**
 * GetChainInfoResponse carries chain-level metadata.
 */
export interface GetChainInfoResponse__Output {
  'chainId': (string);
  'latestHeight': (string);
  /**
   * latest_block_id is the SHA3-256 hash of the most recent block (32 bytes).
   */
  'latestBlockId': (Buffer);
  'latestTimestamp': (string);
  /**
   * total_transactions is the cumulative transaction count across all blocks.
   */
  'totalTransactions': (string);
}
