// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * StreamBlocksRequest configures the block stream.
 */
export interface StreamBlocksRequest {
  /**
   * from_height is the block height from which to start streaming.
   * Use 0 to start from genesis.
   */
  'fromHeight'?: (number | string | Long);
}

/**
 * StreamBlocksRequest configures the block stream.
 */
export interface StreamBlocksRequest__Output {
  /**
   * from_height is the block height from which to start streaming.
   * Use 0 to start from genesis.
   */
  'fromHeight': (string);
}
