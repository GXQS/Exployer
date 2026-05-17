// Original file: services/wallet.proto


/**
 * GetAccountStateRequest identifies an account by its 32-byte address.
 */
export interface GetAccountStateRequest {
  'address'?: (Buffer | Uint8Array | string);
}

/**
 * GetAccountStateRequest identifies an account by its 32-byte address.
 */
export interface GetAccountStateRequest__Output {
  'address': (Buffer);
}
