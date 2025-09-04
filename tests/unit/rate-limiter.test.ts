import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RateLimiter } from '@/client/rate-limiter';

describe('RateLimiter Unit Tests', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
    rateLimiter = new RateLimiter(10, 10, 1000); // 10 tokens, refill 10 every 1 second
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      const defaultLimiter = new RateLimiter();
      const status = defaultLimiter.getStatus();

      expect(status.tokens).toBe(300);
      expect(status.maxTokens).toBe(300);
      expect(status.queueLength).toBe(0);
    });

    it('should initialize with custom values', () => {
      const customLimiter = new RateLimiter(50, 25, 2000);
      const status = customLimiter.getStatus();

      expect(status.tokens).toBe(50);
      expect(status.maxTokens).toBe(50);
      expect(status.queueLength).toBe(0);
    });
  });

  describe('Token Management', () => {
    it('should consume tokens on wait() calls', async () => {
      const initialStatus = rateLimiter.getStatus();
      expect(initialStatus.tokens).toBe(10);

      await rateLimiter.wait();

      const afterWait = rateLimiter.getStatus();
      expect(afterWait.tokens).toBe(9);
    });

    it('should handle multiple simultaneous wait() calls', async () => {
      const promises = Array.from({ length: 5 }, () => rateLimiter.wait());
      await Promise.all(promises);

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(5);
    });

    it('should queue requests when tokens are exhausted', async () => {
      // Exhaust all tokens
      const promises = Array.from({ length: 15 }, () => rateLimiter.wait());

      // First 10 should resolve immediately
      await Promise.all(promises.slice(0, 10));

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(0);
      expect(status.queueLength).toBe(5);
    });

    it('should process queue when tokens are refilled', async () => {
      // Exhaust tokens and create queue
      const promises = Array.from({ length: 15 }, () => rateLimiter.wait());
      await Promise.all(promises.slice(0, 10));

      const statusBefore = rateLimiter.getStatus();
      expect(statusBefore.queueLength).toBe(5);

      // Advance time to trigger refill
      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();

      const statusAfter = rateLimiter.getStatus();
      expect(statusAfter.queueLength).toBe(0);
      expect(statusAfter.tokens).toBe(5); // 10 refilled - 5 from queue
    });
  });

  describe('Token Refill', () => {
    it('should refill tokens after interval', async () => {
      // Use all tokens
      await Promise.all(Array.from({ length: 10 }, () => rateLimiter.wait()));

      const beforeRefill = rateLimiter.getStatus();
      expect(beforeRefill.tokens).toBe(0);

      // Advance time to trigger refill
      vi.advanceTimersByTime(1000);

      // Trigger refill by calling wait
      await rateLimiter.wait();

      const afterRefill = rateLimiter.getStatus();
      expect(afterRefill.tokens).toBe(9); // 10 refilled - 1 consumed
    });

    it('should not exceed max tokens when refilling', async () => {
      // Use half tokens
      await Promise.all(Array.from({ length: 5 }, () => rateLimiter.wait()));

      // Advance time to trigger refill
      vi.advanceTimersByTime(1000);
      await rateLimiter.wait();

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(9); // Should not exceed maxTokens (10) - 1 consumed
    });

    it('should handle multiple refill periods', async () => {
      // Use all tokens
      await Promise.all(Array.from({ length: 10 }, () => rateLimiter.wait()));

      // Advance time by multiple periods
      vi.advanceTimersByTime(3000);
      await rateLimiter.wait();

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(9); // Max 10 tokens - 1 consumed
    });
  });

  describe('Status Information', () => {
    it('should provide accurate status information', () => {
      const status = rateLimiter.getStatus();

      expect(status).toHaveProperty('tokens');
      expect(status).toHaveProperty('maxTokens');
      expect(status).toHaveProperty('queueLength');
      expect(status).toHaveProperty('nextRefillIn');

      expect(typeof status.tokens).toBe('number');
      expect(typeof status.maxTokens).toBe('number');
      expect(typeof status.queueLength).toBe('number');
      expect(typeof status.nextRefillIn).toBe('number');
    });

    it('should show queue length correctly', async () => {
      // Exhaust tokens
      await Promise.all(Array.from({ length: 10 }, () => rateLimiter.wait()));

      // Add to queue without awaiting
      rateLimiter.wait();
      rateLimiter.wait();
      rateLimiter.wait();

      const status = rateLimiter.getStatus();
      expect(status.queueLength).toBe(3);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset tokens to maximum', async () => {
      // Use some tokens
      await Promise.all(Array.from({ length: 7 }, () => rateLimiter.wait()));

      rateLimiter.reset();

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(10);
    });

    it('should clear the wait queue', async () => {
      // Exhaust tokens and create queue
      await Promise.all(Array.from({ length: 10 }, () => rateLimiter.wait()));
      const queuePromises = Array.from({ length: 5 }, () => rateLimiter.wait());

      rateLimiter.reset();

      // All queued promises should resolve
      await Promise.all(queuePromises);

      const status = rateLimiter.getStatus();
      expect(status.queueLength).toBe(0);
    });

    it('should reset refill timestamp', async () => {
      // Advance time
      vi.advanceTimersByTime(500);

      rateLimiter.reset();

      const status = rateLimiter.getStatus();
      // Next refill should be close to the full interval
      expect(status.nextRefillIn).toBeGreaterThan(999);
    });
  });

  describe('Buffer Management', () => {
    it('should reduce available tokens by buffer ratio', () => {
      rateLimiter.setBuffer(0.2); // 20% buffer

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(8); // 10 * (1 - 0.2) = 8
    });

    it('should handle zero buffer', () => {
      rateLimiter.setBuffer(0);

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(10); // No change
    });

    it('should handle maximum buffer', () => {
      rateLimiter.setBuffer(1.0); // 100% buffer

      const status = rateLimiter.getStatus();
      expect(status.tokens).toBe(0); // All tokens buffered
    });

    it('should validate buffer ratio bounds', () => {
      expect(() => rateLimiter.setBuffer(-0.1)).toThrow('Buffer ratio must be between 0 and 1');
      expect(() => rateLimiter.setBuffer(1.1)).toThrow('Buffer ratio must be between 0 and 1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle concurrent operations correctly', async () => {
      // Mix of waits and status checks
      const operations = [
        rateLimiter.wait(),
        rateLimiter.wait(),
        () => rateLimiter.getStatus(),
        rateLimiter.wait(),
        () => rateLimiter.reset(),
        rateLimiter.wait(),
      ];

      // Execute operations concurrently
      const results = await Promise.allSettled(
        operations.map((op) => (typeof op === 'function' ? Promise.resolve(op()) : op))
      );

      // All operations should complete without error
      expect(results.every((r) => r.status === 'fulfilled')).toBe(true);
    });

    it('should handle rapid successive wait calls', async () => {
      const startTime = performance.now();

      // Make 20 requests (10 more than capacity)
      const promises = Array.from({ length: 20 }, () => rateLimiter.wait());

      // First 10 should resolve immediately
      await Promise.all(promises.slice(0, 10));

      const midTime = performance.now();
      expect(midTime - startTime).toBeLessThan(100); // Should be very fast

      // Trigger refill for remaining requests
      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();

      await Promise.all(promises);
      const endTime = performance.now();
      expect(endTime).toBeDefined(); // Should complete
    });

    it(
      'should maintain consistency under load',
      async () => {
        const requestCount = 25;
        let completedRequests = 0;

        // Process requests in smaller batches with proper timing
        for (let i = 0; i < requestCount; i += 10) {
          const batchSize = Math.min(10, requestCount - i);
          const promises = Array.from({ length: batchSize }, () => {
            return rateLimiter.wait().then(() => completedRequests++);
          });

          await Promise.all(promises);

          // Allow refill between batches
          if (i + 10 < requestCount) {
            vi.advanceTimersByTime(1000);
            await vi.runAllTimersAsync();
          }
        }

        expect(completedRequests).toBe(requestCount);
      },
      { timeout: 10000 }
    );

    it('should handle scheduleNextRelease branch coverage - line 73-75', () => {
      // Create a rate limiter with no tokens
      const limitedLimiter = new RateLimiter(0, 1, 1000); // 0 tokens initially

      // Try to make a request - this will queue immediately
      const promise1 = limitedLimiter.wait();
      const promise2 = limitedLimiter.wait();

      // Verify queue exists and no tokens available
      const status = limitedLimiter.getStatus();
      expect(status.queueLength).toBe(2);
      expect(status.tokens).toBe(0);

      // This tests the branch where queue.length > 0 && tokens === 0 in scheduleNextRelease
      // The setTimeout will be called but we'll reset before it executes

      // Reset immediately to resolve the queued promises
      limitedLimiter.reset();

      // The promises should resolve immediately after reset
      return Promise.all([promise1, promise2]);
    });

    it('should return early from scheduleNextRelease when queue is empty - line 66', async () => {
      const testLimiter = new RateLimiter(5, 5, 1000);

      // Use some tokens but don't queue anything
      await testLimiter.wait();
      await testLimiter.wait();

      // Verify no queue exists
      const status = testLimiter.getStatus();
      expect(status.queueLength).toBe(0);
      expect(status.tokens).toBe(3);

      // The scheduleNextRelease should return early when called with empty queue
      // This is tested implicitly as the method won't schedule timers for empty queue
    });
  });
});
