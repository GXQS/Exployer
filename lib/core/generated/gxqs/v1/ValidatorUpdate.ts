// Original file: consensus.proto

import type { Long } from '@grpc/proto-loader';

/**
 * ValidatorUpdate announces a change to the active validator set.
 * A new set takes effect at next_height.
 */
export interface ValidatorUpdate {
  'address'?: (Buffer | Uint8Array | string);
  'publicKey'?: (Buffer | Uint8Array | string);
  'votingPower'?: (number | string | Long);
  'nextHeight'?: (number | string | Long);
  /**
   * remove, when true, removes the validator from the active set.
   */
  'remove'?: (boolean);
}

/**
 * ValidatorUpdate announces a change to the active validator set.
 * A new set takes effect at next_height.
 */
export interface ValidatorUpdate__Output {
  'address': (Buffer);
  'publicKey': (Buffer);
  'votingPower': (string);
  'nextHeight': (string);
  /**
   * remove, when true, removes the validator from the active set.
   */
  'remove': (boolean);
}
