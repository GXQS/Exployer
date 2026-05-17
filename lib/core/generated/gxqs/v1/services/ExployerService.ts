// Original file: services/exployer.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Block as _gxqs_v1_Block, Block__Output as _gxqs_v1_Block__Output } from '../../../gxqs/v1/Block';
import type { ExployerGetBlockRequest as _gxqs_v1_services_ExployerGetBlockRequest, ExployerGetBlockRequest__Output as _gxqs_v1_services_ExployerGetBlockRequest__Output } from '../../../gxqs/v1/services/ExployerGetBlockRequest';
import type { ExployerGetBlockResponse as _gxqs_v1_services_ExployerGetBlockResponse, ExployerGetBlockResponse__Output as _gxqs_v1_services_ExployerGetBlockResponse__Output } from '../../../gxqs/v1/services/ExployerGetBlockResponse';
import type { ExployerGetTransactionRequest as _gxqs_v1_services_ExployerGetTransactionRequest, ExployerGetTransactionRequest__Output as _gxqs_v1_services_ExployerGetTransactionRequest__Output } from '../../../gxqs/v1/services/ExployerGetTransactionRequest';
import type { ExployerGetTransactionResponse as _gxqs_v1_services_ExployerGetTransactionResponse, ExployerGetTransactionResponse__Output as _gxqs_v1_services_ExployerGetTransactionResponse__Output } from '../../../gxqs/v1/services/ExployerGetTransactionResponse';
import type { GetChainInfoRequest as _gxqs_v1_services_GetChainInfoRequest, GetChainInfoRequest__Output as _gxqs_v1_services_GetChainInfoRequest__Output } from '../../../gxqs/v1/services/GetChainInfoRequest';
import type { GetChainInfoResponse as _gxqs_v1_services_GetChainInfoResponse, GetChainInfoResponse__Output as _gxqs_v1_services_GetChainInfoResponse__Output } from '../../../gxqs/v1/services/GetChainInfoResponse';
import type { GetValidatorSetRequest as _gxqs_v1_services_GetValidatorSetRequest, GetValidatorSetRequest__Output as _gxqs_v1_services_GetValidatorSetRequest__Output } from '../../../gxqs/v1/services/GetValidatorSetRequest';
import type { GetValidatorSetResponse as _gxqs_v1_services_GetValidatorSetResponse, GetValidatorSetResponse__Output as _gxqs_v1_services_GetValidatorSetResponse__Output } from '../../../gxqs/v1/services/GetValidatorSetResponse';
import type { ListTransactionsRequest as _gxqs_v1_services_ListTransactionsRequest, ListTransactionsRequest__Output as _gxqs_v1_services_ListTransactionsRequest__Output } from '../../../gxqs/v1/services/ListTransactionsRequest';
import type { ListTransactionsResponse as _gxqs_v1_services_ListTransactionsResponse, ListTransactionsResponse__Output as _gxqs_v1_services_ListTransactionsResponse__Output } from '../../../gxqs/v1/services/ListTransactionsResponse';
import type { StreamBlocksRequest as _gxqs_v1_services_StreamBlocksRequest, StreamBlocksRequest__Output as _gxqs_v1_services_StreamBlocksRequest__Output } from '../../../gxqs/v1/services/StreamBlocksRequest';

/**
 * ExployerService is the gRPC service consumed by the GXQS block explorer.
 */
export interface ExployerServiceClient extends grpc.Client {
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  GetBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  getBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_ExployerGetBlockRequest, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetBlockResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * GetChainInfo returns chain-level metadata (latest height, chain ID, …).
   */
  GetChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  GetChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  GetChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  GetChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetChainInfo returns chain-level metadata (latest height, chain ID, …).
   */
  getChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  getChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  getChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  getChainInfo(argument: _gxqs_v1_services_GetChainInfoRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetChainInfoResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  GetTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  getTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_ExployerGetTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_ExployerGetTransactionResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * GetValidatorSet returns the active validator set at a given block height.
   */
  GetValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  GetValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  GetValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  GetValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetValidatorSet returns the active validator set at a given block height.
   */
  getValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  getValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  getValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  getValidatorSet(argument: _gxqs_v1_services_GetValidatorSetRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetValidatorSetResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * ListTransactions returns transactions for a given address, optionally
   * filtered to a block-height range.  Results are paginated.
   */
  ListTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  ListTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  /**
   * ListTransactions returns transactions for a given address, optionally
   * filtered to a block-height range.  Results are paginated.
   */
  listTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  listTransactions(argument: _gxqs_v1_services_ListTransactionsRequest, callback: grpc.requestCallback<_gxqs_v1_services_ListTransactionsResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * StreamBlocks streams all newly finalized blocks starting from from_height.
   * The stream is server-sent and continues until the client disconnects.
   */
  StreamBlocks(argument: _gxqs_v1_services_StreamBlocksRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_Block__Output>;
  StreamBlocks(argument: _gxqs_v1_services_StreamBlocksRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_Block__Output>;
  /**
   * StreamBlocks streams all newly finalized blocks starting from from_height.
   * The stream is server-sent and continues until the client disconnects.
   */
  streamBlocks(argument: _gxqs_v1_services_StreamBlocksRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_Block__Output>;
  streamBlocks(argument: _gxqs_v1_services_StreamBlocksRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_Block__Output>;
  
}

/**
 * ExployerService is the gRPC service consumed by the GXQS block explorer.
 */
export interface ExployerServiceHandlers extends grpc.UntypedServiceImplementation {
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  GetBlock: grpc.handleUnaryCall<_gxqs_v1_services_ExployerGetBlockRequest__Output, _gxqs_v1_services_ExployerGetBlockResponse>;
  
  /**
   * GetChainInfo returns chain-level metadata (latest height, chain ID, …).
   */
  GetChainInfo: grpc.handleUnaryCall<_gxqs_v1_services_GetChainInfoRequest__Output, _gxqs_v1_services_GetChainInfoResponse>;
  
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  GetTransaction: grpc.handleUnaryCall<_gxqs_v1_services_ExployerGetTransactionRequest__Output, _gxqs_v1_services_ExployerGetTransactionResponse>;
  
  /**
   * GetValidatorSet returns the active validator set at a given block height.
   */
  GetValidatorSet: grpc.handleUnaryCall<_gxqs_v1_services_GetValidatorSetRequest__Output, _gxqs_v1_services_GetValidatorSetResponse>;
  
  /**
   * ListTransactions returns transactions for a given address, optionally
   * filtered to a block-height range.  Results are paginated.
   */
  ListTransactions: grpc.handleUnaryCall<_gxqs_v1_services_ListTransactionsRequest__Output, _gxqs_v1_services_ListTransactionsResponse>;
  
  /**
   * StreamBlocks streams all newly finalized blocks starting from from_height.
   * The stream is server-sent and continues until the client disconnects.
   */
  StreamBlocks: grpc.handleServerStreamingCall<_gxqs_v1_services_StreamBlocksRequest__Output, _gxqs_v1_Block>;
  
}

export interface ExployerServiceDefinition extends grpc.ServiceDefinition {
  GetBlock: MethodDefinition<_gxqs_v1_services_ExployerGetBlockRequest, _gxqs_v1_services_ExployerGetBlockResponse, _gxqs_v1_services_ExployerGetBlockRequest__Output, _gxqs_v1_services_ExployerGetBlockResponse__Output>
  GetChainInfo: MethodDefinition<_gxqs_v1_services_GetChainInfoRequest, _gxqs_v1_services_GetChainInfoResponse, _gxqs_v1_services_GetChainInfoRequest__Output, _gxqs_v1_services_GetChainInfoResponse__Output>
  GetTransaction: MethodDefinition<_gxqs_v1_services_ExployerGetTransactionRequest, _gxqs_v1_services_ExployerGetTransactionResponse, _gxqs_v1_services_ExployerGetTransactionRequest__Output, _gxqs_v1_services_ExployerGetTransactionResponse__Output>
  GetValidatorSet: MethodDefinition<_gxqs_v1_services_GetValidatorSetRequest, _gxqs_v1_services_GetValidatorSetResponse, _gxqs_v1_services_GetValidatorSetRequest__Output, _gxqs_v1_services_GetValidatorSetResponse__Output>
  ListTransactions: MethodDefinition<_gxqs_v1_services_ListTransactionsRequest, _gxqs_v1_services_ListTransactionsResponse, _gxqs_v1_services_ListTransactionsRequest__Output, _gxqs_v1_services_ListTransactionsResponse__Output>
  StreamBlocks: MethodDefinition<_gxqs_v1_services_StreamBlocksRequest, _gxqs_v1_Block, _gxqs_v1_services_StreamBlocksRequest__Output, _gxqs_v1_Block__Output>
}
