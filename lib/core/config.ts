import 'server-only';

export interface CoreConfig {
  endpoint: string;
  timeoutMs: number;
  retryCount: number;
  useTls: boolean;
  authHeader: string;
  authToken: string | null;
  caCert: Buffer | undefined;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getCoreConfig(): CoreConfig {
  const authToken = process.env.GXQS_CORE_AUTH_TOKEN?.trim() || null;
  const caPem = process.env.GXQS_CORE_TLS_CA_PEM?.trim();

  return {
    endpoint: process.env.GXQS_CORE_GRPC_ENDPOINT?.trim() || '127.0.0.1:50051',
    timeoutMs: parsePositiveInt(process.env.GXQS_CORE_TIMEOUT_MS, 5_000),
    retryCount: parsePositiveInt(process.env.GXQS_CORE_RETRY_COUNT, 2),
    useTls: process.env.GXQS_CORE_USE_TLS === 'true',
    authHeader: process.env.GXQS_CORE_AUTH_HEADER?.trim() || 'authorization',
    authToken,
    caCert: caPem ? Buffer.from(caPem) : undefined,
  };
}
