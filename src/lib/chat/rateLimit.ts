const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;

const requestLog = new Map<string, number[]>();

// In-memory, per-serverless-instance only — resets on cold start and isn't
// shared across instances. Enough to blunt casual abuse on a small demo;
// not a substitute for real infra-level rate limiting at production scale.
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}
