// Original file: block.proto

import type { BlockHeader as _gxqs_v1_BlockHeader, BlockHeader__Output as _gxqs_v1_BlockHeader__Output } from '../../gxqs/v1/BlockHeader';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from '../../gxqs/v1/Transaction';
import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from '../../gxqs/v1/CommitVote';

/**
 * Block is a complete GXQS block.
 */
export interface Block {
  'header'?: (_gxqs_v1_BlockHeader | null);
  'transactions'?: (_gxqs_v1_Transaction)[];
  /**
   * commits holds ≥ 2/3 pre-commit votes from the validator set.
   */
  'commits'?: (_gxqs_v1_CommitVote)[];
}

/**
 * Block is a complete GXQS block.
 */
export interface Block__Output {
  'header': (_gxqs_v1_BlockHeader__Output | null);
  'transactions': (_gxqs_v1_Transaction__Output)[];
  /**
   * commits holds ≥ 2/3 pre-commit votes from the validator set.
   */
  'commits': (_gxqs_v1_CommitVote__Output)[];
}
