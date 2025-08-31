import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DefaultPluginManager,
  type PluginClient,
  type PluginRequestConfig,
  type PluginResponse,
  type XAdsPlugin,
} from '../base';

describe('DefaultPluginManager', () => {
  let pluginManager: DefaultPluginManager;
  let mockClient: PluginClient;
  let mockConfig: PluginRequestConfig;
  let mockResponse: PluginResponse;

  beforeEach(() => {
    mockClient = {
      config: {
        baseURL: 'https://ads-api.twitter.com',
        timeout: 5000,
        maxRetries: 3,
      },
    };

    mockConfig = {
      method: 'GET',
      url: 'https://ads-api.twitter.com/12/accounts/123/campaigns',
      headers: { 'Content-Type': 'application/json' },
      params: { count: 10 },
      body: undefined,
    };

    mockResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
    };

    pluginManager = new DefaultPluginManager(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with empty plugins map', () => {
      const manager = new DefaultPluginManager();
      expect(manager.plugins.size).toBe(0);
    });

    it('should initialize with provided client', () => {
      const manager = new DefaultPluginManager(mockClient);
      expect(manager.plugins.size).toBe(0);
    });

    it('should handle undefined client', () => {
      const manager = new DefaultPluginManager(undefined);
      expect(manager.plugins.size).toBe(0);
    });
  });

  describe('use', () => {
    it('should add plugin to plugins map', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };

      pluginManager.use(mockPlugin);

      expect(pluginManager.plugins.size).toBe(1);
      expect(pluginManager.has('test-plugin')).toBe(true);
      expect(pluginManager.get('test-plugin')).toBe(mockPlugin);
    });

    it('should call install hook if plugin has one', () => {
      const installSpy = vi.fn();
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        install: installSpy,
      };

      pluginManager.use(mockPlugin);

      expect(installSpy).toHaveBeenCalledWith(mockClient);
    });

    it('should not call install hook if no client provided', () => {
      const installSpy = vi.fn();
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        install: installSpy,
      };

      const managerWithoutClient = new DefaultPluginManager();
      managerWithoutClient.use(mockPlugin);

      expect(installSpy).not.toHaveBeenCalled();
    });

    it('should not call install hook if plugin does not have one', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      expect(() => {
        pluginManager.use(mockPlugin);
      }).not.toThrow();
    });

    it('should throw error if plugin with same name already exists', () => {
      const mockPlugin1: XAdsPlugin = {
        name: 'test-plugin',
      };

      const mockPlugin2: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin1);

      expect(() => {
        pluginManager.use(mockPlugin2);
      }).toThrow("Plugin 'test-plugin' is already installed");
    });

    it('should handle async install hook', async () => {
      const installSpy = vi.fn().mockResolvedValue(undefined);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        install: installSpy,
      };

      pluginManager.use(mockPlugin);

      expect(installSpy).toHaveBeenCalledWith(mockClient);
    });
  });

  describe('remove', () => {
    it('should return false for non-existent plugin', () => {
      const result = pluginManager.remove('non-existent');
      expect(result).toBe(false);
    });

    it('should remove existing plugin and return true', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);
      expect(pluginManager.has('test-plugin')).toBe(true);

      const result = pluginManager.remove('test-plugin');

      expect(result).toBe(true);
      expect(pluginManager.has('test-plugin')).toBe(false);
    });

    it('should call uninstall hook if plugin has one', () => {
      const uninstallSpy = vi.fn();
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        uninstall: uninstallSpy,
      };

      pluginManager.use(mockPlugin);
      pluginManager.remove('test-plugin');

      expect(uninstallSpy).toHaveBeenCalledWith(mockClient);
    });

    it('should not call uninstall hook if no client provided', () => {
      const uninstallSpy = vi.fn();
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        uninstall: uninstallSpy,
      };

      const managerWithoutClient = new DefaultPluginManager();
      managerWithoutClient.use(mockPlugin);
      managerWithoutClient.remove('test-plugin');

      expect(uninstallSpy).not.toHaveBeenCalled();
    });

    it('should not call uninstall hook if plugin does not have one', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      expect(() => {
        pluginManager.remove('test-plugin');
      }).not.toThrow();
    });

    it('should handle async uninstall hook', async () => {
      const uninstallSpy = vi.fn().mockResolvedValue(undefined);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        uninstall: uninstallSpy,
      };

      pluginManager.use(mockPlugin);
      pluginManager.remove('test-plugin');

      expect(uninstallSpy).toHaveBeenCalledWith(mockClient);
    });
  });

  describe('has', () => {
    it('should return false for non-existent plugin', () => {
      expect(pluginManager.has('non-existent')).toBe(false);
    });

    it('should return true for existing plugin', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      expect(pluginManager.has('test-plugin')).toBe(true);
    });
  });

  describe('get', () => {
    it('should return undefined for non-existent plugin', () => {
      expect(pluginManager.get('non-existent')).toBeUndefined();
    });

    it('should return plugin for existing plugin', () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      expect(pluginManager.get('test-plugin')).toBe(mockPlugin);
    });
  });

  describe('executeBeforeRequest', () => {
    it('should return original config when no plugins', async () => {
      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(result).toBe(mockConfig);
    });

    it('should return original config when plugins have no beforeRequest hook', async () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(result).toBe(mockConfig);
    });

    it('should execute beforeRequest hook and return modified config', async () => {
      const modifiedConfig = {
        ...mockConfig,
        headers: { ...mockConfig.headers, Authorization: 'Bearer token' },
      };

      const beforeRequestSpy = vi.fn().mockResolvedValue(modifiedConfig);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        beforeRequest: beforeRequestSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(beforeRequestSpy).toHaveBeenCalledWith(mockConfig);
      expect(result).toBe(modifiedConfig);
    });

    it('should use original config when plugin returns undefined', async () => {
      const beforeRequestSpy = vi.fn().mockResolvedValue(undefined);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        beforeRequest: beforeRequestSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(beforeRequestSpy).toHaveBeenCalledWith(mockConfig);
      expect(result).toBe(mockConfig);
    });

    it('should execute multiple plugins in sequence', async () => {
      const config1 = { ...mockConfig, headers: { ...mockConfig.headers, 'X-Plugin-1': 'true' } };
      const config2 = { ...config1, headers: { ...config1.headers, 'X-Plugin-2': 'true' } };

      const beforeRequest1 = vi.fn().mockResolvedValue(config1);
      const beforeRequest2 = vi.fn().mockResolvedValue(config2);

      const plugin1: XAdsPlugin = { name: 'plugin-1', beforeRequest: beforeRequest1 };
      const plugin2: XAdsPlugin = { name: 'plugin-2', beforeRequest: beforeRequest2 };

      pluginManager.use(plugin1);
      pluginManager.use(plugin2);

      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(beforeRequest1).toHaveBeenCalledWith(mockConfig);
      expect(beforeRequest2).toHaveBeenCalledWith(config1);
      expect(result).toBe(config2);
    });

    it('should handle sync beforeRequest hooks', async () => {
      const modifiedConfig = {
        ...mockConfig,
        headers: { ...mockConfig.headers, 'X-Sync-Plugin': 'true' },
      };

      const beforeRequestSpy = vi.fn().mockReturnValue(modifiedConfig);
      const mockPlugin: XAdsPlugin = {
        name: 'sync-plugin',
        beforeRequest: beforeRequestSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeBeforeRequest(mockConfig);

      expect(beforeRequestSpy).toHaveBeenCalledWith(mockConfig);
      expect(result).toBe(modifiedConfig);
    });
  });

  describe('executeAfterResponse', () => {
    it('should return original response when no plugins', async () => {
      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(result).toBe(mockResponse);
    });

    it('should return original response when plugins have no afterResponse hook', async () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(result).toBe(mockResponse);
    });

    it('should execute afterResponse hook and return modified response', async () => {
      const modifiedResponse = {
        ...mockResponse,
        headers: { ...mockResponse.headers, 'X-Plugin-Processed': 'true' },
      };

      const afterResponseSpy = vi.fn().mockResolvedValue(modifiedResponse);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        afterResponse: afterResponseSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(afterResponseSpy).toHaveBeenCalledWith(mockResponse, mockConfig);
      expect(result).toBe(modifiedResponse);
    });

    it('should use original response when plugin returns undefined', async () => {
      const afterResponseSpy = vi.fn().mockResolvedValue(undefined);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        afterResponse: afterResponseSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(afterResponseSpy).toHaveBeenCalledWith(mockResponse, mockConfig);
      expect(result).toBe(mockResponse);
    });

    it('should execute multiple plugins in sequence', async () => {
      const response1 = {
        ...mockResponse,
        headers: { ...mockResponse.headers, 'X-Plugin-1': 'true' },
      };
      const response2 = { ...response1, headers: { ...response1.headers, 'X-Plugin-2': 'true' } };

      const afterResponse1 = vi.fn().mockResolvedValue(response1);
      const afterResponse2 = vi.fn().mockResolvedValue(response2);

      const plugin1: XAdsPlugin = { name: 'plugin-1', afterResponse: afterResponse1 };
      const plugin2: XAdsPlugin = { name: 'plugin-2', afterResponse: afterResponse2 };

      pluginManager.use(plugin1);
      pluginManager.use(plugin2);

      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(afterResponse1).toHaveBeenCalledWith(mockResponse, mockConfig);
      expect(afterResponse2).toHaveBeenCalledWith(response1, mockConfig);
      expect(result).toBe(response2);
    });

    it('should handle sync afterResponse hooks', async () => {
      const modifiedResponse = {
        ...mockResponse,
        headers: { ...mockResponse.headers, 'X-Sync-Plugin': 'true' },
      };

      const afterResponseSpy = vi.fn().mockReturnValue(modifiedResponse);
      const mockPlugin: XAdsPlugin = {
        name: 'sync-plugin',
        afterResponse: afterResponseSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(afterResponseSpy).toHaveBeenCalledWith(mockResponse, mockConfig);
      expect(result).toBe(modifiedResponse);
    });
  });

  describe('executeOnError', () => {
    const mockError = new Error('Test error');

    it('should throw error when no plugins', async () => {
      await expect(pluginManager.executeOnError(mockError, mockConfig)).rejects.toThrow(mockError);
    });

    it('should throw error when plugins have no onError hook', async () => {
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
      };

      pluginManager.use(mockPlugin);

      await expect(pluginManager.executeOnError(mockError, mockConfig)).rejects.toThrow(mockError);
    });

    it('should throw error when all plugins return undefined', async () => {
      const onErrorSpy = vi.fn().mockResolvedValue(undefined);
      const mockPlugin: XAdsPlugin = {
        name: 'test-plugin',
        onError: onErrorSpy,
      };

      pluginManager.use(mockPlugin);

      await expect(pluginManager.executeOnError(mockError, mockConfig)).rejects.toThrow(mockError);
      expect(onErrorSpy).toHaveBeenCalledWith(mockError, mockConfig);
    });

    it('should return response when plugin handles error', async () => {
      const errorResponse: PluginResponse = {
        data: { error: 'handled' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
      };

      const onErrorSpy = vi.fn().mockResolvedValue(errorResponse);
      const mockPlugin: XAdsPlugin = {
        name: 'error-handler',
        onError: onErrorSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeOnError(mockError, mockConfig);

      expect(onErrorSpy).toHaveBeenCalledWith(mockError, mockConfig);
      expect(result).toBe(errorResponse);
    });

    it('should return response from first plugin that handles error', async () => {
      const errorResponse: PluginResponse = {
        data: { error: 'handled by plugin 1' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
      };

      const onError1 = vi.fn().mockResolvedValue(errorResponse);
      const onError2 = vi.fn().mockResolvedValue({
        data: { error: 'handled by plugin 2' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
      });

      const plugin1: XAdsPlugin = { name: 'plugin-1', onError: onError1 };
      const plugin2: XAdsPlugin = { name: 'plugin-2', onError: onError2 };

      pluginManager.use(plugin1);
      pluginManager.use(plugin2);

      const result = await pluginManager.executeOnError(mockError, mockConfig);

      expect(onError1).toHaveBeenCalledWith(mockError, mockConfig);
      expect(onError2).not.toHaveBeenCalled();
      expect(result).toBe(errorResponse);
    });

    it('should continue to next plugin if first plugin returns undefined', async () => {
      const errorResponse: PluginResponse = {
        data: { error: 'handled by plugin 2' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
      };

      const onError1 = vi.fn().mockResolvedValue(undefined);
      const onError2 = vi.fn().mockResolvedValue(errorResponse);

      const plugin1: XAdsPlugin = { name: 'plugin-1', onError: onError1 };
      const plugin2: XAdsPlugin = { name: 'plugin-2', onError: onError2 };

      pluginManager.use(plugin1);
      pluginManager.use(plugin2);

      const result = await pluginManager.executeOnError(mockError, mockConfig);

      expect(onError1).toHaveBeenCalledWith(mockError, mockConfig);
      expect(onError2).toHaveBeenCalledWith(mockError, mockConfig);
      expect(result).toBe(errorResponse);
    });

    it('should handle sync onError hooks', async () => {
      const errorResponse: PluginResponse = {
        data: { error: 'handled synchronously' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
      };

      const onErrorSpy = vi.fn().mockReturnValue(errorResponse);
      const mockPlugin: XAdsPlugin = {
        name: 'sync-error-handler',
        onError: onErrorSpy,
      };

      pluginManager.use(mockPlugin);

      const result = await pluginManager.executeOnError(mockError, mockConfig);

      expect(onErrorSpy).toHaveBeenCalledWith(mockError, mockConfig);
      expect(result).toBe(errorResponse);
    });
  });

  describe('integration tests', () => {
    it('should handle complex plugin interactions', async () => {
      const authPlugin: XAdsPlugin = {
        name: 'auth-plugin',
        beforeRequest: (config) => ({
          ...config,
          headers: { ...config.headers, Authorization: 'Bearer token' },
        }),
      };

      const loggingPlugin: XAdsPlugin = {
        name: 'logging-plugin',
        afterResponse: (response, _config) => ({
          ...response,
          headers: { ...response.headers, 'X-Request-Logged': 'true' },
        }),
      };

      const errorHandlerPlugin: XAdsPlugin = {
        name: 'error-handler-plugin',
        onError: () => ({
          data: { error: 'handled by error handler' },
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
        }),
      };

      pluginManager.use(authPlugin);
      pluginManager.use(loggingPlugin);
      pluginManager.use(errorHandlerPlugin);

      // Test beforeRequest
      const modifiedConfig = await pluginManager.executeBeforeRequest(mockConfig);
      expect(modifiedConfig.headers?.Authorization).toBe('Bearer token');

      // Test afterResponse
      const modifiedResponse = await pluginManager.executeAfterResponse(mockResponse, mockConfig);
      expect(modifiedResponse.headers['X-Request-Logged']).toBe('true');

      // Test onError
      const errorResult = await pluginManager.executeOnError(new Error('test'), mockConfig);
      expect(errorResult.data).toEqual({ error: 'handled by error handler' });
    });

    it('should maintain plugin order during execution', async () => {
      const order: string[] = [];

      const plugin1: XAdsPlugin = {
        name: 'plugin-1',
        beforeRequest: (config) => {
          order.push('plugin-1-before');
          return config;
        },
        afterResponse: (response, _config) => {
          order.push('plugin-1-after');
          return response;
        },
      };

      const plugin2: XAdsPlugin = {
        name: 'plugin-2',
        beforeRequest: (config) => {
          order.push('plugin-2-before');
          return config;
        },
        afterResponse: (response, _config) => {
          order.push('plugin-2-after');
          return response;
        },
      };

      pluginManager.use(plugin1);
      pluginManager.use(plugin2);

      await pluginManager.executeBeforeRequest(mockConfig);
      await pluginManager.executeAfterResponse(mockResponse, mockConfig);

      expect(order).toEqual([
        'plugin-1-before',
        'plugin-2-before',
        'plugin-1-after',
        'plugin-2-after',
      ]);
    });
  });
});
