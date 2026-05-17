import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from './gxqs/v1/Block';
import type { BlockHeader as _gxqs_v1_BlockHeader, BlockHeader__Output as _gxqs_v1_BlockHeader__Output } from './gxqs/v1/BlockHeader';
import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from './gxqs/v1/CommitVote';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from './gxqs/v1/PQCSignature';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from './gxqs/v1/Transaction';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  gxqs: {
    v1: {
      Block: MessageTypeDefinition<_gxqs_v1_Block, _gxqs_v1_Block__Output>
      BlockHeader: MessageTypeDefinition<_gxqs_v1_BlockHeader, _gxqs_v1_BlockHeader__Output>
      CommitVote: MessageTypeDefinition<_gxqs_v1_CommitVote, _gxqs_v1_CommitVote__Output>
      PQCSignature: MessageTypeDefinition<_gxqs_v1_PQCSignature, _gxqs_v1_PQCSignature__Output>
      SignatureScheme: EnumTypeDefinition
      Transaction: MessageTypeDefinition<_gxqs_v1_Transaction, _gxqs_v1_Transaction__Output>
    }
  }
}

