// Original file: services/exployer.proto

import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from '../../../gxqs/v1/Transaction';
import type { Long } from '@grpc/proto-loader';

/**
 * ExployerGetTransactionResponse wraps the requested transaction and its
 * inclusion metadata.
 */
export interface ExployerGetTransactionResponse {
  'transaction'?: (_gxqs_v1_Transaction | null);
  'blockHeight'?: (number | string | Long);
  /**
   * position is the 0-based index of the transaction within its block.
   */
  'position'?: (number);
  'found'?: (boolean);
}

/**
 * ExployerGetTransactionResponse wraps the requested transaction and its
 * inclusion metadata.
 */
export interface ExployerGetTransactionResponse__Output {
  'transaction': (_gxqs_v1_Transaction__Output | null);
  'blockHeight': (string);
  /**
   * position is the 0-based index of the transaction within its block.
   */
  'position': (number);
  'found': (boolean);
}
