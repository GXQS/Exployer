// Original file: transaction.proto

/**
 * SignatureScheme identifies the post-quantum (or hybrid) algorithm used to
 * produce a digital signature.
 */
export const SignatureScheme = {
  SIGNATURE_SCHEME_UNSPECIFIED: 'SIGNATURE_SCHEME_UNSPECIFIED',
  /**
   * ML-DSA-65 (NIST FIPS 204) — primary signing scheme.
   */
  SIGNATURE_SCHEME_ML_DSA_65: 'SIGNATURE_SCHEME_ML_DSA_65',
  /**
   * SLH-DSA-SHAKE-192s (NIST FIPS 205) — archival / high-value signing.
   */
  SIGNATURE_SCHEME_SLH_DSA_192S: 'SIGNATURE_SCHEME_SLH_DSA_192S',
  /**
   * Hybrid Ed25519 + Dilithium2 — transitional, classical-compatible.
   */
  SIGNATURE_SCHEME_HYBRID_ED_DIL2: 'SIGNATURE_SCHEME_HYBRID_ED_DIL2',
} as const;

/**
 * SignatureScheme identifies the post-quantum (or hybrid) algorithm used to
 * produce a digital signature.
 */
export type SignatureScheme =
  | 'SIGNATURE_SCHEME_UNSPECIFIED'
  | 0
  /**
   * ML-DSA-65 (NIST FIPS 204) — primary signing scheme.
   */
  | 'SIGNATURE_SCHEME_ML_DSA_65'
  | 1
  /**
   * SLH-DSA-SHAKE-192s (NIST FIPS 205) — archival / high-value signing.
   */
  | 'SIGNATURE_SCHEME_SLH_DSA_192S'
  | 2
  /**
   * Hybrid Ed25519 + Dilithium2 — transitional, classical-compatible.
   */
  | 'SIGNATURE_SCHEME_HYBRID_ED_DIL2'
  | 3

/**
 * SignatureScheme identifies the post-quantum (or hybrid) algorithm used to
 * produce a digital signature.
 */
export type SignatureScheme__Output = typeof SignatureScheme[keyof typeof SignatureScheme]
