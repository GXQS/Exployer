interface MemoryEntry {
  key: string;
  value: unknown;
  timestamp: number;
  ttl?: number;
}

const memory = new Map<string, MemoryEntry>();

export function remember(key: string, value: unknown, ttlMs?: number): void {
  memory.set(key, {
    key,
    value,
    timestamp: Date.now(),
    ttl: ttlMs,
  });
}

export function recall<T>(key: string): T | null {
  const entry = memory.get(key);
  if (!entry) return null;
  if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
    memory.delete(key);
    return null;
  }
  return entry.value as T;
}

export function forget(key: string): void {
  memory.delete(key);
}

export function getMemorySnapshot(): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, entry] of memory.entries()) {
    if (!entry.ttl || Date.now() - entry.timestamp <= entry.ttl) {
      result[key] = entry.value;
    }
  }
  return result;
}
