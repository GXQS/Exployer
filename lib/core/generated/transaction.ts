import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from './gxqs/v1/PQCSignature';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from './gxqs/v1/Transaction';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  gxqs: {
    v1: {
      PQCSignature: MessageTypeDefinition<_gxqs_v1_PQCSignature, _gxqs_v1_PQCSignature__Output>
      SignatureScheme: EnumTypeDefinition
      Transaction: MessageTypeDefinition<_gxqs_v1_Transaction, _gxqs_v1_Transaction__Output>
    }
  }
}

