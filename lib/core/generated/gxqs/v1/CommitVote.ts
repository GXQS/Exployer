// Original file: block.proto

import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from '../../gxqs/v1/PQCSignature';
import type { Long } from '@grpc/proto-loader';

/**
 * CommitVote is a validator's pre-commit vote for a block.
 * Validators sign either pre_vote_payload() or pre_commit_payload() to prevent
 * cross-phase signature replay.
 */
export interface CommitVote {
  /**
   * validator_address is the 32-byte address of the signing validator.
   */
  'validatorAddress'?: (Buffer | Uint8Array | string);
  /**
   * block_id is the SHA3-256 hash of the voted-for block header (32 bytes).
   */
  'blockId'?: (Buffer | Uint8Array | string);
  'height'?: (number | string | Long);
  'round'?: (number);
  'sig'?: (_gxqs_v1_PQCSignature | null);
}

/**
 * CommitVote is a validator's pre-commit vote for a block.
 * Validators sign either pre_vote_payload() or pre_commit_payload() to prevent
 * cross-phase signature replay.
 */
export interface CommitVote__Output {
  /**
   * validator_address is the 32-byte address of the signing validator.
   */
  'validatorAddress': (Buffer);
  /**
   * block_id is the SHA3-256 hash of the voted-for block header (32 bytes).
   */
  'blockId': (Buffer);
  'height': (string);
  'round': (number);
  'sig': (_gxqs_v1_PQCSignature__Output | null);
}
