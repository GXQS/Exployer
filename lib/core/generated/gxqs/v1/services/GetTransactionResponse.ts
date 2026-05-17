// Original file: services/wallet.proto

import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from '../../../gxqs/v1/Transaction';
import type { Long } from '@grpc/proto-loader';

/**
 * GetTransactionResponse wraps the requested transaction and its inclusion
 * information.
 */
export interface GetTransactionResponse {
  'transaction'?: (_gxqs_v1_Transaction | null);
  'blockHeight'?: (number | string | Long);
  'found'?: (boolean);
}

/**
 * GetTransactionResponse wraps the requested transaction and its inclusion
 * information.
 */
export interface GetTransactionResponse__Output {
  'transaction': (_gxqs_v1_Transaction__Output | null);
  'blockHeight': (string);
  'found': (boolean);
}
