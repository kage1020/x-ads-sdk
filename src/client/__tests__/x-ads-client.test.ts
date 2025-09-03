import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { XAdsPlugin } from '../../plugins/base.js';
import { AccountResource, CampaignResource, LineItemResource } from '../../resources/index.js';
import { APIVersion } from '../../types/api-version.js';
import { type ClientConfig, Environment } from '../../types/common.js';
import { HttpClient } from '../base.js';
import { XAdsClient } from '../x-ads-client.js';

describe('XAdsClient', () => {
  const defaultConfig: ClientConfig = {
    auth: {
      consumerKey: 'test_consumer_key',
      consumerSecret: 'test_consumer_secret',
      accessToken: 'test_access_token',
      accessTokenSecret: 'test_access_token_secret',
    },
  };

  let client: XAdsClient;

  beforeEach(() => {
    client = new XAdsClient(defaultConfig);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create XAdsClient with default environment (sandbox)', () => {
      const client = new XAdsClient(defaultConfig);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with production environment', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        environment: Environment.PRODUCTION,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with custom baseURL', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        baseURL: 'https://custom.api.com',
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with custom timeout', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        timeout: 60000,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient without timeout (use default)', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        timeout: undefined,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with custom API version', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        apiVersion: APIVersion.V11,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient without API version (use default)', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        apiVersion: undefined,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with autoUpgradeVersion enabled', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        autoUpgradeVersion: true,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient without autoUpgradeVersion (use default)', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        autoUpgradeVersion: undefined,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with custom rateLimitStrategy', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        rateLimitStrategy: 'throw',
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient without rateLimitStrategy (use default "wait")', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        rateLimitStrategy: undefined,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient with custom maxRetries', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        maxRetries: 5,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should create XAdsClient without maxRetries (use default 3)', () => {
      const config: ClientConfig = {
        ...defaultConfig,
        maxRetries: undefined,
      };
      const client = new XAdsClient(config);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should initialize accounts resource', () => {
      const client = new XAdsClient(defaultConfig);
      expect(client.accounts).toBeInstanceOf(AccountResource);
    });
  });

  describe('getHttpClient', () => {
    it('should return the underlying HTTP client', () => {
      const httpClient = client.getHttpClient();
      expect(httpClient).toBeInstanceOf(HttpClient);
    });
  });

  describe('plugin management', () => {
    const mockPlugin: XAdsPlugin = {
      name: 'test-plugin',
      version: '1.0.0',
      beforeRequest: vi.fn().mockImplementation((config) => config),
    };

    it('should add plugin successfully', () => {
      const result = client.use(mockPlugin);
      expect(result).toBe(client); // Should return this for chaining
    });

    it('should remove plugin successfully', () => {
      client.use(mockPlugin);
      const result = client.removePlugin('test-plugin');
      expect(result).toBe(true);
    });

    it('should return false when removing non-existent plugin', () => {
      const result = client.removePlugin('non-existent-plugin');
      expect(result).toBe(false);
    });

    it('should check if plugin exists', () => {
      client.use(mockPlugin);
      const hasPlugin = client.hasPlugin('test-plugin');
      expect(hasPlugin).toBe(true);
    });

    it('should return false for non-existent plugin check', () => {
      const hasPlugin = client.hasPlugin('non-existent-plugin');
      expect(hasPlugin).toBe(false);
    });

    it('should allow method chaining for use()', () => {
      const result = client.use(mockPlugin);
      expect(result).toBe(client);
    });
  });

  describe('API version management', () => {
    it('should get current API version', () => {
      const version = client.getAPIVersion();
      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
    });

    it('should set API version', () => {
      expect(() => {
        client.setAPIVersion(APIVersion.V12);
      }).not.toThrow();
    });

    it('should get version info', () => {
      const versionInfo = client.getVersionInfo();
      expect(versionInfo).toBeDefined();
      expect(versionInfo).toHaveProperty('currentVersion');
      expect(versionInfo).toHaveProperty('warnings');
      expect(versionInfo).toHaveProperty('recommendedAction');
    });

    it('should check if version is deprecated', () => {
      const isDeprecated = client.isVersionDeprecated();
      expect(typeof isDeprecated).toBe('boolean');
    });

    it('should handle version management operations', () => {
      // Set to a different version
      client.setAPIVersion(APIVersion.V11);
      const newVersion = client.getAPIVersion();
      expect(newVersion).toBe(APIVersion.V11);

      // Check version info
      const versionInfo = client.getVersionInfo();
      expect(versionInfo).toBeDefined();

      // Check deprecation status
      const isDeprecated = client.isVersionDeprecated();
      expect(typeof isDeprecated).toBe('boolean');
    });
  });

  describe('resource integration', () => {
    it('should have accounts resource with expected methods', () => {
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.get).toBe('function');
      expect(typeof client.accounts.create).toBe('function');
      expect(typeof client.accounts.update).toBe('function');
    });

    it('should provide resource factory methods', () => {
      expect(typeof client.getCampaignResource).toBe('function');
      expect(typeof client.getLineItemResource).toBe('function');
    });

    it('should create campaign resource for specific account', () => {
      const accountId = 'test_account_id';
      const campaignResource = client.getCampaignResource(accountId);
      expect(campaignResource).toBeInstanceOf(CampaignResource);
      expect(typeof campaignResource.list).toBe('function');
      expect(typeof campaignResource.get).toBe('function');
      expect(typeof campaignResource.create).toBe('function');
      expect(typeof campaignResource.update).toBe('function');
      expect(typeof campaignResource.delete).toBe('function');
    });

    it('should create line item resource for specific account', () => {
      const accountId = 'test_account_id';
      const lineItemResource = client.getLineItemResource(accountId);
      expect(lineItemResource).toBeInstanceOf(LineItemResource);
      expect(typeof lineItemResource.list).toBe('function');
      expect(typeof lineItemResource.get).toBe('function');
      expect(typeof lineItemResource.create).toBe('function');
      expect(typeof lineItemResource.update).toBe('function');
      expect(typeof lineItemResource.delete).toBe('function');
    });
  });

  describe('configuration handling', () => {
    it('should handle comprehensive configuration', () => {
      const complexConfig: ClientConfig = {
        auth: {
          consumerKey: 'complex_consumer_key',
          consumerSecret: 'complex_consumer_secret',
          accessToken: 'complex_access_token',
          accessTokenSecret: 'complex_access_token_secret',
        },
        environment: Environment.PRODUCTION,
        baseURL: 'https://custom.api.example.com',
        timeout: 45000,
        apiVersion: APIVersion.V12,
        autoUpgradeVersion: true,
        rateLimitStrategy: 'throw',
        maxRetries: 2,
      };

      const complexClient = new XAdsClient(complexConfig);
      expect(complexClient).toBeInstanceOf(XAdsClient);
      expect(complexClient.getAPIVersion()).toBe(APIVersion.V12);
    });

    it('should handle minimal configuration with defaults', () => {
      const minimalConfig: ClientConfig = {
        auth: {
          consumerKey: 'min_consumer_key',
          consumerSecret: 'min_consumer_secret',
          accessToken: 'min_access_token',
          accessTokenSecret: 'min_access_token_secret',
        },
      };

      const minimalClient = new XAdsClient(minimalConfig);
      expect(minimalClient).toBeInstanceOf(XAdsClient);
      expect(minimalClient.accounts).toBeInstanceOf(AccountResource);
    });
  });

  describe('plugin workflow', () => {
    it('should support complete plugin lifecycle', () => {
      const plugin1: XAdsPlugin = {
        name: 'plugin-1',
        version: '1.0.0',
        beforeRequest: vi.fn().mockImplementation((config) => config),
      };

      const plugin2: XAdsPlugin = {
        name: 'plugin-2',
        version: '2.0.0',
        afterResponse: vi.fn().mockImplementation((response) => response),
      };

      // Add plugins
      client.use(plugin1).use(plugin2);

      // Check plugins exist
      expect(client.hasPlugin('plugin-1')).toBe(true);
      expect(client.hasPlugin('plugin-2')).toBe(true);
      expect(client.hasPlugin('non-existent')).toBe(false);

      // Remove one plugin
      expect(client.removePlugin('plugin-1')).toBe(true);
      expect(client.hasPlugin('plugin-1')).toBe(false);
      expect(client.hasPlugin('plugin-2')).toBe(true);

      // Try to remove non-existent plugin
      expect(client.removePlugin('plugin-1')).toBe(false);
    });
  });
});
