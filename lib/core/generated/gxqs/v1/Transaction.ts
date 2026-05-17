// Original file: transaction.proto

import type { PQCSignature as _gxqs_v1_PQCSignature, PQCSignature__Output as _gxqs_v1_PQCSignature__Output } from '../../gxqs/v1/PQCSignature';
import type { Long } from '@grpc/proto-loader';

/**
 * Transaction is the canonical GXQS transaction envelope.
 * All fields except sig are covered by the signing payload.
 * 
 * Signing payload byte layout (deterministic, big-endian):
 * chain_id(8) || nonce(8) || from(32) || to(32) || value(8) ||
 * gas_limit(8) || gas_price(8) || timestamp(8) || data(variable)
 */
export interface Transaction {
  'chainId'?: (number | string | Long);
  'nonce'?: (number | string | Long);
  /**
   * from is a 32-byte GXQS address derived from the sender's PQC public key.
   */
  'from'?: (Buffer | Uint8Array | string);
  /**
   * to is a 32-byte GXQS address.
   */
  'to'?: (Buffer | Uint8Array | string);
  /**
   * value is the native-token amount transferred (in the smallest denomination).
   */
  'value'?: (number | string | Long);
  /**
   * data holds contract call data or arbitrary memo bytes.
   */
  'data'?: (Buffer | Uint8Array | string);
  'gasLimit'?: (number | string | Long);
  'gasPrice'?: (number | string | Long);
  /**
   * timestamp is a Unix millisecond timestamp set by the sender.
   */
  'timestamp'?: (number | string | Long);
  /**
   * sig is the PQC signature over the signing payload.
   */
  'sig'?: (_gxqs_v1_PQCSignature | null);
}

/**
 * Transaction is the canonical GXQS transaction envelope.
 * All fields except sig are covered by the signing payload.
 * 
 * Signing payload byte layout (deterministic, big-endian):
 * chain_id(8) || nonce(8) || from(32) || to(32) || value(8) ||
 * gas_limit(8) || gas_price(8) || timestamp(8) || data(variable)
 */
export interface Transaction__Output {
  'chainId': (string);
  'nonce': (string);
  /**
   * from is a 32-byte GXQS address derived from the sender's PQC public key.
   */
  'from': (Buffer);
  /**
   * to is a 32-byte GXQS address.
   */
  'to': (Buffer);
  /**
   * value is the native-token amount transferred (in the smallest denomination).
   */
  'value': (string);
  /**
   * data holds contract call data or arbitrary memo bytes.
   */
  'data': (Buffer);
  'gasLimit': (string);
  'gasPrice': (string);
  /**
   * timestamp is a Unix millisecond timestamp set by the sender.
   */
  'timestamp': (string);
  /**
   * sig is the PQC signature over the signing payload.
   */
  'sig': (_gxqs_v1_PQCSignature__Output | null);
}
