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
 * Get current Unix timestamp in seconds
 * @returns Current timestamp in seconds
 */
export function getCurrentUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns True if the date is in the past
 */
export function isInPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Format date for API requests (ISO string)
 * @param date - Date to format
 * @returns ISO string representation
 */
export function formatDateForAPI(date: Date): string {
  return date.toISOString();
}

/**
 * Sleep for a specified number of milliseconds
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
