// Original file: services/wallet.proto


/**
 * GetTransactionRequest looks up a transaction by its 32-byte ID.
 */
export interface GetTransactionRequest {
  'txId'?: (Buffer | Uint8Array | string);
}

/**
 * GetTransactionRequest looks up a transaction by its 32-byte ID.
 */
export interface GetTransactionRequest__Output {
  'txId': (Buffer);
}
