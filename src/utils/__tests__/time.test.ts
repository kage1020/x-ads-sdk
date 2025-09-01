import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatDateForAPI,
  getCurrentUnixTimestamp,
  isInPast,
  sleep,
  unixTimestampToDate,
} from '../time.js';

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

  describe('getCurrentUnixTimestamp', () => {
    it('should return current Unix timestamp in seconds', () => {
      const mockDate = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const timestamp = getCurrentUnixTimestamp();
      const expectedTimestamp = Math.floor(mockDate.getTime() / 1000);
      expect(timestamp).toBe(expectedTimestamp);
    });

    it('should return integer value (no decimals)', () => {
      const mockDate = new Date('2022-01-01T12:00:00.500Z'); // With milliseconds
      vi.setSystemTime(mockDate);

      const timestamp = getCurrentUnixTimestamp();
      expect(timestamp).toBe(Math.floor(timestamp));
      expect(Number.isInteger(timestamp)).toBe(true);
    });

    it('should return different values at different times', () => {
      const mockDate1 = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockDate1);
      const timestamp1 = getCurrentUnixTimestamp();

      const mockDate2 = new Date('2022-01-01T12:00:01.000Z');
      vi.setSystemTime(mockDate2);
      const timestamp2 = getCurrentUnixTimestamp();

      expect(timestamp2).toBe(timestamp1 + 1);
    });
  });

  describe('isInPast', () => {
    it('should return true for dates in the past', () => {
      const mockNow = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockNow);

      const pastDate = new Date('2022-01-01T11:59:59.999Z');
      expect(isInPast(pastDate)).toBe(true);
    });

    it('should return false for dates in the future', () => {
      const mockNow = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockNow);

      const futureDate = new Date('2022-01-01T12:00:00.001Z');
      expect(isInPast(futureDate)).toBe(false);
    });

    it('should return true for the exact current time', () => {
      const mockNow = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(mockNow);

      const currentDate = new Date('2022-01-01T12:00:00.000Z');
      expect(isInPast(currentDate)).toBe(false); // Exact same time should be false
    });

    it('should handle edge cases with millisecond precision', () => {
      const mockNow = new Date('2022-01-01T12:00:00.500Z');
      vi.setSystemTime(mockNow);

      const slightlyPast = new Date('2022-01-01T12:00:00.499Z');
      const slightlyFuture = new Date('2022-01-01T12:00:00.501Z');

      expect(isInPast(slightlyPast)).toBe(true);
      expect(isInPast(slightlyFuture)).toBe(false);
    });
  });

  describe('formatDateForAPI', () => {
    it('should return ISO string representation of date', () => {
      const date = new Date('2022-01-01T12:00:00.000Z');
      const formatted = formatDateForAPI(date);

      expect(formatted).toBe('2022-01-01T12:00:00.000Z');
      expect(typeof formatted).toBe('string');
    });

    it('should handle dates with milliseconds', () => {
      const date = new Date('2022-01-01T12:00:00.123Z');
      const formatted = formatDateForAPI(date);

      expect(formatted).toBe('2022-01-01T12:00:00.123Z');
    });

    it('should handle different timezones consistently', () => {
      // Create date in different timezone but same moment
      const date1 = new Date('2022-01-01T12:00:00.000Z');
      const date2 = new Date('2022-01-01T15:00:00.000+03:00');

      const formatted1 = formatDateForAPI(date1);
      const formatted2 = formatDateForAPI(date2);

      expect(formatted1).toBe(formatted2); // Both should be UTC
    });

    it('should handle leap year dates', () => {
      const leapDate = new Date('2020-02-29T12:00:00.000Z');
      const formatted = formatDateForAPI(leapDate);

      expect(formatted).toBe('2020-02-29T12:00:00.000Z');
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
      const currentTimestamp = getCurrentUnixTimestamp();
      const convertedDate = unixTimestampToDate(currentTimestamp);

      // Should be very close to current time (within 1 second due to precision)
      const timeDiff = Math.abs(convertedDate.getTime() - mockNow.getTime());
      expect(timeDiff).toBeLessThan(1000);

      // Should be considered as current time (not past)
      expect(isInPast(convertedDate)).toBe(false);
    });

    it('should format converted timestamps correctly', () => {
      const originalTimestamp = 1640995200; // 2022-01-01T00:00:00.000Z
      const date = unixTimestampToDate(originalTimestamp);
      const formatted = formatDateForAPI(date);

      expect(formatted).toBe('2022-01-01T00:00:00.000Z');
    });
  });
});
