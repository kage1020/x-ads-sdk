import { describe, expect, it } from 'vitest';
import {
  buildQueryString,
  sanitizeParams,
  validateBudget,
  validateDateRange,
  validateRequired,
  validateStringLength,
} from '@/utils/validation';

describe('Validation Unit Tests', () => {
  describe('validateRequired', () => {
    it('should pass when all required fields are present', () => {
      const data = {
        name: 'Test Campaign',
        budget: 1000000,
        status: 'active',
      };

      expect(() => validateRequired(data, ['name', 'budget'])).not.toThrow();
    });

    it('should pass when required fields have value 0', () => {
      const data = {
        count: 0,
        amount: 0,
      };

      expect(() => validateRequired(data, ['count', 'amount'])).not.toThrow();
    });

    it('should pass when required fields have boolean false', () => {
      const data = {
        paused: false,
        deleted: false,
      };

      expect(() => validateRequired(data, ['paused', 'deleted'])).not.toThrow();
    });

    it('should throw error when required field is undefined', () => {
      const data = {
        name: 'Test Campaign',
        // budget is missing
      };

      expect(() => validateRequired(data, ['name', 'budget'])).toThrow(
        'Missing required fields: budget'
      );
    });

    it('should throw error when required field is null', () => {
      const data = {
        name: 'Test Campaign',
        budget: null,
      };

      expect(() => validateRequired(data, ['name', 'budget'])).toThrow(
        'Missing required fields: budget'
      );
    });

    it('should throw error when required field is empty string', () => {
      const data = {
        name: '',
        budget: 1000000,
      };

      expect(() => validateRequired(data, ['name', 'budget'])).toThrow(
        'Missing required fields: name'
      );
    });

    it('should throw error with multiple missing fields', () => {
      const data = {
        status: 'active',
      };

      expect(() => validateRequired(data, ['name', 'budget', 'startTime'])).toThrow(
        'Missing required fields: name, budget, startTime'
      );
    });

    it('should handle empty required fields array', () => {
      const data = { name: 'Test' };
      expect(() => validateRequired(data, [])).not.toThrow();
    });
  });

  describe('validateStringLength', () => {
    it('should pass when string is within default limit (280 chars)', () => {
      const shortString = 'This is a short string';
      expect(() => validateStringLength(shortString, 'Test Field')).not.toThrow();
    });

    it('should pass when string is exactly at default limit', () => {
      const exactString = 'a'.repeat(280);
      expect(() => validateStringLength(exactString, 'Test Field')).not.toThrow();
    });

    it('should throw error when string exceeds default limit', () => {
      const longString = 'a'.repeat(281);
      expect(() => validateStringLength(longString, 'Test Field')).toThrow(
        'Test Field cannot exceed 280 characters'
      );
    });

    it('should pass when string is within custom limit', () => {
      const string = 'a'.repeat(50);
      expect(() => validateStringLength(string, 'Custom Field', 100)).not.toThrow();
    });

    it('should throw error when string exceeds custom limit', () => {
      const string = 'a'.repeat(51);
      expect(() => validateStringLength(string, 'Custom Field', 50)).toThrow(
        'Custom Field cannot exceed 50 characters'
      );
    });

    it('should handle empty string', () => {
      expect(() => validateStringLength('', 'Empty Field')).not.toThrow();
    });

    it('should handle single character', () => {
      expect(() => validateStringLength('a', 'Single Char')).not.toThrow();
    });
  });

  describe('validateBudget', () => {
    it('should pass with valid budget amount', () => {
      expect(() => validateBudget(100000000)).not.toThrow(); // $100 in micro units
    });

    it('should pass with minimum allowed amount', () => {
      expect(() => validateBudget(50000000)).not.toThrow(); // $50 in micro units
    });

    it('should pass with custom minimum amount', () => {
      expect(() => validateBudget(75000000, 75000000)).not.toThrow();
    });

    it('should throw error when amount is below minimum', () => {
      expect(() => validateBudget(49999999)).toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should throw error when amount is below custom minimum', () => {
      expect(() => validateBudget(99999999, 100000000)).toThrow(
        'Budget amount must be at least 100000000 micro currency units'
      );
    });

    it('should throw error when amount is not an integer', () => {
      expect(() => validateBudget(50000000.5)).toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should throw error when amount is zero', () => {
      expect(() => validateBudget(0)).toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should throw error when amount is negative', () => {
      expect(() => validateBudget(-1000000)).toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });
  });

  describe('validateDateRange', () => {
    const validStart = '2023-01-01T00:00:00Z';
    const validEnd = '2023-01-07T23:59:59Z';

    it('should pass with valid date range', () => {
      expect(() => validateDateRange(validStart, validEnd)).not.toThrow();
    });

    it('should pass with same day range', () => {
      const sameDay = '2023-01-01T10:00:00Z';
      const sameDayEnd = '2023-01-01T15:00:00Z';
      expect(() => validateDateRange(sameDay, sameDayEnd)).not.toThrow();
    });

    it('should throw error with invalid start date format', () => {
      expect(() => validateDateRange('invalid-date', validEnd)).toThrow(
        'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)'
      );
    });

    it('should throw error with invalid end date format', () => {
      expect(() => validateDateRange(validStart, 'invalid-date')).toThrow(
        'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)'
      );
    });

    it('should throw error when start time equals end time', () => {
      const sameTime = '2023-01-01T12:00:00Z';
      expect(() => validateDateRange(sameTime, sameTime)).toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should throw error when start time is after end time', () => {
      expect(() => validateDateRange(validEnd, validStart)).toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should throw error when start time is in the future', () => {
      const futureStart = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const futureEnd = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

      expect(() => validateDateRange(futureStart, futureEnd)).toThrow(
        'Start time cannot be in the future'
      );
    });

    it('should throw error when date range exceeds 365 days', () => {
      const start = '2023-01-01T00:00:00Z';
      const endTooFar = '2024-01-02T00:00:00Z'; // More than 365 days

      expect(() => validateDateRange(start, endTooFar)).toThrow(
        'Date range exceeds maximum allowed period (365 days)'
      );
    });

    it('should pass with exactly 365 day range', () => {
      const start = '2023-01-01T00:00:00Z';
      const endExactly = '2023-12-31T23:59:59Z';

      expect(() => validateDateRange(start, endExactly)).not.toThrow();
    });

    it('should handle different date formats that parse correctly', () => {
      const start = '2023-01-01T00:00:00.000Z';
      const end = '2023-01-07T23:59:59.999Z';

      expect(() => validateDateRange(start, end)).not.toThrow();
    });
  });

  describe('sanitizeParams', () => {
    it('should remove null values', () => {
      const params = {
        name: 'Test',
        description: null,
        count: 50,
      };

      const result = sanitizeParams(params);

      expect(result).toEqual({
        name: 'Test',
        count: 50,
      });
      expect(result).not.toHaveProperty('description');
    });

    it('should remove undefined values', () => {
      const params = {
        name: 'Test',
        description: undefined,
        count: 50,
      };

      const result = sanitizeParams(params);

      expect(result).toEqual({
        name: 'Test',
        count: 50,
      });
    });

    it('should keep falsy values that are not null/undefined', () => {
      const params = {
        name: '',
        count: 0,
        paused: false,
        nullValue: null,
        undefinedValue: undefined,
      };

      const result = sanitizeParams(params);

      expect(result).toEqual({
        name: '',
        count: 0,
        paused: false,
      });
    });

    it('should handle empty object', () => {
      const result = sanitizeParams({});
      expect(result).toEqual({});
    });

    it('should handle object with all null/undefined values', () => {
      const params = {
        a: null,
        b: undefined,
      };

      const result = sanitizeParams(params);
      expect(result).toEqual({});
    });

    it('should preserve nested objects and arrays', () => {
      const params = {
        config: { enabled: true, options: null },
        tags: ['tag1', 'tag2'],
        nullValue: null,
      };

      const result = sanitizeParams(params);

      expect(result).toEqual({
        config: { enabled: true, options: null },
        tags: ['tag1', 'tag2'],
      });
    });
  });

  describe('buildQueryString', () => {
    it('should build query string from simple parameters', () => {
      const params = {
        name: 'Test Campaign',
        count: 50,
        active: true,
      };

      const result = buildQueryString(params);

      expect(result).toContain('name=Test+Campaign'); // URLSearchParams uses + for spaces
      expect(result).toContain('count=50');
      expect(result).toContain('active=true');
      expect(result.startsWith('?')).toBe(true);
    });

    it('should handle array parameters', () => {
      const params = {
        ids: ['123', '456', '789'],
        tags: ['important', 'urgent'],
      };

      const result = buildQueryString(params);

      // URLSearchParams creates separate entries for array items
      expect(result).toContain('ids=123');
      expect(result).toContain('ids=456');
      expect(result).toContain('ids=789');
      expect(result).toContain('tags=important');
      expect(result).toContain('tags=urgent');
    });

    it('should URL encode special characters', () => {
      const params = {
        query: 'search & filter',
        email: 'test@example.com',
        path: '/api/v1/test',
      };

      const result = buildQueryString(params);

      expect(result).toContain('search+%26+filter'); // URLSearchParams uses + for spaces
      expect(result).toContain('test%40example.com');
      expect(result).toContain('%2Fapi%2Fv1%2Ftest');
    });

    it('should handle empty object', () => {
      const result = buildQueryString({});
      expect(result).toBe('');
    });

    it('should handle single parameter', () => {
      const result = buildQueryString({ test: 'value' });
      expect(result).toBe('?test=value');
    });

    it('should handle boolean parameters', () => {
      const params = {
        enabled: true,
        disabled: false,
      };

      const result = buildQueryString(params);

      expect(result).toContain('enabled=true');
      expect(result).toContain('disabled=false');
    });

    it('should handle number parameters', () => {
      const params = {
        count: 42,
        price: 19.99,
        zero: 0,
      };

      const result = buildQueryString(params);

      expect(result).toContain('count=42');
      expect(result).toContain('price=19.99');
      expect(result).toContain('zero=0');
    });

    it('should skip null and undefined values', () => {
      const params = {
        valid: 'test',
        nullValue: null,
        undefinedValue: undefined,
        emptyString: '',
      };

      const result = buildQueryString(params);

      expect(result).toContain('valid=test');
      expect(result).toContain('emptyString=');
      expect(result).not.toContain('nullValue');
      expect(result).not.toContain('undefinedValue');
    });
  });

  describe('Edge Cases and Error Conditions', () => {
    it('should handle validateRequired with special characters in field names', () => {
      const data = { 'field-name': 'value', field_name: 'value2' };
      expect(() => validateRequired(data, ['field-name', 'field_name'])).not.toThrow();
    });

    it('should handle validateStringLength with Unicode characters', () => {
      const unicodeString = '🚀💻🎉'.repeat(40); // Each set is 6 chars, 40*6=240 < 250
      expect(() => validateStringLength(unicodeString, 'Unicode Field', 250)).not.toThrow();

      const tooLongUnicode = '🚀💻🎉'.repeat(50); // 50*6=300 > 250
      expect(() => validateStringLength(tooLongUnicode, 'Unicode Field', 250)).toThrow();
    });

    it('should handle validateBudget with very large numbers', () => {
      const largeAmount = 999999999999; // Nearly $1 million
      expect(() => validateBudget(largeAmount)).not.toThrow();
    });

    it('should handle validateDateRange with edge case timestamps', () => {
      // Test with millisecond precision
      const start = '2023-01-01T00:00:00.000Z';
      const end = '2023-01-01T00:00:00.001Z'; // 1ms difference

      expect(() => validateDateRange(start, end)).not.toThrow();
    });

    it('should handle buildQueryString with empty arrays', () => {
      const params = {
        ids: [],
        tags: ['tag1'],
        emptyArray: [],
      };

      const result = buildQueryString(params);

      // Empty arrays are skipped by URLSearchParams
      expect(result).not.toContain('ids=');
      expect(result).toContain('tags=tag1');
      expect(result).not.toContain('emptyArray=');
      expect(result).toBe('?tags=tag1');
    });

    it('should handle sanitizeParams with nested null values', () => {
      const params = {
        config: {
          enabled: true,
          disabled: null,
        },
        topLevel: null,
      };

      const result = sanitizeParams(params);

      expect(result).toEqual({
        config: {
          enabled: true,
          disabled: null, // nested nulls are preserved
        },
      });
    });
  });
});
