// Original file: services/wallet.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChainEvent as _gxqs_v1_services_ChainEvent, ChainEvent__Output as _gxqs_v1_services_ChainEvent__Output } from '../../../gxqs/v1/services/ChainEvent';
import type { GetAccountStateRequest as _gxqs_v1_services_GetAccountStateRequest, GetAccountStateRequest__Output as _gxqs_v1_services_GetAccountStateRequest__Output } from '../../../gxqs/v1/services/GetAccountStateRequest';
import type { GetAccountStateResponse as _gxqs_v1_services_GetAccountStateResponse, GetAccountStateResponse__Output as _gxqs_v1_services_GetAccountStateResponse__Output } from '../../../gxqs/v1/services/GetAccountStateResponse';
import type { GetBlockRequest as _gxqs_v1_services_GetBlockRequest, GetBlockRequest__Output as _gxqs_v1_services_GetBlockRequest__Output } from '../../../gxqs/v1/services/GetBlockRequest';
import type { GetBlockResponse as _gxqs_v1_services_GetBlockResponse, GetBlockResponse__Output as _gxqs_v1_services_GetBlockResponse__Output } from '../../../gxqs/v1/services/GetBlockResponse';
import type { GetTransactionRequest as _gxqs_v1_services_GetTransactionRequest, GetTransactionRequest__Output as _gxqs_v1_services_GetTransactionRequest__Output } from '../../../gxqs/v1/services/GetTransactionRequest';
import type { GetTransactionResponse as _gxqs_v1_services_GetTransactionResponse, GetTransactionResponse__Output as _gxqs_v1_services_GetTransactionResponse__Output } from '../../../gxqs/v1/services/GetTransactionResponse';
import type { StreamEventsRequest as _gxqs_v1_services_StreamEventsRequest, StreamEventsRequest__Output as _gxqs_v1_services_StreamEventsRequest__Output } from '../../../gxqs/v1/services/StreamEventsRequest';
import type { SubmitTransactionRequest as _gxqs_v1_services_SubmitTransactionRequest, SubmitTransactionRequest__Output as _gxqs_v1_services_SubmitTransactionRequest__Output } from '../../../gxqs/v1/services/SubmitTransactionRequest';
import type { SubmitTransactionResponse as _gxqs_v1_services_SubmitTransactionResponse, SubmitTransactionResponse__Output as _gxqs_v1_services_SubmitTransactionResponse__Output } from '../../../gxqs/v1/services/SubmitTransactionResponse';

/**
 * WalletService is the gRPC service consumed by the GXQS Wallet application.
 */
export interface WalletServiceClient extends grpc.Client {
  /**
   * GetAccountState retrieves the current state for a given address.
   */
  GetAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  GetAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  GetAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  GetAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetAccountState retrieves the current state for a given address.
   */
  getAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  getAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  getAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  getAccountState(argument: _gxqs_v1_services_GetAccountStateRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetAccountStateResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  GetBlock(argument: _gxqs_v1_services_GetBlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_GetBlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_GetBlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  GetBlock(argument: _gxqs_v1_services_GetBlockRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  getBlock(argument: _gxqs_v1_services_GetBlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_GetBlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_GetBlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  getBlock(argument: _gxqs_v1_services_GetBlockRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetBlockResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  GetTransaction(argument: _gxqs_v1_services_GetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_GetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_GetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  GetTransaction(argument: _gxqs_v1_services_GetTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  getTransaction(argument: _gxqs_v1_services_GetTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_GetTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_GetTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  getTransaction(argument: _gxqs_v1_services_GetTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_GetTransactionResponse__Output>): grpc.ClientUnaryCall;
  
  /**
   * StreamEvents subscribes to real-time chain events starting from a given
   * block height.  The stream is server-sent and continues until the client
   * disconnects.
   */
  StreamEvents(argument: _gxqs_v1_services_StreamEventsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_services_ChainEvent__Output>;
  StreamEvents(argument: _gxqs_v1_services_StreamEventsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_services_ChainEvent__Output>;
  /**
   * StreamEvents subscribes to real-time chain events starting from a given
   * block height.  The stream is server-sent and continues until the client
   * disconnects.
   */
  streamEvents(argument: _gxqs_v1_services_StreamEventsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_services_ChainEvent__Output>;
  streamEvents(argument: _gxqs_v1_services_StreamEventsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gxqs_v1_services_ChainEvent__Output>;
  
  /**
   * SubmitTransaction submits a signed transaction to the node's mempool.
   * The transaction must be signed with a valid PQC key before submission.
   */
  SubmitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  SubmitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  SubmitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  SubmitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  /**
   * SubmitTransaction submits a signed transaction to the node's mempool.
   * The transaction must be signed with a valid PQC key before submission.
   */
  submitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  submitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  submitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  submitTransaction(argument: _gxqs_v1_services_SubmitTransactionRequest, callback: grpc.requestCallback<_gxqs_v1_services_SubmitTransactionResponse__Output>): grpc.ClientUnaryCall;
  
}

/**
 * WalletService is the gRPC service consumed by the GXQS Wallet application.
 */
export interface WalletServiceHandlers extends grpc.UntypedServiceImplementation {
  /**
   * GetAccountState retrieves the current state for a given address.
   */
  GetAccountState: grpc.handleUnaryCall<_gxqs_v1_services_GetAccountStateRequest__Output, _gxqs_v1_services_GetAccountStateResponse>;
  
  /**
   * GetBlock retrieves a finalized block by height or block ID.
   */
  GetBlock: grpc.handleUnaryCall<_gxqs_v1_services_GetBlockRequest__Output, _gxqs_v1_services_GetBlockResponse>;
  
  /**
   * GetTransaction retrieves a transaction by its ID.
   */
  GetTransaction: grpc.handleUnaryCall<_gxqs_v1_services_GetTransactionRequest__Output, _gxqs_v1_services_GetTransactionResponse>;
  
  /**
   * StreamEvents subscribes to real-time chain events starting from a given
   * block height.  The stream is server-sent and continues until the client
   * disconnects.
   */
  StreamEvents: grpc.handleServerStreamingCall<_gxqs_v1_services_StreamEventsRequest__Output, _gxqs_v1_services_ChainEvent>;
  
  /**
   * SubmitTransaction submits a signed transaction to the node's mempool.
   * The transaction must be signed with a valid PQC key before submission.
   */
  SubmitTransaction: grpc.handleUnaryCall<_gxqs_v1_services_SubmitTransactionRequest__Output, _gxqs_v1_services_SubmitTransactionResponse>;
  
}

export interface WalletServiceDefinition extends grpc.ServiceDefinition {
  GetAccountState: MethodDefinition<_gxqs_v1_services_GetAccountStateRequest, _gxqs_v1_services_GetAccountStateResponse, _gxqs_v1_services_GetAccountStateRequest__Output, _gxqs_v1_services_GetAccountStateResponse__Output>
  GetBlock: MethodDefinition<_gxqs_v1_services_GetBlockRequest, _gxqs_v1_services_GetBlockResponse, _gxqs_v1_services_GetBlockRequest__Output, _gxqs_v1_services_GetBlockResponse__Output>
  GetTransaction: MethodDefinition<_gxqs_v1_services_GetTransactionRequest, _gxqs_v1_services_GetTransactionResponse, _gxqs_v1_services_GetTransactionRequest__Output, _gxqs_v1_services_GetTransactionResponse__Output>
  StreamEvents: MethodDefinition<_gxqs_v1_services_StreamEventsRequest, _gxqs_v1_services_ChainEvent, _gxqs_v1_services_StreamEventsRequest__Output, _gxqs_v1_services_ChainEvent__Output>
  SubmitTransaction: MethodDefinition<_gxqs_v1_services_SubmitTransactionRequest, _gxqs_v1_services_SubmitTransactionResponse, _gxqs_v1_services_SubmitTransactionRequest__Output, _gxqs_v1_services_SubmitTransactionResponse__Output>
}
