import { sleep, unixTimestampToDate } from '../utils/index.js';

export interface ClientRateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
  resetTimeSeconds: number;
}

export interface RateLimitOptions {
  strategy: 'wait' | 'throw';
  defaultLimit: number;
  defaultWindow: number; // seconds
}

export class RateLimiter {
  private limits: Map<string, ClientRateLimitInfo> = new Map();
  private options: RateLimitOptions;

  constructor(options: Partial<RateLimitOptions> = {}) {
    this.options = {
      strategy: 'wait',
      defaultLimit: 300,
      defaultWindow: 900, // 15 minutes
      ...options,
    };
  }

  updateLimits(endpoint: string, headers: Record<string, string>): void {
    const limit = headers['x-rate-limit-limit'];
    const remaining = headers['x-rate-limit-remaining'];
    const reset = headers['x-rate-limit-reset'];

    if (limit && remaining && reset) {
      const resetTime = unixTimestampToDate(reset);

      this.limits.set(endpoint, {
        limit: parseInt(limit, 10),
        remaining: parseInt(remaining, 10),
        resetTime,
        resetTimeSeconds: parseInt(reset, 10),
      });
    }
  }

  async checkRateLimit(endpoint: string): Promise<void> {
    const rateLimitInfo = this.limits.get(endpoint);

    if (!rateLimitInfo) {
      // No rate limit info available yet, proceed
      return;
    }

    const now = new Date();

    // If reset time has passed, clear the stored limit info
    if (now >= rateLimitInfo.resetTime) {
      this.limits.delete(endpoint);
      return;
    }

    // Check if we've hit the rate limit
    if (rateLimitInfo.remaining <= 0) {
      const waitTime = rateLimitInfo.resetTime.getTime() - now.getTime();

      if (this.options.strategy === 'throw') {
        const { RateLimitError } = await import('../errors/index.js');
        throw new RateLimitError(
          `Rate limit exceeded for ${endpoint}. Resets at ${rateLimitInfo.resetTime.toISOString()}`,
          rateLimitInfo.resetTime
        );
      } else {
        // Wait until reset time
        console.warn(
          `Rate limit exceeded for ${endpoint}. Waiting ${Math.ceil(waitTime / 1000)} seconds...`
        );
        await sleep(waitTime);
      }
    }
  }

  getRemainingRequests(endpoint: string): number | null {
    const rateLimitInfo = this.limits.get(endpoint);
    if (!rateLimitInfo) {
      return null;
    }

    const now = new Date();
    if (now >= rateLimitInfo.resetTime) {
      return null; // Reset time has passed
    }

    return rateLimitInfo.remaining;
  }

  getResetTime(endpoint: string): Date | null {
    const rateLimitInfo = this.limits.get(endpoint);
    return rateLimitInfo?.resetTime || null;
  }
}
