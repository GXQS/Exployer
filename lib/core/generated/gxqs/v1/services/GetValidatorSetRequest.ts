// Original file: services/exployer.proto

import type { Long } from '@grpc/proto-loader';

/**
 * GetValidatorSetRequest selects a validator set by block height.
 */
export interface GetValidatorSetRequest {
  'height'?: (number | string | Long);
}

/**
 * GetValidatorSetRequest selects a validator set by block height.
 */
export interface GetValidatorSetRequest__Output {
  'height': (string);
}
