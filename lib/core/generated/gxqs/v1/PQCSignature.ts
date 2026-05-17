// Original file: transaction.proto

import type { SignatureScheme as _gxqs_v1_SignatureScheme, SignatureScheme__Output as _gxqs_v1_SignatureScheme__Output } from '../../gxqs/v1/SignatureScheme';

/**
 * PQCSignature is a scheme-tagged post-quantum (or hybrid) digital signature.
 * The encoding of public_key and signature bytes is scheme-specific.
 */
export interface PQCSignature {
  'scheme'?: (_gxqs_v1_SignatureScheme);
  'publicKey'?: (Buffer | Uint8Array | string);
  'signature'?: (Buffer | Uint8Array | string);
}

/**
 * PQCSignature is a scheme-tagged post-quantum (or hybrid) digital signature.
 * The encoding of public_key and signature bytes is scheme-specific.
 */
export interface PQCSignature__Output {
  'scheme': (_gxqs_v1_SignatureScheme__Output);
  'publicKey': (Buffer);
  'signature': (Buffer);
}
