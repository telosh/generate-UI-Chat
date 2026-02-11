import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

/** Supported window: "1 s", "1 m", "1 h", "1 d" */
const DEFAULT_WINDOW: Duration = "1 h";
const DEFAULT_REQUESTS = 20;

function parseRateLimitConfig(): { requests: number; window: Duration } {
  const requests = parseInt(
    process.env.RATE_LIMIT_REQUESTS ?? String(DEFAULT_REQUESTS),
    10,
  );
  const window = (process.env.RATE_LIMIT_WINDOW ?? DEFAULT_WINDOW) as Duration;
  return { requests: Math.max(1, requests), window };
}

export function getRateLimitClient() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const { requests, window } = parseRateLimitConfig();

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, window),
      analytics: true,
      prefix: "generative-resume",
    });
  }

  return ratelimit;
}
