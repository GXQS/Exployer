// Original file: services/wallet.proto

import type { Long } from '@grpc/proto-loader';

/**
 * StreamEventsRequest configures a server-sent event stream.
 */
export interface StreamEventsRequest {
  /**
   * from_height is the block height from which to start streaming.
   * Use 0 to start from the current tip.
   */
  'fromHeight'?: (number | string | Long);
  /**
   * event_types filters the stream to the specified event type strings.
   * An empty list means "all events".
   */
  'eventTypes'?: (string)[];
}

/**
 * StreamEventsRequest configures a server-sent event stream.
 */
export interface StreamEventsRequest__Output {
  /**
   * from_height is the block height from which to start streaming.
   * Use 0 to start from the current tip.
   */
  'fromHeight': (string);
  /**
   * event_types filters the stream to the specified event type strings.
   * An empty list means "all events".
   */
  'eventTypes': (string)[];
}
