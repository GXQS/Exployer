// Original file: services/exployer.proto

import type { ValidatorInfo as _gxqs_v1_services_ValidatorInfo, ValidatorInfo__Output as _gxqs_v1_services_ValidatorInfo__Output } from '../../../gxqs/v1/services/ValidatorInfo';
import type { Long } from '@grpc/proto-loader';

/**
 * GetValidatorSetResponse carries the active validator set.
 */
export interface GetValidatorSetResponse {
  'validators'?: (_gxqs_v1_services_ValidatorInfo)[];
  'height'?: (number | string | Long);
}

/**
 * GetValidatorSetResponse carries the active validator set.
 */
export interface GetValidatorSetResponse__Output {
  'validators': (_gxqs_v1_services_ValidatorInfo__Output)[];
  'height': (string);
}
