/**
 * Plugin system utility functions
 */

import type { RequestConfig } from '../client/base.js';
import type { PluginRequestConfig, PluginResponse } from '../plugins/base.js';
import { buildURL, extractEndpointFromUrl } from './http.js';

/**
 * Convert RequestConfig to PluginRequestConfig
 * @param config - Internal request configuration
 * @param baseURL - Base URL for the API
 * @param versionPath - API version path to prepend
 * @returns Plugin-compatible request configuration
 */
export function toPluginConfig(
  config: RequestConfig,
  baseURL: string,
  versionPath: string
): PluginRequestConfig {
  const versionedEndpoint = `${versionPath}${config.endpoint}`;
  const url = buildURL(
    baseURL,
    versionedEndpoint,
    config.method === 'GET' ? config.params : undefined
  );

  return {
    method: config.method,
    url,
    params: config.params,
    body: config.body,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'x-ads-sdk/1.0.0',
      ...config.headers,
    },
  };
}

/**
 * Convert PluginRequestConfig back to RequestConfig
 * @param pluginConfig - Plugin request configuration
 * @param versionPath - API version path to remove
 * @returns Internal request configuration
 */
export function fromPluginConfig(
  pluginConfig: PluginRequestConfig,
  versionPath: string
): RequestConfig {
  const endpoint = extractEndpointFromUrl(pluginConfig.url, versionPath);

  return {
    method: pluginConfig.method,
    endpoint,
    params: pluginConfig.params as Record<string, unknown>,
    body: pluginConfig.body,
    headers: pluginConfig.headers,
  };
}

/**
 * Convert response data to PluginResponse format
 * @param data - Response data
 * @param status - HTTP status code (default: 200)
 * @param statusText - HTTP status text (default: 'OK')
 * @param headers - Response headers (default: {})
 * @returns Plugin-compatible response
 */
export function toPluginResponse<T>(
  data: T,
  status = 200,
  statusText = 'OK',
  headers: Record<string, string> = {}
): PluginResponse<T> {
  return {
    data,
    status,
    statusText,
    headers,
  };
}
