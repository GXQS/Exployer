// Original file: block.proto

import type { Long } from '@grpc/proto-loader';

/**
 * BlockHeader contains the metadata for a GXQS block.
 * The header ID is SHA3-256 of the deterministic serialization of all fields
 * EXCEPT proposer_signature (which signs the ID).
 */
export interface BlockHeader {
  'chainId'?: (number | string | Long);
  'height'?: (number | string | Long);
  /**
   * parent_id is the SHA3-256 hash of the previous block header (32 bytes).
   */
  'parentId'?: (Buffer | Uint8Array | string);
  /**
   * state_root is the Merkle root of the world state after this block (32 bytes).
   */
  'stateRoot'?: (Buffer | Uint8Array | string);
  /**
   * tx_root is the Merkle root of all transactions in this block (32 bytes).
   */
  'txRoot'?: (Buffer | Uint8Array | string);
  /**
   * timestamp is a Unix millisecond timestamp.
   */
  'timestamp'?: (number | string | Long);
  /**
   * proposer_address is the 32-byte address of the block proposer.
   */
  'proposerAddress'?: (Buffer | Uint8Array | string);
  /**
   * round is the BFT round in which this block was proposed.
   */
  'round'?: (number);
  /**
   * proposer_signature is the proposer's PQC signature over the header ID.
   * It is NOT included in the header ID computation.
   */
  'proposerSignature'?: (Buffer | Uint8Array | string);
}

/**
 * BlockHeader contains the metadata for a GXQS block.
 * The header ID is SHA3-256 of the deterministic serialization of all fields
 * EXCEPT proposer_signature (which signs the ID).
 */
export interface BlockHeader__Output {
  'chainId': (string);
  'height': (string);
  /**
   * parent_id is the SHA3-256 hash of the previous block header (32 bytes).
   */
  'parentId': (Buffer);
  /**
   * state_root is the Merkle root of the world state after this block (32 bytes).
   */
  'stateRoot': (Buffer);
  /**
   * tx_root is the Merkle root of all transactions in this block (32 bytes).
   */
  'txRoot': (Buffer);
  /**
   * timestamp is a Unix millisecond timestamp.
   */
  'timestamp': (string);
  /**
   * proposer_address is the 32-byte address of the block proposer.
   */
  'proposerAddress': (Buffer);
  /**
   * round is the BFT round in which this block was proposed.
   */
  'round': (number);
  /**
   * proposer_signature is the proposer's PQC signature over the header ID.
   * It is NOT included in the header ID computation.
   */
  'proposerSignature': (Buffer);
}
