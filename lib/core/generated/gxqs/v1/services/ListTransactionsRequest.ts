// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * ListTransactionsRequest paginates transactions for an address.
 */
export interface ListTransactionsRequest {
  'address'?: (Buffer | Uint8Array | string);
  'fromHeight'?: (number | string | Long);
  'toHeight'?: (number | string | Long);
  /**
   * limit caps the number of records returned (max 1000).
   */
  'limit'?: (number);
  /**
   * page_token is the opaque continuation token from the previous response.
   */
  'pageToken'?: (string);
}

/**
 * ListTransactionsRequest paginates transactions for an address.
 */
export interface ListTransactionsRequest__Output {
  'address': (Buffer);
  'fromHeight': (string);
  'toHeight': (string);
  /**
   * limit caps the number of records returned (max 1000).
   */
  'limit': (number);
  /**
   * page_token is the opaque continuation token from the previous response.
   */
  'pageToken': (string);
}
