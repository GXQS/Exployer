// Original file: services/wallet.proto


/**
 * SubmitTransactionResponse is returned after a transaction is received.
 * accepted is true if the transaction was accepted into the mempool.
 */
export interface SubmitTransactionResponse {
  /**
   * tx_id is the SHA3-256 hash of the transaction (32 bytes).
   */
  'txId'?: (Buffer | Uint8Array | string);
  'accepted'?: (boolean);
  /**
   * error contains a human-readable rejection reason when accepted is false.
   */
  'error'?: (string);
}

/**
 * SubmitTransactionResponse is returned after a transaction is received.
 * accepted is true if the transaction was accepted into the mempool.
 */
export interface SubmitTransactionResponse__Output {
  /**
   * tx_id is the SHA3-256 hash of the transaction (32 bytes).
   */
  'txId': (Buffer);
  'accepted': (boolean);
  /**
   * error contains a human-readable rejection reason when accepted is false.
   */
  'error': (string);
}
