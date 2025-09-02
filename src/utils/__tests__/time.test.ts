import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sleep, unixTimestampToDate } from '../time.js';

describe('time utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('unixTimestampToDate', () => {
    it('should convert Unix timestamp (number) to Date object', () => {
      const timestamp = 1640995200; // 2022-01-01T00:00:00.000Z
      const date = unixTimestampToDate(timestamp);

      expect(date).toBeInstanceOf(Date);
      expect(date.toISOString()).toBe('2022-01-01T00:00:00.000Z');
    });

    it('should convert Unix timestamp (string) to Date object', () => {
      const timestamp = '1640995200'; // 2022-01-01T00:00:00.000Z
      const date = unixTimestampToDate(timestamp);

      expect(date).toBeInstanceOf(Date);
      expect(date.toISOString()).toBe('2022-01-01T00:00:00.000Z');
    });

    it('should handle zero timestamp', () => {
      const date = unixTimestampToDate(0);
      expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z');
    });

    it('should handle negative timestamp', () => {
      const date = unixTimestampToDate(-86400); // One day before epoch
      expect(date.toISOString()).toBe('1969-12-31T00:00:00.000Z');
    });
  });

  describe('sleep', () => {
    it('should resolve after specified milliseconds', async () => {
      const sleepPromise = sleep(1000);

      // Fast-forward time
      vi.advanceTimersByTime(1000);

      await sleepPromise;
      // In fake timer mode, we can't rely on actual time passage
      expect(vi.getTimerCount()).toBe(0); // All timers should be resolved
    });

    it('should return a Promise<void>', () => {
      const result = sleep(100);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should handle zero milliseconds', async () => {
      const sleepPromise = sleep(0);
      vi.advanceTimersByTime(0);

      await expect(sleepPromise).resolves.toBeUndefined();
    });

    it('should handle multiple concurrent sleeps', async () => {
      const sleep1 = sleep(100);
      const sleep2 = sleep(200);
      const sleep3 = sleep(50);

      // Advance time to resolve sleep3 first
      vi.advanceTimersByTime(50);
      await expect(sleep3).resolves.toBeUndefined();

      // Advance to resolve sleep1
      vi.advanceTimersByTime(50);
      await expect(sleep1).resolves.toBeUndefined();

      // Advance to resolve sleep2
      vi.advanceTimersByTime(100);
      await expect(sleep2).resolves.toBeUndefined();
    });

    it('should work with async/await pattern', async () => {
      const promise = sleep(500);
      vi.advanceTimersByTime(500);

      const result = await promise;
      expect(result).toBeUndefined();
    });
  });

  describe('integration tests', () => {
    it('should work together for timestamp conversion and comparison', () => {
      const mockNow = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockNow);

      // Get current timestamp and convert back to date
      const currentTimestamp = Math.floor(mockNow.getTime() / 1000);
      const convertedDate = unixTimestampToDate(currentTimestamp);

      // Should be very close to current time (within 1 second due to precision)
      const timeDiff = Math.abs(convertedDate.getTime() - mockNow.getTime());
      expect(timeDiff).toBeLessThan(1000);

      // Should be considered as current time (not past)
      expect(convertedDate < mockNow).toBe(false);
    });

    it('should format converted timestamps correctly', () => {
      const originalTimestamp = 1640995200; // 2022-01-01T00:00:00.000Z
      const date = unixTimestampToDate(originalTimestamp);
      const formatted = date.toISOString();

      expect(formatted).toBe('2022-01-01T00:00:00.000Z');
    });
  });
});
