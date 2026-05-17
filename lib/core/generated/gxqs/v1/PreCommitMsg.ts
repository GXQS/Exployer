// Original file: consensus.proto

import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from '../../gxqs/v1/CommitVote';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from '../../gxqs/v1/PQCSignature';

/**
 * PreCommitMsg carries a validator's pre-commit for a block ID.
 * The signing payload is domain-separated with byte 0x02.
 */
export interface PreCommitMsg {
  'vote'?: (_gxqs_v1_CommitVote | null);
  'signature'?: (_gxqs_v1_PQCSignature | null);
}

/**
 * PreCommitMsg carries a validator's pre-commit for a block ID.
 * The signing payload is domain-separated with byte 0x02.
 */
export interface PreCommitMsg__Output {
  'vote': (_gxqs_v1_CommitVote__Output | null);
  'signature': (_gxqs_v1_PQCSignature__Output | null);
}
