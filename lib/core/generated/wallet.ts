import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from './gxqs/v1/Block';
import type { BlockHeader as _gxqs_v1_BlockHeader, BlockHeader__Output as _gxqs_v1_BlockHeader__Output } from './gxqs/v1/BlockHeader';
import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from './gxqs/v1/CommitVote';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from './gxqs/v1/PQCSignature';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from './gxqs/v1/Transaction';
import type { ChainEvent as _gxqs_v1_services_ChainEvent, ChainEvent__Output as _gxqs_v1_services_ChainEvent__Output } from './gxqs/v1/services/ChainEvent';
import type { GetAccountStateRequest as _gxqs_v1_services_GetAccountStateRequest, GetAccountStateRequest__Output as _gxqs_v1_services_GetAccountStateRequest__Output } from './gxqs/v1/services/GetAccountStateRequest';
import type { GetAccountStateResponse as _gxqs_v1_services_GetAccountStateResponse, GetAccountStateResponse__Output as _gxqs_v1_services_GetAccountStateResponse__Output } from './gxqs/v1/services/GetAccountStateResponse';
import type { GetBlockRequest as _gxqs_v1_services_GetBlockRequest, GetBlockRequest__Output as _gxqs_v1_services_GetBlockRequest__Output } from './gxqs/v1/services/GetBlockRequest';
import type { GetBlockResponse as _gxqs_v1_services_GetBlockResponse, GetBlockResponse__Output as _gxqs_v1_services_GetBlockResponse__Output } from './gxqs/v1/services/GetBlockResponse';
import type { GetTransactionRequest as _gxqs_v1_services_GetTransactionRequest, GetTransactionRequest__Output as _gxqs_v1_services_GetTransactionRequest__Output } from './gxqs/v1/services/GetTransactionRequest';
import type { GetTransactionResponse as _gxqs_v1_services_GetTransactionResponse, GetTransactionResponse__Output as _gxqs_v1_services_GetTransactionResponse__Output } from './gxqs/v1/services/GetTransactionResponse';
import type { StreamEventsRequest as _gxqs_v1_services_StreamEventsRequest, StreamEventsRequest__Output as _gxqs_v1_services_StreamEventsRequest__Output } from './gxqs/v1/services/StreamEventsRequest';
import type { SubmitTransactionRequest as _gxqs_v1_services_SubmitTransactionRequest, SubmitTransactionRequest__Output as _gxqs_v1_services_SubmitTransactionRequest__Output } from './gxqs/v1/services/SubmitTransactionRequest';
import type { SubmitTransactionResponse as _gxqs_v1_services_SubmitTransactionResponse, SubmitTransactionResponse__Output as _gxqs_v1_services_SubmitTransactionResponse__Output } from './gxqs/v1/services/SubmitTransactionResponse';
import type { WalletServiceClient as _gxqs_v1_services_WalletServiceClient, WalletServiceDefinition as _gxqs_v1_services_WalletServiceDefinition } from './gxqs/v1/services/WalletService';

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
      services: {
        ChainEvent: MessageTypeDefinition<_gxqs_v1_services_ChainEvent, _gxqs_v1_services_ChainEvent__Output>
        GetAccountStateRequest: MessageTypeDefinition<_gxqs_v1_services_GetAccountStateRequest, _gxqs_v1_services_GetAccountStateRequest__Output>
        GetAccountStateResponse: MessageTypeDefinition<_gxqs_v1_services_GetAccountStateResponse, _gxqs_v1_services_GetAccountStateResponse__Output>
        GetBlockRequest: MessageTypeDefinition<_gxqs_v1_services_GetBlockRequest, _gxqs_v1_services_GetBlockRequest__Output>
        GetBlockResponse: MessageTypeDefinition<_gxqs_v1_services_GetBlockResponse, _gxqs_v1_services_GetBlockResponse__Output>
        GetTransactionRequest: MessageTypeDefinition<_gxqs_v1_services_GetTransactionRequest, _gxqs_v1_services_GetTransactionRequest__Output>
        GetTransactionResponse: MessageTypeDefinition<_gxqs_v1_services_GetTransactionResponse, _gxqs_v1_services_GetTransactionResponse__Output>
        StreamEventsRequest: MessageTypeDefinition<_gxqs_v1_services_StreamEventsRequest, _gxqs_v1_services_StreamEventsRequest__Output>
        SubmitTransactionRequest: MessageTypeDefinition<_gxqs_v1_services_SubmitTransactionRequest, _gxqs_v1_services_SubmitTransactionRequest__Output>
        SubmitTransactionResponse: MessageTypeDefinition<_gxqs_v1_services_SubmitTransactionResponse, _gxqs_v1_services_SubmitTransactionResponse__Output>
        /**
         * WalletService is the gRPC service consumed by the GXQS Wallet application.
         */
        WalletService: SubtypeConstructor<typeof grpc.Client, _gxqs_v1_services_WalletServiceClient> & { service: _gxqs_v1_services_WalletServiceDefinition }
      }
    }
  }
}

