// Original file: services/wallet.proto

import type { Long } from '@grpc/proto-loader';

/**
 * GetBlockRequest selects a block by height OR by block ID (hash).
 * Exactly one of height or block_id should be set.
 */
export interface GetBlockRequest {
  'height'?: (number | string | Long);
  /**
   * block_id is a 32-byte SHA3-256 block hash.  When non-empty, height is
   * ignored and the node performs a hash-based lookup.
   */
  'blockId'?: (Buffer | Uint8Array | string);
}

/**
 * GetBlockRequest selects a block by height OR by block ID (hash).
 * Exactly one of height or block_id should be set.
 */
export interface GetBlockRequest__Output {
  'height': (string);
  /**
   * block_id is a 32-byte SHA3-256 block hash.  When non-empty, height is
   * ignored and the node performs a hash-based lookup.
   */
  'blockId': (Buffer);
}
