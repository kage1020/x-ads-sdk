import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AccountsModule, AdGroupsModule, AnalyticsModule, CampaignsModule } from '../../modules';
import type { XAdsPlugin } from '../../plugins/base';
import { APIVersion } from '../../types/api-version';
import { type ClientConfig, Environment } from '../../types/common';
import { HttpClient } from '../base';
import { XAdsClient } from '../x-ads-client';

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

    it('should initialize all modules', () => {
      const client = new XAdsClient(defaultConfig);
      expect(client.accounts).toBeInstanceOf(AccountsModule);
      expect(client.campaigns).toBeInstanceOf(CampaignsModule);
      expect(client.adGroups).toBeInstanceOf(AdGroupsModule);
      expect(client.analytics).toBeInstanceOf(AnalyticsModule);
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

  describe('module integration', () => {
    it('should have accounts module with expected methods', () => {
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.get).toBe('function');
      expect(typeof client.accounts.update).toBe('function');
    });

    it('should have campaigns module with expected methods', () => {
      expect(client.campaigns).toBeDefined();
      expect(typeof client.campaigns.list).toBe('function');
      expect(typeof client.campaigns.get).toBe('function');
      expect(typeof client.campaigns.create).toBe('function');
      expect(typeof client.campaigns.update).toBe('function');
      expect(typeof client.campaigns.delete).toBe('function');
    });

    it('should have adGroups module with expected methods', () => {
      expect(client.adGroups).toBeDefined();
      expect(typeof client.adGroups.list).toBe('function');
      expect(typeof client.adGroups.get).toBe('function');
      expect(typeof client.adGroups.create).toBe('function');
      expect(typeof client.adGroups.update).toBe('function');
      expect(typeof client.adGroups.delete).toBe('function');
    });

    it('should have analytics module with expected methods', () => {
      expect(client.analytics).toBeDefined();
      expect(typeof client.analytics.getCampaignAnalytics).toBe('function');
      expect(typeof client.analytics.getAdGroupAnalytics).toBe('function');
      expect(typeof client.analytics.getAccountAnalytics).toBe('function');
      expect(typeof client.analytics.getAnalytics).toBe('function');
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
      expect(minimalClient.accounts).toBeInstanceOf(AccountsModule);
      expect(minimalClient.campaigns).toBeInstanceOf(CampaignsModule);
      expect(minimalClient.adGroups).toBeInstanceOf(AdGroupsModule);
      expect(minimalClient.analytics).toBeInstanceOf(AnalyticsModule);
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
