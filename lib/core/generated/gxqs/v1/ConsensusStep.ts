// Original file: consensus.proto

/**
 * ConsensusStep enumerates the phases of a single BFT round.
 */
export const ConsensusStep = {
  CONSENSUS_STEP_UNSPECIFIED: 'CONSENSUS_STEP_UNSPECIFIED',
  CONSENSUS_STEP_PROPOSE: 'CONSENSUS_STEP_PROPOSE',
  CONSENSUS_STEP_PRE_VOTE: 'CONSENSUS_STEP_PRE_VOTE',
  CONSENSUS_STEP_PRE_COMMIT: 'CONSENSUS_STEP_PRE_COMMIT',
  CONSENSUS_STEP_FINAL: 'CONSENSUS_STEP_FINAL',
} as const;

/**
 * ConsensusStep enumerates the phases of a single BFT round.
 */
export type ConsensusStep =
  | 'CONSENSUS_STEP_UNSPECIFIED'
  | 0
  | 'CONSENSUS_STEP_PROPOSE'
  | 1
  | 'CONSENSUS_STEP_PRE_VOTE'
  | 2
  | 'CONSENSUS_STEP_PRE_COMMIT'
  | 3
  | 'CONSENSUS_STEP_FINAL'
  | 4

/**
 * ConsensusStep enumerates the phases of a single BFT round.
 */
export type ConsensusStep__Output = typeof ConsensusStep[keyof typeof ConsensusStep]
