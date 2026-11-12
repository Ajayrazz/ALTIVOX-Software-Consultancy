import "server-only";

/**
 * Simple sliding-window limiter, in memory. On serverless this is per instance — good enough to blunt
 * basic abuse on the free tier; swap for Upstash Redis (free tier) if abuse grows.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(key, arr); return false; }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}
