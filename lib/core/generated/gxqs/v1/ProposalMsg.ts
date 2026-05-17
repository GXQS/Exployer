// Original file: consensus.proto

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from '../../gxqs/v1/Block';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from '../../gxqs/v1/PQCSignature';

/**
 * ProposalMsg carries a proposed block from the designated proposer.
 * The proposer signs the block's header ID with its PQC key.
 */
export interface ProposalMsg {
  'block'?: (_gxqs_v1_Block | null);
  'signature'?: (_gxqs_v1_PQCSignature | null);
}

/**
 * ProposalMsg carries a proposed block from the designated proposer.
 * The proposer signs the block's header ID with its PQC key.
 */
export interface ProposalMsg__Output {
  'block': (_gxqs_v1_Block__Output | null);
  'signature': (_gxqs_v1_PQCSignature__Output | null);
}
