// Original file: services/wallet.proto

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from '../../../gxqs/v1/Block';

/**
 * GetBlockResponse wraps the requested block.  found is false when the block
 * does not exist at the requested height or hash.
 */
export interface GetBlockResponse {
  'block'?: (_gxqs_v1_Block | null);
  'found'?: (boolean);
}

/**
 * GetBlockResponse wraps the requested block.  found is false when the block
 * does not exist at the requested height or hash.
 */
export interface GetBlockResponse__Output {
  'block': (_gxqs_v1_Block__Output | null);
  'found': (boolean);
}
