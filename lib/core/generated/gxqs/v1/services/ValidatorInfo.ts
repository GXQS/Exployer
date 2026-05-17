// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * ValidatorInfo describes a single active validator.
 */
export interface ValidatorInfo {
  /**
   * address is the validator's 32-byte GXQS address.
   */
  'address'?: (Buffer | Uint8Array | string);
  'votingPower'?: (number | string | Long);
  /**
   * public_key is the validator's serialized PQC public key.
   */
  'publicKey'?: (Buffer | Uint8Array | string);
}

/**
 * ValidatorInfo describes a single active validator.
 */
export interface ValidatorInfo__Output {
  /**
   * address is the validator's 32-byte GXQS address.
   */
  'address': (Buffer);
  'votingPower': (string);
  /**
   * public_key is the validator's serialized PQC public key.
   */
  'publicKey': (Buffer);
}
