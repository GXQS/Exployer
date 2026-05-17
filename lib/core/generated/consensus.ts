import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from './gxqs/v1/Block';
import type { BlockHeader as _gxqs_v1_BlockHeader, BlockHeader__Output as _gxqs_v1_BlockHeader__Output } from './gxqs/v1/BlockHeader';
import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from './gxqs/v1/CommitVote';
import type { ConsensusState as _gxqs_v1_ConsensusState, ConsensusState__Output as _gxqs_v1_ConsensusState__Output } from './gxqs/v1/ConsensusState';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from './gxqs/v1/PQCSignature';
import type { PreCommitMsg as _gxqs_v1_PreCommitMsg, PreCommitMsg__Output as _gxqs_v1_PreCommitMsg__Output } from './gxqs/v1/PreCommitMsg';
import type { PreVoteMsg as _gxqs_v1_PreVoteMsg, PreVoteMsg__Output as _gxqs_v1_PreVoteMsg__Output } from './gxqs/v1/PreVoteMsg';
import type { ProposalMsg as _gxqs_v1_ProposalMsg, ProposalMsg__Output as _gxqs_v1_ProposalMsg__Output } from './gxqs/v1/ProposalMsg';
import type { QuorumCertificate as _gxqs_v1_QuorumCertificate, QuorumCertificate__Output as _gxqs_v1_QuorumCertificate__Output } from './gxqs/v1/QuorumCertificate';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from './gxqs/v1/Transaction';
import type { ValidatorUpdate as _gxqs_v1_ValidatorUpdate, ValidatorUpdate__Output as _gxqs_v1_ValidatorUpdate__Output } from './gxqs/v1/ValidatorUpdate';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  gxqs: {
    v1: {
      Block: MessageTypeDefinition<_gxqs_v1_Block, _gxqs_v1_Block__Output>
      BlockHeader: MessageTypeDefinition<_gxqs_v1_BlockHeader, _gxqs_v1_BlockHeader__Output>
      CommitVote: MessageTypeDefinition<_gxqs_v1_CommitVote, _gxqs_v1_CommitVote__Output>
      ConsensusState: MessageTypeDefinition<_gxqs_v1_ConsensusState, _gxqs_v1_ConsensusState__Output>
      ConsensusStep: EnumTypeDefinition
      PQCSignature: MessageTypeDefinition<_gxqs_v1_PQCSignature, _gxqs_v1_PQCSignature__Output>
      PreCommitMsg: MessageTypeDefinition<_gxqs_v1_PreCommitMsg, _gxqs_v1_PreCommitMsg__Output>
      PreVoteMsg: MessageTypeDefinition<_gxqs_v1_PreVoteMsg, _gxqs_v1_PreVoteMsg__Output>
      ProposalMsg: MessageTypeDefinition<_gxqs_v1_ProposalMsg, _gxqs_v1_ProposalMsg__Output>
      QuorumCertificate: MessageTypeDefinition<_gxqs_v1_QuorumCertificate, _gxqs_v1_QuorumCertificate__Output>
      SignatureScheme: EnumTypeDefinition
      Transaction: MessageTypeDefinition<_gxqs_v1_Transaction, _gxqs_v1_Transaction__Output>
      ValidatorUpdate: MessageTypeDefinition<_gxqs_v1_ValidatorUpdate, _gxqs_v1_ValidatorUpdate__Output>
    }
  }
}

