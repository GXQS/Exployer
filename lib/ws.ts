type Listener<T> = (data: T) => void;

interface PollingConfig {
  interval: number;
  onData: <T>(data: T) => void;
  onError?: (error: Error) => void;
}

export class PollingManager {
  private timers = new Map<string, NodeJS.Timeout>();

  subscribe<T>(
    key: string,
    fetcher: () => Promise<T>,
    listener: Listener<T>,
    interval = 2000,
    onError?: (e: Error) => void
  ): () => void {
    const poll = async () => {
      try {
        const data = await fetcher();
        listener(data);
      } catch (e) {
        onError?.(e as Error);
      }
    };

    poll();
    const timer = setInterval(poll, interval);
    this.timers.set(key, timer);

    return () => this.unsubscribe(key);
  }

  unsubscribe(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(key);
    }
  }

  unsubscribeAll(): void {
    for (const timer of this.timers.values()) {
      clearInterval(timer);
    }
    this.timers.clear();
  }
}

export const pollingManager = new PollingManager();
