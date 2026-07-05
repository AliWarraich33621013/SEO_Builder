import { AIRateLimitError } from './ai/errors'

type RateLimitEntry = {
  count: number
  resetAt: number
}

// TODO: Replace with Redis-based limiter for multi-instance production deployments.
const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 30

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

export function checkRateLimit(request: Request, keyPrefix = 'seo-builder-ai'): void {
  const ip = getClientIp(request)
  const key = `${keyPrefix}:${ip}`
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return
  }

  if (entry.count >= MAX_REQUESTS) {
    throw new AIRateLimitError(
      `Rate limit exceeded. Maximum ${MAX_REQUESTS} AI requests per 15 minutes.`,
    )
  }

  entry.count += 1
  store.set(key, entry)
}

export function resetRateLimitStore() {
  store.clear()
}
