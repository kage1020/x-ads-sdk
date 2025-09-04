import { beforeEach, describe, expect, it } from 'vitest';
import type { SDKConfig } from '@/types';
import { ConfigManager, validateConfig } from '@/utils/config';

describe('Config Unit Tests', () => {
  let validConfig: SDKConfig;

  beforeEach(() => {
    validConfig = {
      credentials: {
        consumerKey: 'test-consumer-key',
        consumerSecret: 'test-consumer-secret',
        accessToken: 'test-access-token',
        accessTokenSecret: 'test-access-token-secret',
      },
      environment: 'sandbox',
    };
  });

  describe('validateConfig function', () => {
    it('should validate valid config', () => {
      expect(() => validateConfig(validConfig)).not.toThrow();
    });

    it('should throw error for null/undefined config', () => {
      expect(() => validateConfig(null as unknown as SDKConfig)).toThrow(
        'Configuration is required'
      );
      expect(() => validateConfig(undefined as unknown as SDKConfig)).toThrow(
        'Configuration is required'
      );
    });

    it('should throw error for missing credentials', () => {
      const { credentials: _, ...configWithoutCredentials } = validConfig;

      expect(() => validateConfig(configWithoutCredentials as unknown as SDKConfig)).toThrow(
        'Credentials are required'
      );
    });

    it('should validate timeout when provided', () => {
      const configWithTimeout = { ...validConfig, timeout: 30000 };
      expect(() => validateConfig(configWithTimeout)).not.toThrow();
    });

    it('should validate rateLimitBuffer when provided', () => {
      const configWithBuffer = { ...validConfig, rateLimitBuffer: 0.5 };
      expect(() => validateConfig(configWithBuffer)).not.toThrow();
    });
  });

  describe('credential validation - branch coverage', () => {
    it('should throw error for short access token - line 44-46', () => {
      const configWithShortToken = {
        ...validConfig,
        credentials: {
          ...validConfig.credentials,
          accessToken: 'short', // Less than 10 characters
        },
      };

      expect(() => validateConfig(configWithShortToken)).toThrow('Invalid token format');
    });

    it('should throw error for access token containing invalid - line 44-46', () => {
      const configWithInvalidToken = {
        ...validConfig,
        credentials: {
          ...validConfig.credentials,
          accessToken: 'invalid-token-format', // Contains 'invalid'
        },
      };

      expect(() => validateConfig(configWithInvalidToken)).toThrow('Invalid token format');
    });

    it('should throw error for short access token secret - lines 48-52', () => {
      const configWithShortSecret = {
        ...validConfig,
        credentials: {
          ...validConfig.credentials,
          accessTokenSecret: 'short', // Less than 10 characters
        },
      };

      expect(() => validateConfig(configWithShortSecret)).toThrow('Invalid token secret format');
    });

    it('should throw error for access token secret containing invalid - lines 48-52', () => {
      const configWithInvalidSecret = {
        ...validConfig,
        credentials: {
          ...validConfig.credentials,
          accessTokenSecret: 'invalid-secret-format', // Contains 'invalid'
        },
      };

      expect(() => validateConfig(configWithInvalidSecret)).toThrow('Invalid token secret format');
    });

    it('should pass validation with valid tokens', () => {
      const configWithValidTokens = {
        ...validConfig,
        credentials: {
          ...validConfig.credentials,
          accessToken: 'valid-token-1234567890',
          accessTokenSecret: 'valid-secret-1234567890',
        },
      };

      expect(() => validateConfig(configWithValidTokens)).not.toThrow();
    });
  });

  describe('timeout validation - branch coverage', () => {
    it('should throw error when timeout equals 300000ms - lines 67-69', () => {
      const configWithMaxTimeout = {
        ...validConfig,
        timeout: 300000, // Exactly 300000ms - should fail
      };

      expect(() => validateConfig(configWithMaxTimeout)).toThrow(
        'Timeout cannot exceed 300000ms (5 minutes)'
      );
    });

    it('should throw error when timeout exceeds 300000ms - lines 67-69', () => {
      const configWithExcessiveTimeout = {
        ...validConfig,
        timeout: 300001, // Greater than 300000ms
      };

      expect(() => validateConfig(configWithExcessiveTimeout)).toThrow(
        'Timeout cannot exceed 300000ms (5 minutes)'
      );
    });

    it('should pass with timeout just under limit', () => {
      const configWithValidTimeout = {
        ...validConfig,
        timeout: 299999, // Just under the limit
      };

      expect(() => validateConfig(configWithValidTimeout)).not.toThrow();
    });
  });

  describe('rate limit buffer validation - branch coverage', () => {
    it('should throw error for non-number buffer - lines 73-75', () => {
      const configWithStringBuffer = {
        ...validConfig,
        rateLimitBuffer: 'invalid' as unknown as number, // Not a number
      };

      expect(() => validateConfig(configWithStringBuffer)).toThrow(
        'Rate limit buffer must be between 0 and 1'
      );
    });

    it('should throw error for negative buffer - lines 73-75', () => {
      const configWithNegativeBuffer = {
        ...validConfig,
        rateLimitBuffer: -0.1, // Negative value
      };

      expect(() => validateConfig(configWithNegativeBuffer)).toThrow(
        'Rate limit buffer must be between 0 and 1'
      );
    });

    it('should throw error for buffer greater than 1 - lines 73-75', () => {
      const configWithExcessiveBuffer = {
        ...validConfig,
        rateLimitBuffer: 1.1, // Greater than 1
      };

      expect(() => validateConfig(configWithExcessiveBuffer)).toThrow(
        'Rate limit buffer must be between 0 and 1'
      );
    });

    it('should pass with valid buffer values', () => {
      const validBuffers = [0, 0.5, 1.0];

      validBuffers.forEach((buffer) => {
        const configWithBuffer = { ...validConfig, rateLimitBuffer: buffer };
        expect(() => validateConfig(configWithBuffer)).not.toThrow();
      });
    });
  });

  describe('environment validation', () => {
    it('should throw error for invalid environment', () => {
      const configWithInvalidEnv = {
        ...validConfig,
        environment: 'invalid' as unknown as 'sandbox' | 'production',
      };

      expect(() => validateConfig(configWithInvalidEnv)).toThrow(
        'Invalid environment. Must be "sandbox" or "production"'
      );
    });

    it('should throw error for empty environment', () => {
      const configWithEmptyEnv = {
        ...validConfig,
        environment: '' as unknown as 'sandbox' | 'production',
      };

      expect(() => validateConfig(configWithEmptyEnv)).toThrow(
        'Invalid environment. Must be "sandbox" or "production"'
      );
    });
  });

  describe('ConfigManager class', () => {
    let configManager: ConfigManager;

    beforeEach(() => {
      configManager = new ConfigManager(validConfig);
    });

    it('should initialize with valid config', () => {
      expect(configManager.getConfig()).toEqual(expect.objectContaining(validConfig));
    });

    it('should apply default values', () => {
      const config = configManager.getConfig();
      expect(config.timeout).toBe(60000);
      expect(config.rateLimitBuffer).toBe(0.1);
      expect(config.debug).toBe(false);
    });

    it('should preserve explicit values', () => {
      const configWithDefaults = {
        ...validConfig,
        timeout: 30000,
        rateLimitBuffer: 0.5,
        debug: true,
      };

      const manager = new ConfigManager(configWithDefaults);
      const config = manager.getConfig();

      expect(config.timeout).toBe(30000);
      expect(config.rateLimitBuffer).toBe(0.5);
      expect(config.debug).toBe(true);
    });

    it('should update config successfully', () => {
      const updates = { environment: 'production' as const, timeout: 45000 };
      configManager.updateConfig(updates);

      const updatedConfig = configManager.getConfig();
      expect(updatedConfig.environment).toBe('production');
      expect(updatedConfig.timeout).toBe(45000);
    });

    it('should validate updates', () => {
      expect(() => configManager.updateConfig({ timeout: -1000 })).toThrow(
        'Timeout must be positive integer'
      );
    });

    it('should get correct base URL', () => {
      expect(configManager.getBaseUrl()).toBe('https://ads-api-sandbox.twitter.com/12');

      configManager.updateConfig({ environment: 'production' });
      expect(configManager.getBaseUrl()).toBe('https://ads-api.twitter.com/12');
    });

    it('should get timeout with default', () => {
      expect(configManager.getTimeout()).toBe(60000);
    });

    it('should get rate limit buffer with default', () => {
      expect(configManager.getRateLimitBuffer()).toBe(0.1);
    });

    it('should check debug mode with default', () => {
      expect(configManager.isDebugMode()).toBe(false);
    });
  });

  describe('error handling edge cases', () => {
    it('should handle missing credential fields', () => {
      const testCases = [
        { field: 'consumerKey', expectedMessage: 'Consumer key is required' },
        { field: 'consumerSecret', expectedMessage: 'Consumer secret is required' },
        { field: 'accessToken', expectedMessage: 'Access token is required' },
        { field: 'accessTokenSecret', expectedMessage: 'Access token secret is required' },
      ];

      testCases.forEach(({ field, expectedMessage }) => {
        const { [field]: _, ...credentialsWithoutField } =
          validConfig.credentials as unknown as Record<string, string>;
        const invalidConfig = {
          ...validConfig,
          credentials: credentialsWithoutField,
        };

        expect(() => validateConfig(invalidConfig as unknown as SDKConfig)).toThrow(
          expectedMessage
        );
      });
    });

    it('should handle non-integer timeout', () => {
      const configWithFloatTimeout = { ...validConfig, timeout: 30000.5 };

      expect(() => validateConfig(configWithFloatTimeout)).toThrow(
        'Timeout must be positive integer'
      );
    });

    it('should handle zero timeout', () => {
      const configWithZeroTimeout = { ...validConfig, timeout: 0 };

      expect(() => validateConfig(configWithZeroTimeout)).toThrow(
        'Timeout must be positive integer'
      );
    });
  });
});
