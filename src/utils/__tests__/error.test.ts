import { describe, expect, it } from 'vitest';
import {
  extractErrorCode,
  extractErrorDetails,
  extractErrorMessage,
  hasStatusCode,
} from '../error.js';

// Mock Response object
const createMockResponse = (status: number, statusText: string): Response =>
  ({
    status,
    statusText,
  }) as Response;

describe('error utilities', () => {
  describe('extractErrorMessage', () => {
    it('should extract message from structured error with errors array', () => {
      const errorData = {
        errors: [{ message: 'Validation failed' }],
      };
      const response = createMockResponse(400, 'Bad Request');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('Validation failed');
    });

    it('should extract message from simple error object', () => {
      const errorData = {
        error: 'Authentication failed',
      };
      const response = createMockResponse(401, 'Unauthorized');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('Authentication failed');
    });

    it('should fallback to HTTP status when no error message available', () => {
      const errorData = {
        some_field: 'some_value',
      };
      const response = createMockResponse(500, 'Internal Server Error');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('HTTP 500: Internal Server Error');
    });

    it('should fallback to HTTP status when errorData is not an object', () => {
      const errorData = 'string error';
      const response = createMockResponse(404, 'Not Found');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('HTTP 404: Not Found');
    });

    it('should fallback to HTTP status when errorData is null', () => {
      const errorData = null;
      const response = createMockResponse(403, 'Forbidden');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('HTTP 403: Forbidden');
    });

    it('should handle empty errors array', () => {
      const errorData = {
        errors: [],
      };
      const response = createMockResponse(400, 'Bad Request');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('HTTP 400: Bad Request');
    });

    it('should handle errors array with empty message', () => {
      const errorData = {
        errors: [{ code: 'INVALID_INPUT' }], // No message field
      };
      const response = createMockResponse(400, 'Bad Request');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('HTTP 400: Bad Request');
    });

    it('should prioritize errors array message over error field', () => {
      const errorData = {
        errors: [{ message: 'Array error message' }],
        error: 'Simple error message',
      };
      const response = createMockResponse(400, 'Bad Request');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('Array error message');
    });

    it('should handle multiple errors and use first one', () => {
      const errorData = {
        errors: [{ message: 'First error' }, { message: 'Second error' }],
      };
      const response = createMockResponse(400, 'Bad Request');

      const result = extractErrorMessage(errorData, response);
      expect(result).toBe('First error');
    });

    it('should handle undefined errorData', () => {
      const response = createMockResponse(500, 'Internal Server Error');

      const result = extractErrorMessage(undefined, response);
      expect(result).toBe('HTTP 500: Internal Server Error');
    });
  });

  describe('extractErrorCode', () => {
    it('should extract code from structured error with errors array', () => {
      const errorData = {
        errors: [{ code: 'VALIDATION_ERROR' }],
      };

      const result = extractErrorCode(errorData);
      expect(result).toBe('VALIDATION_ERROR');
    });

    it('should return undefined when no error code available', () => {
      const errorData = {
        errors: [{ message: 'Some error' }], // No code field
      };

      const result = extractErrorCode(errorData);
      expect(result).toBeUndefined();
    });

    it('should return undefined when errorData is not an object', () => {
      const result = extractErrorCode('string error');
      expect(result).toBeUndefined();
    });

    it('should return undefined when errorData is null', () => {
      const result = extractErrorCode(null);
      expect(result).toBeUndefined();
    });

    it('should return undefined when no errors array exists', () => {
      const errorData = {
        error: 'Simple error',
      };

      const result = extractErrorCode(errorData);
      expect(result).toBeUndefined();
    });

    it('should handle empty errors array', () => {
      const errorData = {
        errors: [],
      };

      const result = extractErrorCode(errorData);
      expect(result).toBeUndefined();
    });

    it('should handle multiple errors and use first one', () => {
      const errorData = {
        errors: [{ code: 'FIRST_ERROR' }, { code: 'SECOND_ERROR' }],
      };

      const result = extractErrorCode(errorData);
      expect(result).toBe('FIRST_ERROR');
    });

    it('should handle undefined errorData', () => {
      const result = extractErrorCode(undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('extractErrorDetails', () => {
    it('should return error data when it is an object', () => {
      const errorData = {
        errors: [{ message: 'Test error', code: 'TEST_ERROR' }],
        request_id: '123',
      };

      const result = extractErrorDetails(errorData);
      expect(result).toEqual(errorData);
    });

    it('should return undefined when errorData is not an object', () => {
      const result = extractErrorDetails('string error');
      expect(result).toBeUndefined();
    });

    it('should return undefined when errorData is null', () => {
      const result = extractErrorDetails(null);
      expect(result).toBeUndefined();
    });

    it('should return undefined when errorData is undefined', () => {
      const result = extractErrorDetails(undefined);
      expect(result).toBeUndefined();
    });

    it('should handle complex nested error data', () => {
      const errorData = {
        errors: [
          {
            message: 'Complex validation error',
            code: 'VALIDATION_ERROR',
            details: {
              field: 'email',
              constraint: 'format',
            },
          },
        ],
        request: {
          request_id: 'req_123',
          timestamp: '2022-01-01T12:00:00Z',
        },
      };

      const result = extractErrorDetails(errorData);
      expect(result).toEqual(errorData);
    });

    it('should handle empty object', () => {
      const errorData = {};

      const result = extractErrorDetails(errorData);
      expect(result).toEqual({});
    });

    it('should preserve all properties of error data', () => {
      const errorData = {
        errors: [],
        custom_field: 'custom_value',
        nested: {
          deep: {
            property: true,
          },
        },
      };

      const result = extractErrorDetails(errorData);
      expect(result).toEqual(errorData);
      // extractErrorDetails just returns the same object with type casting,
      // so it will be the same reference
      expect(result).toBe(errorData);
    });
  });

  describe('hasStatusCode', () => {
    it('should return true when error has matching status code', () => {
      const error = { statusCode: 404 };

      const result = hasStatusCode(error, 404);
      expect(result).toBe(true);
    });

    it('should return false when error has different status code', () => {
      const error = { statusCode: 404 };

      const result = hasStatusCode(error, 500);
      expect(result).toBe(false);
    });

    it('should return false when error is not an object', () => {
      const error = 'string error';

      const result = hasStatusCode(error, 404);
      expect(result).toBe(false);
    });

    it('should return false when error is null', () => {
      const result = hasStatusCode(null, 404);
      expect(result).toBe(false);
    });

    it('should return false when error is undefined', () => {
      const result = hasStatusCode(undefined, 404);
      expect(result).toBe(false);
    });

    it('should return false when error does not have statusCode property', () => {
      const error = { message: 'Some error' };

      const result = hasStatusCode(error, 404);
      expect(result).toBe(false);
    });

    it('should return false when statusCode is not a number', () => {
      const error = { statusCode: '404' };

      const result = hasStatusCode(error, 404);
      expect(result).toBe(false);
    });

    it('should handle zero status code correctly', () => {
      const error = { statusCode: 0 };

      const result = hasStatusCode(error, 0);
      expect(result).toBe(true);
    });

    it('should handle negative status codes', () => {
      const error = { statusCode: -1 };

      const result = hasStatusCode(error, -1);
      expect(result).toBe(true);
    });

    it('should handle custom error objects with additional properties', () => {
      const error = {
        statusCode: 422,
        message: 'Unprocessable Entity',
        details: 'Validation failed',
      };

      const result = hasStatusCode(error, 422);
      expect(result).toBe(true);
    });
  });

  describe('integration tests', () => {
    it('should work together to extract comprehensive error information', () => {
      const errorData = {
        errors: [
          {
            message: 'Invalid email format',
            code: 'EMAIL_FORMAT_ERROR',
          },
        ],
      };
      const response = createMockResponse(400, 'Bad Request');

      const message = extractErrorMessage(errorData, response);
      const code = extractErrorCode(errorData);
      const details = extractErrorDetails(errorData);

      expect(message).toBe('Invalid email format');
      expect(code).toBe('EMAIL_FORMAT_ERROR');
      expect(details).toEqual(errorData);
    });

    it('should handle API error response with missing information gracefully', () => {
      const errorData = {
        request_id: 'req_123',
        // No errors array or error field
      };
      const response = createMockResponse(500, 'Internal Server Error');

      const message = extractErrorMessage(errorData, response);
      const code = extractErrorCode(errorData);
      const details = extractErrorDetails(errorData);

      expect(message).toBe('HTTP 500: Internal Server Error');
      expect(code).toBeUndefined();
      expect(details).toEqual(errorData);
    });
  });
});
