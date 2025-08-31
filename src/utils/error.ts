/**
 * Error handling utility functions
 */

import type { APIErrorDetails } from '../errors';

/**
 * Extract error message from unknown error data
 * @param errorData - Unknown error data from API response
 * @param response - HTTP response object for fallback message
 * @returns Human-readable error message
 */
export function extractErrorMessage(errorData: unknown, response: Response): string {
  if (errorData && typeof errorData === 'object') {
    const data = errorData as any;
    return (
      data.errors?.[0]?.message || data.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return `HTTP ${response.status}: ${response.statusText}`;
}

/**
 * Extract error code from unknown error data
 * @param errorData - Unknown error data from API response
 * @returns Error code if available
 */
export function extractErrorCode(errorData: unknown): string | undefined {
  if (errorData && typeof errorData === 'object') {
    const data = errorData as any;
    return data.errors?.[0]?.code;
  }
  return undefined;
}

/**
 * Extract error details from unknown error data
 * @param errorData - Unknown error data from API response
 * @returns Structured error details
 */
export function extractErrorDetails(errorData: unknown): APIErrorDetails | undefined {
  if (errorData && typeof errorData === 'object') {
    return errorData as APIErrorDetails;
  }
  return undefined;
}

/**
 * Check if an error has a specific status code
 * @param error - Error object to check
 * @param statusCode - Expected status code
 * @returns True if error has the specified status code
 */
export function hasStatusCode(error: unknown, statusCode: number): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    (error as { statusCode: number }).statusCode === statusCode
  );
}
