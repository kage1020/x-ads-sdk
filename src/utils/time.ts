/**
 * Time and date utility functions
 */

/**
 * Convert Unix timestamp to Date object
 * @param timestamp - Unix timestamp (in seconds)
 * @returns Date object
 */
export function unixTimestampToDate(timestamp: string | number): Date {
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  return new Date(numericTimestamp * 1000);
}

/**
 * Sleep for a specified number of milliseconds
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
