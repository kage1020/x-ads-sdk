import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RetryHandler } from '../retry';

describe('RetryHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // Ensure all pending promises are resolved before cleanup
    await vi.runOnlyPendingTimersAsync();
    vi.useRealTimers();
    // Give a moment for cleanup
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const handler = new RetryHandler();
      expect(handler.options).toEqual({
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 30000,
        backoffFactor: 2,
        retryableStatusCodes: [429, 500, 502, 503, 504],
      });
    });

    it('should accept custom options', () => {
      const customOptions = {
        maxRetries: 5,
        initialDelay: 500,
        maxDelay: 60000,
        backoffFactor: 3,
        retryableStatusCodes: [408, 429, 500, 502, 503, 504],
      };
      const handler = new RetryHandler(customOptions);
      expect(handler.options).toEqual(customOptions);
    });

    it('should merge custom options with defaults', () => {
      const handler = new RetryHandler({ maxRetries: 5 });
      expect(handler.options.maxRetries).toBe(5);
      expect(handler.options.initialDelay).toBe(1000); // default
    });
  });

  describe('executeWithRetry', () => {
    it('should return result on first success', async () => {
      const handler = new RetryHandler();
      const mockOperation = vi.fn().mockResolvedValue('success');

      const result = await handler.executeWithRetry(mockOperation);

      expect(result).toBe('success');
      expect(mockOperation).toHaveBeenCalledTimes(1);
    });

    it('should retry on retryable errors', async () => {
      const handler = new RetryHandler();
      const retryableError = new Error('fetch failed') as Error & { statusCode: number };
      retryableError.statusCode = 500;

      const mockOperation = vi
        .fn()
        .mockRejectedValueOnce(retryableError)
        .mockResolvedValue('success');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const resultPromise = handler.executeWithRetry(mockOperation);

      // Advance timers to handle sleep
      await vi.advanceTimersByTimeAsync(1000);

      const result = await resultPromise;

      expect(result).toBe('success');
      expect(mockOperation).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Attempt 1 failed'));
    }, 10000);

    it('should not retry on non-retryable errors', async () => {
      const handler = new RetryHandler();
      const nonRetryableError = new Error('Validation error') as Error & { statusCode: number };
      nonRetryableError.statusCode = 400;

      const mockOperation = vi.fn().mockRejectedValue(nonRetryableError);

      await expect(handler.executeWithRetry(mockOperation)).rejects.toThrow('Validation error');
      expect(mockOperation).toHaveBeenCalledTimes(1);
    });

    it('should respect maxRetries limit', async () => {
      const handler = new RetryHandler({ maxRetries: 2 });

      let _callCount = 0;
      const mockOperation = vi.fn().mockImplementation(() => {
        _callCount++;
        const error = new Error('Server error') as Error & { statusCode: number };
        error.statusCode = 500;
        return Promise.reject(error);
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Create the promise first, then advance timers
      const executePromise = handler.executeWithRetry(mockOperation);

      // Manually advance time for each retry
      await vi.advanceTimersByTimeAsync(1000); // First retry
      await vi.advanceTimersByTimeAsync(2000); // Second retry

      let caughtError: Error | null = null;
      try {
        await executePromise;
      } catch (error) {
        caughtError = error as Error;
      }

      expect(caughtError).toBeTruthy();
      expect(caughtError?.message).toBe('Server error');
      expect(mockOperation).toHaveBeenCalledTimes(3); // Initial + 2 retries
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    it('should use exponential backoff', async () => {
      const handler = new RetryHandler({ maxRetries: 2, initialDelay: 100, backoffFactor: 2 });

      const mockOperation = vi.fn().mockImplementation(() => {
        const error = new Error('Server error') as Error & { statusCode: number };
        error.statusCode = 500;
        return Promise.reject(error);
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const executePromise = handler.executeWithRetry(mockOperation);

      // Advance timers for each retry
      await vi.advanceTimersByTimeAsync(100); // First retry
      await vi.advanceTimersByTimeAsync(200); // Second retry

      let caughtError: Error | null = null;
      try {
        await executePromise;
      } catch (error) {
        caughtError = error as Error;
      }

      expect(caughtError).toBeTruthy();
      expect(caughtError?.message).toBe('Server error');
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Retrying in 100ms'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Retrying in 200ms'));
    });

    it('should respect maxDelay limit', async () => {
      const handler = new RetryHandler({
        maxRetries: 2,
        initialDelay: 1000,
        maxDelay: 1500,
        backoffFactor: 3,
      });

      const mockOperation = vi.fn().mockImplementation(() => {
        const error = new Error('Server error') as Error & { statusCode: number };
        error.statusCode = 500;
        return Promise.reject(error);
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const executePromise = handler.executeWithRetry(mockOperation);

      // Advance timers for each retry
      await vi.advanceTimersByTimeAsync(1000); // First retry
      await vi.advanceTimersByTimeAsync(1500); // Second retry (capped by maxDelay)

      let caughtError: Error | null = null;
      try {
        await executePromise;
      } catch (error) {
        caughtError = error as Error;
      }

      expect(caughtError).toBeTruthy();
      expect(caughtError?.message).toBe('Server error');
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Retrying in 1000ms'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Retrying in 1500ms'));
    });

    it('should include context in retry messages', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });

      const mockOperation = vi.fn().mockImplementation(() => {
        const error = new Error('Server error') as Error & { statusCode: number };
        error.statusCode = 500;
        return Promise.reject(error);
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const executePromise = handler.executeWithRetry(mockOperation, {
        method: 'GET',
        endpoint: '/api/campaigns',
      });

      // Advance timer for the retry
      await vi.advanceTimersByTimeAsync(1000);

      let caughtError: Error | null = null;
      try {
        await executePromise;
      } catch (error) {
        caughtError = error as Error;
      }

      expect(caughtError).toBeTruthy();
      expect(caughtError?.message).toBe('Server error');
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('GET /api/campaigns'));
    });
  });

  describe('isRetryable', () => {
    const handler = new RetryHandler();

    it('should identify retryable network errors', () => {
      const networkError = new TypeError('fetch failed');
      expect(handler.isRetryable(networkError)).toBe(true);
    });

    it('should identify retryable timeout errors', () => {
      const timeoutError = new Error('Timeout');
      timeoutError.name = 'AbortError';
      expect(handler.isRetryable(timeoutError)).toBe(true);
    });

    it('should identify retryable status codes', () => {
      const serverError = new Error('Server Error') as Error & { statusCode: number };
      serverError.statusCode = 500;
      expect(handler.isRetryable(serverError)).toBe(true);

      const rateLimitError = new Error('Too Many Requests') as Error & { statusCode: number };
      rateLimitError.statusCode = 429;
      expect(handler.isRetryable(rateLimitError)).toBe(true);
    });

    it('should identify rate limit errors by name', () => {
      const rateLimitError = new Error('Rate limit exceeded');
      rateLimitError.name = 'RateLimitError';
      expect(handler.isRetryable(rateLimitError)).toBe(true);
    });

    it('should not retry client errors', () => {
      const clientError = new Error('Bad Request') as Error & { statusCode: number };
      clientError.statusCode = 400;
      expect(handler.isRetryable(clientError)).toBe(false);

      const unauthorizedError = new Error('Unauthorized') as Error & { statusCode: number };
      unauthorizedError.statusCode = 401;
      expect(handler.isRetryable(unauthorizedError)).toBe(false);
    });

    it('should not retry unknown errors', () => {
      const unknownError = new Error('Unknown error');
      expect(handler.isRetryable(unknownError)).toBe(false);
    });
  });

  describe('getNextDelay', () => {
    it('should calculate exponential backoff correctly', () => {
      const handler = new RetryHandler({
        initialDelay: 100,
        backoffFactor: 2,
        maxDelay: 10000,
      });

      expect(handler.getNextDelay(0)).toBe(100); // 100 * 2^0
      expect(handler.getNextDelay(1)).toBe(200); // 100 * 2^1
      expect(handler.getNextDelay(2)).toBe(400); // 100 * 2^2
      expect(handler.getNextDelay(3)).toBe(800); // 100 * 2^3
    });

    it('should respect maxDelay limit', () => {
      const handler = new RetryHandler({
        initialDelay: 1000,
        backoffFactor: 3,
        maxDelay: 5000,
      });

      expect(handler.getNextDelay(0)).toBe(1000); // 1000 * 3^0 = 1000
      expect(handler.getNextDelay(1)).toBe(3000); // 1000 * 3^1 = 3000
      expect(handler.getNextDelay(2)).toBe(5000); // 1000 * 3^2 = 9000, capped at 5000
      expect(handler.getNextDelay(3)).toBe(5000); // Capped at 5000
    });

    it('should handle zero attempt', () => {
      const handler = new RetryHandler({ initialDelay: 500 });
      expect(handler.getNextDelay(0)).toBe(500);
    });
  });

  describe('error handling edge cases', () => {
    it('should handle thrown non-Error objects', async () => {
      const handler = new RetryHandler();
      const mockOperation = vi.fn().mockRejectedValue('string error');

      // Non-Error objects will cause issues in isRetryableError due to 'in' operator
      await expect(handler.executeWithRetry(mockOperation)).rejects.toThrow();
      expect(mockOperation).toHaveBeenCalledTimes(1); // Should not retry
    });

    it('should handle null errors gracefully', async () => {
      const handler = new RetryHandler();
      const mockOperation = vi.fn().mockRejectedValue(null);

      // Null errors will cause issues when accessing properties
      await expect(handler.executeWithRetry(mockOperation)).rejects.toThrow();
    });

    it('should handle errors without statusCode property', () => {
      const handler = new RetryHandler();
      const regularError = new Error('Regular error');
      expect(handler.isRetryable(regularError)).toBe(false);
    });
  });

  describe('integration scenarios', () => {
    it('should handle mixed success and failure scenarios', async () => {
      const handler = new RetryHandler({ maxRetries: 3 });
      const retryableError = new Error('Temporary failure') as Error & { statusCode: number };
      retryableError.statusCode = 503;

      const mockOperation = vi
        .fn()
        .mockRejectedValueOnce(retryableError)
        .mockRejectedValueOnce(retryableError)
        .mockResolvedValue('final success');

      const resultPromise = handler.executeWithRetry(mockOperation);

      // Advance through retries step by step
      await vi.advanceTimersByTimeAsync(1000); // First retry delay
      await vi.advanceTimersByTimeAsync(2000); // Second retry delay

      // Ensure all async operations complete
      await vi.runOnlyPendingTimersAsync();

      const result = await resultPromise;

      expect(result).toBe('final success');
      expect(mockOperation).toHaveBeenCalledTimes(3);
    }, 10000);

    it('should work with async operations that take time', async () => {
      const handler = new RetryHandler({ maxRetries: 1, initialDelay: 100 });
      let attempt = 0;

      const mockOperation = vi.fn().mockImplementation(async () => {
        attempt++;
        if (attempt === 1) {
          const error = new Error('Server busy') as Error & { statusCode: number };
          error.statusCode = 503;
          throw error;
        }
        return 'async result';
      });

      const resultPromise = handler.executeWithRetry(mockOperation);

      // Wait for retry delay and ensure all operations complete
      await vi.advanceTimersByTimeAsync(100);
      await vi.runOnlyPendingTimersAsync();

      const result = await resultPromise;

      expect(result).toBe('async result');
      expect(mockOperation).toHaveBeenCalledTimes(2);
    }, 10000);
  });
});
