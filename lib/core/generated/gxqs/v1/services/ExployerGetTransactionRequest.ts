// Original file: services/exployer.proto


/**
 * ExployerGetTransactionRequest looks up a transaction by its 32-byte ID.
 */
export interface ExployerGetTransactionRequest {
  'txId'?: (Buffer | Uint8Array | string);
}

/**
 * ExployerGetTransactionRequest looks up a transaction by its 32-byte ID.
 */
export interface ExployerGetTransactionRequest__Output {
  'txId': (Buffer);
}
