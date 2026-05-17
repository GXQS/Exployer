// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * ExployerGetBlockRequest selects a block by height OR by block ID.
 */
export interface ExployerGetBlockRequest {
  'height'?: (number | string | Long);
  'blockId'?: (Buffer | Uint8Array | string);
}

/**
 * ExployerGetBlockRequest selects a block by height OR by block ID.
 */
export interface ExployerGetBlockRequest__Output {
  'height': (string);
  'blockId': (Buffer);
}
