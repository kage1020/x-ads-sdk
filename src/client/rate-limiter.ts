export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number;
  private readonly refillInterval: number;
  private waitQueue: Array<{
    resolve: () => void;
    timestamp: number;
  }> = [];

  constructor(
    maxTokens: number = 300,
    refillRate: number = 300,
    refillIntervalMs: number = 900000
  ) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
    this.refillInterval = refillIntervalMs;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  public async wait(): Promise<void> {
    this.refillTokens();

    if (this.tokens > 0) {
      this.tokens--;
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      this.waitQueue.push({
        resolve,
        timestamp: Date.now(),
      });
      this.scheduleNextRelease();
    });
  }

  private refillTokens(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;

    if (timePassed >= this.refillInterval) {
      const periods = Math.floor(timePassed / this.refillInterval);
      const tokensToAdd = periods * this.refillRate;
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
      this.lastRefill = now - (timePassed % this.refillInterval);
    }

    this.processWaitQueue();
  }

  private processWaitQueue(): void {
    while (this.waitQueue.length > 0 && this.tokens > 0) {
      const waiter = this.waitQueue.shift();
      if (waiter) {
        this.tokens--;
        waiter.resolve();
      }
    }
  }

  private scheduleNextRelease(): void {
    if (this.waitQueue.length === 0) return;

    const timeToNextRefill = this.refillInterval - (Date.now() - this.lastRefill);
    const delayMs = Math.max(100, timeToNextRefill);

    setTimeout(() => {
      this.refillTokens();
      if (this.waitQueue.length > 0 && this.tokens === 0) {
        this.scheduleNextRelease();
      }
    }, delayMs);
  }

  public getStatus(): {
    tokens: number;
    maxTokens: number;
    queueLength: number;
    nextRefillIn: number;
  } {
    const nextRefillIn = Math.max(0, this.refillInterval - (Date.now() - this.lastRefill));
    return {
      tokens: this.tokens,
      maxTokens: this.maxTokens,
      queueLength: this.waitQueue.length,
      nextRefillIn,
    };
  }

  public reset(): void {
    this.tokens = this.maxTokens;
    this.lastRefill = Date.now();

    while (this.waitQueue.length > 0) {
      const waiter = this.waitQueue.shift();
      if (waiter) {
        waiter.resolve();
      }
    }
  }

  public setBuffer(bufferRatio: number): void {
    if (bufferRatio < 0 || bufferRatio > 1) {
      throw new Error('Buffer ratio must be between 0 and 1');
    }

    this.tokens = Math.floor(this.tokens * (1 - bufferRatio));
  }
}
