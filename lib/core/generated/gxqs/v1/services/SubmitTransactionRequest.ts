// Original file: services/wallet.proto

import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from '../../../gxqs/v1/Transaction';

/**
 * SubmitTransactionRequest wraps a signed transaction for mempool submission.
 */
export interface SubmitTransactionRequest {
  'transaction'?: (_gxqs_v1_Transaction | null);
}

/**
 * SubmitTransactionRequest wraps a signed transaction for mempool submission.
 */
export interface SubmitTransactionRequest__Output {
  'transaction': (_gxqs_v1_Transaction__Output | null);
}
