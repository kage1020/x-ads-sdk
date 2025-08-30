import { XAdsPlugin } from './base.js';

export interface RateLimitInfo {
  endpoint: string;
  limit: number;
  remaining: number;
  resetTime: Date;
  resetTimeSeconds: number;
  requestCount: number;
  lastRequest: Date;
}

export interface RateLimitTrackerOptions {
  trackingEnabled?: boolean;
  logEnabled?: boolean;
  warningThreshold?: number; // Warn when remaining requests fall below this
}

export class RateLimitTracker implements XAdsPlugin {
  public readonly name = 'rate-limit-tracker';
  public readonly version = '1.0.0';

  private rateLimits = new Map<string, RateLimitInfo>();
  private options: Required<RateLimitTrackerOptions>;

  constructor(options: RateLimitTrackerOptions = {}) {
    this.options = {
      trackingEnabled: true,
      logEnabled: false,
      warningThreshold: 10,
      ...options
    };
  }

  afterResponse(response: any, config: any): any {
    if (!this.options.trackingEnabled) {
      return response;
    }

    const endpoint = this.extractEndpoint(config.url || config.endpoint);
    const headers = response.headers || new Headers();
    
    const limit = this.getHeaderValue(headers, 'x-rate-limit-limit');
    const remaining = this.getHeaderValue(headers, 'x-rate-limit-remaining');
    const reset = this.getHeaderValue(headers, 'x-rate-limit-reset');

    if (limit && remaining && reset) {
      const resetTime = new Date(parseInt(reset) * 1000);
      const existingInfo = this.rateLimits.get(endpoint);
      
      const rateLimitInfo: RateLimitInfo = {
        endpoint,
        limit: parseInt(limit),
        remaining: parseInt(remaining),
        resetTime,
        resetTimeSeconds: parseInt(reset),
        requestCount: (existingInfo?.requestCount || 0) + 1,
        lastRequest: new Date()
      };

      this.rateLimits.set(endpoint, rateLimitInfo);

      // Log warnings if enabled
      if (this.options.logEnabled && rateLimitInfo.remaining <= this.options.warningThreshold) {
        console.warn(
          `Rate limit warning for ${endpoint}: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} requests remaining. ` +
          `Resets at ${rateLimitInfo.resetTime.toISOString()}`
        );
      }
    }

    return response;
  }

  onError(error: any, config: any): any {
    if (!this.options.trackingEnabled) {
      return;
    }

    // Track 429 errors even if headers aren't available
    if (error.statusCode === 429) {
      const endpoint = this.extractEndpoint(config.url || config.endpoint);
      const existingInfo = this.rateLimits.get(endpoint);
      
      if (existingInfo) {
        existingInfo.remaining = 0;
        existingInfo.lastRequest = new Date();
        this.rateLimits.set(endpoint, existingInfo);
      }

      if (this.options.logEnabled) {
        console.error(`Rate limit exceeded for ${endpoint}`);
      }
    }

    // Don't handle the error, just track it
    return;
  }

  private extractEndpoint(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.pathname;
    } catch {
      return url;
    }
  }

  private getHeaderValue(headers: Headers | Record<string, string>, name: string): string | null {
    if (headers instanceof Headers) {
      return headers.get(name);
    }
    return headers[name] || headers[name.toLowerCase()] || null;
  }

  // Public API for accessing rate limit information
  getRateLimitInfo(endpoint: string): RateLimitInfo | undefined {
    return this.rateLimits.get(endpoint);
  }

  getAllRateLimits(): Map<string, RateLimitInfo> {
    return new Map(this.rateLimits);
  }

  getRemainingRequests(endpoint: string): number | null {
    const info = this.rateLimits.get(endpoint);
    if (!info) {return null;}

    // Check if reset time has passed
    if (new Date() >= info.resetTime) {
      this.rateLimits.delete(endpoint);
      return null;
    }

    return info.remaining;
  }

  getTimeUntilReset(endpoint: string): number | null {
    const info = this.rateLimits.get(endpoint);
    if (!info) {return null;}

    const now = Date.now();
    const resetTime = info.resetTime.getTime();
    
    if (now >= resetTime) {
      this.rateLimits.delete(endpoint);
      return null;
    }

    return resetTime - now;
  }

  clearTrackedLimits(): void {
    this.rateLimits.clear();
  }

  // Get summary of all tracked endpoints
  getSummary(): Array<{
    endpoint: string;
    remaining: number;
    limit: number;
    resetTime: Date;
    requestCount: number;
    utilizationRate: number;
  }> {
    const summary: any[] = [];
    
    for (const [endpoint, info] of this.rateLimits) {
      // Skip expired entries
      if (new Date() >= info.resetTime) {
        this.rateLimits.delete(endpoint);
        continue;
      }

      summary.push({
        endpoint,
        remaining: info.remaining,
        limit: info.limit,
        resetTime: info.resetTime,
        requestCount: info.requestCount,
        utilizationRate: ((info.limit - info.remaining) / info.limit) * 100
      });
    }

    return summary.sort((a, b) => b.utilizationRate - a.utilizationRate);
  }
}