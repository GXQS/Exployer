import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from './gxqs/v1/Block';
import type { BlockHeader as _gxqs_v1_BlockHeader, BlockHeader__Output as _gxqs_v1_BlockHeader__Output } from './gxqs/v1/BlockHeader';
import type { CommitVote as _gxqs_v1_CommitVote, CommitVote__Output as _gxqs_v1_CommitVote__Output } from './gxqs/v1/CommitVote';
import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from './gxqs/v1/PQCSignature';
import type { Transaction as _gxqs_v1_Transaction, Transaction__Output as _gxqs_v1_Transaction__Output } from './gxqs/v1/Transaction';
import type { ExployerGetBlockRequest as _gxqs_v1_services_ExployerGetBlockRequest, ExployerGetBlockRequest__Output as _gxqs_v1_services_ExployerGetBlockRequest__Output } from './gxqs/v1/services/ExployerGetBlockRequest';
import type { ExployerGetBlockResponse as _gxqs_v1_services_ExployerGetBlockResponse, ExployerGetBlockResponse__Output as _gxqs_v1_services_ExployerGetBlockResponse__Output } from './gxqs/v1/services/ExployerGetBlockResponse';
import type { ExployerGetTransactionRequest as _gxqs_v1_services_ExployerGetTransactionRequest, ExployerGetTransactionRequest__Output as _gxqs_v1_services_ExployerGetTransactionRequest__Output } from './gxqs/v1/services/ExployerGetTransactionRequest';
import type { ExployerGetTransactionResponse as _gxqs_v1_services_ExployerGetTransactionResponse, ExployerGetTransactionResponse__Output as _gxqs_v1_services_ExployerGetTransactionResponse__Output } from './gxqs/v1/services/ExployerGetTransactionResponse';
import type { ExployerServiceClient as _gxqs_v1_services_ExployerServiceClient, ExployerServiceDefinition as _gxqs_v1_services_ExployerServiceDefinition } from './gxqs/v1/services/ExployerService';
import type { GetChainInfoRequest as _gxqs_v1_services_GetChainInfoRequest, GetChainInfoRequest__Output as _gxqs_v1_services_GetChainInfoRequest__Output } from './gxqs/v1/services/GetChainInfoRequest';
import type { GetChainInfoResponse as _gxqs_v1_services_GetChainInfoResponse, GetChainInfoResponse__Output as _gxqs_v1_services_GetChainInfoResponse__Output } from './gxqs/v1/services/GetChainInfoResponse';
import type { GetValidatorSetRequest as _gxqs_v1_services_GetValidatorSetRequest, GetValidatorSetRequest__Output as _gxqs_v1_services_GetValidatorSetRequest__Output } from './gxqs/v1/services/GetValidatorSetRequest';
import type { GetValidatorSetResponse as _gxqs_v1_services_GetValidatorSetResponse, GetValidatorSetResponse__Output as _gxqs_v1_services_GetValidatorSetResponse__Output } from './gxqs/v1/services/GetValidatorSetResponse';
import type { ListTransactionsRequest as _gxqs_v1_services_ListTransactionsRequest, ListTransactionsRequest__Output as _gxqs_v1_services_ListTransactionsRequest__Output } from './gxqs/v1/services/ListTransactionsRequest';
import type { ListTransactionsResponse as _gxqs_v1_services_ListTransactionsResponse, ListTransactionsResponse__Output as _gxqs_v1_services_ListTransactionsResponse__Output } from './gxqs/v1/services/ListTransactionsResponse';
import type { StreamBlocksRequest as _gxqs_v1_services_StreamBlocksRequest, StreamBlocksRequest__Output as _gxqs_v1_services_StreamBlocksRequest__Output } from './gxqs/v1/services/StreamBlocksRequest';
import type { TransactionRecord as _gxqs_v1_services_TransactionRecord, TransactionRecord__Output as _gxqs_v1_services_TransactionRecord__Output } from './gxqs/v1/services/TransactionRecord';
import type { ValidatorInfo as _gxqs_v1_services_ValidatorInfo, ValidatorInfo__Output as _gxqs_v1_services_ValidatorInfo__Output } from './gxqs/v1/services/ValidatorInfo';

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
        ExployerGetBlockRequest: MessageTypeDefinition<_gxqs_v1_services_ExployerGetBlockRequest, _gxqs_v1_services_ExployerGetBlockRequest__Output>
        ExployerGetBlockResponse: MessageTypeDefinition<_gxqs_v1_services_ExployerGetBlockResponse, _gxqs_v1_services_ExployerGetBlockResponse__Output>
        ExployerGetTransactionRequest: MessageTypeDefinition<_gxqs_v1_services_ExployerGetTransactionRequest, _gxqs_v1_services_ExployerGetTransactionRequest__Output>
        ExployerGetTransactionResponse: MessageTypeDefinition<_gxqs_v1_services_ExployerGetTransactionResponse, _gxqs_v1_services_ExployerGetTransactionResponse__Output>
        /**
         * ExployerService is the gRPC service consumed by the GXQS block explorer.
         */
        ExployerService: SubtypeConstructor<typeof grpc.Client, _gxqs_v1_services_ExployerServiceClient> & { service: _gxqs_v1_services_ExployerServiceDefinition }
        GetChainInfoRequest: MessageTypeDefinition<_gxqs_v1_services_GetChainInfoRequest, _gxqs_v1_services_GetChainInfoRequest__Output>
        GetChainInfoResponse: MessageTypeDefinition<_gxqs_v1_services_GetChainInfoResponse, _gxqs_v1_services_GetChainInfoResponse__Output>
        GetValidatorSetRequest: MessageTypeDefinition<_gxqs_v1_services_GetValidatorSetRequest, _gxqs_v1_services_GetValidatorSetRequest__Output>
        GetValidatorSetResponse: MessageTypeDefinition<_gxqs_v1_services_GetValidatorSetResponse, _gxqs_v1_services_GetValidatorSetResponse__Output>
        ListTransactionsRequest: MessageTypeDefinition<_gxqs_v1_services_ListTransactionsRequest, _gxqs_v1_services_ListTransactionsRequest__Output>
        ListTransactionsResponse: MessageTypeDefinition<_gxqs_v1_services_ListTransactionsResponse, _gxqs_v1_services_ListTransactionsResponse__Output>
        StreamBlocksRequest: MessageTypeDefinition<_gxqs_v1_services_StreamBlocksRequest, _gxqs_v1_services_StreamBlocksRequest__Output>
        TransactionRecord: MessageTypeDefinition<_gxqs_v1_services_TransactionRecord, _gxqs_v1_services_TransactionRecord__Output>
        ValidatorInfo: MessageTypeDefinition<_gxqs_v1_services_ValidatorInfo, _gxqs_v1_services_ValidatorInfo__Output>
      }
    }
  }
}

