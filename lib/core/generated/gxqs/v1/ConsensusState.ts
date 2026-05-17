// Original file: consensus.proto

import type { ConsensusStep as _gxqs_v1_ConsensusStep, ConsensusStep__Output as _gxqs_v1_ConsensusStep__Output } from '../../gxqs/v1/ConsensusStep';
import type { Long } from '@grpc/proto-loader';

/**
 * ConsensusState is a snapshot of the consensus engine state at a given
 * height and round, used for deterministic replay and state-sync.
 */
export interface ConsensusState {
  'height'?: (number | string | Long);
  'round'?: (number);
  'step'?: (_gxqs_v1_ConsensusStep);
  'lockedId'?: (Buffer | Uint8Array | string);
  'validId'?: (Buffer | Uint8Array | string);
}

/**
 * ConsensusState is a snapshot of the consensus engine state at a given
 * height and round, used for deterministic replay and state-sync.
 */
export interface ConsensusState__Output {
  'height': (string);
  'round': (number);
  'step': (_gxqs_v1_ConsensusStep__Output);
  'lockedId': (Buffer);
  'validId': (Buffer);
}
