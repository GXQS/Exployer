// Original file: services/exployer.proto

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from '../../../gxqs/v1/Block';

/**
 * ExployerGetBlockResponse wraps the requested block.
 */
export interface ExployerGetBlockResponse {
  'block'?: (_gxqs_v1_Block | null);
  'found'?: (boolean);
}

/**
 * ExployerGetBlockResponse wraps the requested block.
 */
export interface ExployerGetBlockResponse__Output {
  'block': (_gxqs_v1_Block__Output | null);
  'found': (boolean);
}
