// Original file: services/wallet.proto

import type { Long } from '@grpc/proto-loader';

/**
 * GetAccountStateResponse carries the on-chain state of an account.
 */
export interface GetAccountStateResponse {
  'nonce'?: (number | string | Long);
  'balance'?: (number | string | Long);
  /**
   * code_hash is the SHA3-256 of contract bytecode, or zero for EOAs (32 bytes).
   */
  'codeHash'?: (Buffer | Uint8Array | string);
  /**
   * storage_root is the Merkle root of contract storage (32 bytes).
   */
  'storageRoot'?: (Buffer | Uint8Array | string);
}

/**
 * GetAccountStateResponse carries the on-chain state of an account.
 */
export interface GetAccountStateResponse__Output {
  'nonce': (string);
  'balance': (string);
  /**
   * code_hash is the SHA3-256 of contract bytecode, or zero for EOAs (32 bytes).
   */
  'codeHash': (Buffer);
  /**
   * storage_root is the Merkle root of contract storage (32 bytes).
   */
  'storageRoot': (Buffer);
}
