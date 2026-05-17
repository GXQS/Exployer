// Original file: services/wallet.proto

import type { Long } from '@grpc/proto-loader';

/**
 * ChainEvent is a single item in the real-time event stream.
 */
export interface ChainEvent {
  'eventType'?: (string);
  'height'?: (number | string | Long);
  /**
   * payload is a serialized event-specific message (scheme-defined).
   */
  'payload'?: (Buffer | Uint8Array | string);
  /**
   * timestamp is the Unix millisecond time at which the event was emitted.
   */
  'timestamp'?: (number | string | Long);
  /**
   * event_hash is the SHA3-256 hash that chains this event to its predecessor.
   */
  'eventHash'?: (Buffer | Uint8Array | string);
}

/**
 * ChainEvent is a single item in the real-time event stream.
 */
export interface ChainEvent__Output {
  'eventType': (string);
  'height': (string);
  /**
   * payload is a serialized event-specific message (scheme-defined).
   */
  'payload': (Buffer);
  /**
   * timestamp is the Unix millisecond time at which the event was emitted.
   */
  'timestamp': (string);
  /**
   * event_hash is the SHA3-256 hash that chains this event to its predecessor.
   */
  'eventHash': (Buffer);
}
