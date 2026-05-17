import 'server-only';

import path from 'node:path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ProtoGrpcType as ExployerProtoGrpcType } from '@/lib/core/generated/exployer';
import type { ProtoGrpcType as WalletProtoGrpcType } from '@/lib/core/generated/wallet';
import type { ExployerServiceClient } from '@/lib/core/generated/gxqs/v1/services/ExployerService';
import type { WalletServiceClient } from '@/lib/core/generated/gxqs/v1/services/WalletService';
import type { Block__Output } from '@/lib/core/generated/gxqs/v1/Block';
import type { ChainEvent__Output } from '@/lib/core/generated/gxqs/v1/services/ChainEvent';
import type { StreamBlocksRequest } from '@/lib/core/generated/gxqs/v1/services/StreamBlocksRequest';
import type { StreamEventsRequest } from '@/lib/core/generated/gxqs/v1/services/StreamEventsRequest';
import { getCoreConfig } from '@/lib/core/config';

const PROTO_FILES = [
  path.join(process.cwd(), 'proto/core/v0.1.0/transaction.proto'),
  path.join(process.cwd(), 'proto/core/v0.1.0/block.proto'),
  path.join(process.cwd(), 'proto/core/v0.1.0/consensus.proto'),
  path.join(process.cwd(), 'proto/core/v0.1.0/services/exployer.proto'),
  path.join(process.cwd(), 'proto/core/v0.1.0/services/wallet.proto'),
];

const PACKAGE_DEFINITION = protoLoader.loadSync(PROTO_FILES, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  arrays: true,
  objects: true,
  oneofs: true,
  includeDirs: [path.join(process.cwd(), 'proto/core/v0.1.0')],
});

const grpcObject = grpc.loadPackageDefinition(
  PACKAGE_DEFINITION,
) as unknown as ExployerProtoGrpcType & WalletProtoGrpcType;

const ServiceNamespace = grpcObject.gxqs.v1.services;

let explorerClient: ExployerServiceClient | null = null;
let walletClient: WalletServiceClient | null = null;

const RETRYABLE_CODES = new Set<grpc.status>([
  grpc.status.UNAVAILABLE,
  grpc.status.DEADLINE_EXCEEDED,
]);

export class CoreRpcError extends Error {
  constructor(
    message: string,
    readonly code?: grpc.status,
    readonly details?: string,
  ) {
    super(message);
    this.name = 'CoreRpcError';
  }
}

function createCredentials(): grpc.ChannelCredentials {
  const { useTls, caCert } = getCoreConfig();
  return useTls ? grpc.credentials.createSsl(caCert) : grpc.credentials.createInsecure();
}

function createMetadata(): grpc.Metadata {
  const metadata = new grpc.Metadata();
  const { authHeader, authToken } = getCoreConfig();

  if (authToken) {
    metadata.set(authHeader, authToken);
  }

  return metadata;
}

function createUnaryOptions(): grpc.CallOptions {
  return {
    deadline: new Date(Date.now() + getCoreConfig().timeoutMs),
    waitForReady: true,
  };
}

function createStreamOptions(): grpc.CallOptions {
  return {
    waitForReady: true,
  };
}

export function getExplorerClient(): ExployerServiceClient {
  if (!explorerClient) {
    explorerClient = new ServiceNamespace.ExployerService(getCoreConfig().endpoint, createCredentials());
  }

  return explorerClient;
}

export function getWalletClient(): WalletServiceClient {
  if (!walletClient) {
    walletClient = new ServiceNamespace.WalletService(getCoreConfig().endpoint, createCredentials());
  }

  return walletClient;
}

export async function invokeUnary<Response>(
  operation: string,
  invoke: (
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<Response>,
  ) => grpc.ClientUnaryCall,
  attempt = 0,
): Promise<Response> {
  try {
    return await new Promise<Response>((resolve, reject) => {
      invoke(createMetadata(), createUnaryOptions(), (error, response) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(response as Response);
      });
    });
  } catch (error) {
    const serviceError = error as grpc.ServiceError;
    const retryCount = getCoreConfig().retryCount;

    if (attempt < retryCount && RETRYABLE_CODES.has(serviceError.code)) {
      return invokeUnary(operation, invoke, attempt + 1);
    }

    throw new CoreRpcError(
      `Core gRPC ${operation} failed${serviceError.details ? `: ${serviceError.details}` : ''}`,
      serviceError.code,
      serviceError.details,
    );
  }
}

export function streamBlocks(request: StreamBlocksRequest): grpc.ClientReadableStream<Block__Output> {
  return getExplorerClient().streamBlocks(request, createMetadata(), createStreamOptions());
}

export function streamEvents(request: StreamEventsRequest): grpc.ClientReadableStream<ChainEvent__Output> {
  return getWalletClient().streamEvents(request, createMetadata(), createStreamOptions());
}
