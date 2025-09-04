import type { QueryParams } from '../types';

/**
 * Validates that all required fields are present in the data object
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  requiredFields: string[]
): void {
  const missingFields = requiredFields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ''
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
}

/**
 * Validates a date range for API requests
 */
export function validateDateRange(startTime: string, endTime: string): void {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error('Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)');
  }

  if (start >= end) {
    throw new Error('Date range is invalid: start time must be before end time');
  }

  const now = new Date();
  if (start > now) {
    throw new Error('Start time cannot be in the future');
  }

  const maxRangeMs = 365 * 24 * 60 * 60 * 1000;
  if (end.getTime() - start.getTime() > maxRangeMs) {
    throw new Error('Date range exceeds maximum allowed period (365 days)');
  }
}

/**
 * Validates budget amount in micro currency units
 */
export function validateBudget(amount: number, minAmount: number = 50000000): void {
  if (!Number.isInteger(amount) || amount < minAmount) {
    throw new Error(`Budget amount must be at least ${minAmount} micro currency units`);
  }
}

/**
 * Validates string length
 */
export function validateStringLength(value: string, field: string, maxLength: number = 280): void {
  if (value.length > maxLength) {
    throw new Error(`${field} cannot exceed ${maxLength} characters`);
  }
}

/**
 * Removes undefined and null values from parameters
 */
export function sanitizeParams<T extends Record<string, unknown>>(params: T): T {
  const sanitized = { ...params };

  Object.keys(sanitized).forEach((key) => {
    if (sanitized[key] === undefined || sanitized[key] === null) {
      delete sanitized[key];
    }
  });

  return sanitized;
}

/**
 * Builds query string from parameters object
 */
export function buildQueryString(params: QueryParams): string {
  const filteredParams = Object.entries(params).filter(
    ([_, value]) => value !== undefined && value !== null
  );

  if (filteredParams.length === 0) return '';

  const searchParams = new URLSearchParams();
  for (const [key, value] of filteredParams) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, String(item));
      }
    } else {
      searchParams.set(key, String(value));
    }
  }

  return `?${searchParams.toString()}`;
}
