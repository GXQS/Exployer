// Original file: services/exployer.proto

import type { TransactionRecord as _gxqs_v1_services_TransactionRecord, TransactionRecord__Output as _gxqs_v1_services_TransactionRecord__Output } from '../../../gxqs/v1/services/TransactionRecord';

/**
 * ListTransactionsResponse carries paginated transaction records.
 */
export interface ListTransactionsResponse {
  'records'?: (_gxqs_v1_services_TransactionRecord)[];
  'hasMore'?: (boolean);
  /**
   * next_page_token is set when has_more is true.
   */
  'nextPageToken'?: (string);
}

/**
 * ListTransactionsResponse carries paginated transaction records.
 */
export interface ListTransactionsResponse__Output {
  'records': (_gxqs_v1_services_TransactionRecord__Output)[];
  'hasMore': (boolean);
  /**
   * next_page_token is set when has_more is true.
   */
  'nextPageToken': (string);
}
