// Original file: consensus.proto

import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from '../../gxqs/v1/CommitVote';
import type { Long } from '@grpc/proto-loader';

/**
 * QuorumCertificate aggregates ≥ 2/3 pre-commit votes for a block.
 * A QC is the proof of finality for a block height.
 */
export interface QuorumCertificate {
  'blockId'?: (Buffer | Uint8Array | string);
  'height'?: (number | string | Long);
  'round'?: (number);
  'votes'?: (_gxqs_v1_CommitVote)[];
}

/**
 * QuorumCertificate aggregates ≥ 2/3 pre-commit votes for a block.
 * A QC is the proof of finality for a block height.
 */
export interface QuorumCertificate__Output {
  'blockId': (Buffer);
  'height': (string);
  'round': (number);
  'votes': (_gxqs_v1_CommitVote__Output)[];
}
