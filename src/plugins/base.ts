/**
 * Configuration object for plugin requests
 *
 * This interface defines the structure of HTTP request configuration
 * that plugins can modify during the beforeRequest hook.
 *
 * @category Plugin
 */
export interface PluginRequestConfig {
  /** HTTP method for the request */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Full URL for the request */
  url: string;
  /** Optional HTTP headers */
  headers?: Record<string, string>;
  /** Optional query parameters or request parameters */
  params?: Record<string, unknown>;
  /** Optional request body data */
  body?: unknown;
}

/**
 * Response object for plugin interactions
 *
 * This interface defines the structure of HTTP response data
 * that plugins can access and modify during afterResponse hook.
 *
 * @template T - Type of response data
 * @category Plugin
 */
export interface PluginResponse<T = unknown> {
  /** Response data payload */
  data: T;
  /** HTTP status code */
  status: number;
  /** HTTP status text */
  statusText: string;
  /** Response headers */
  headers: Record<string, string>;
}

/**
 * Basic client interface that plugins can interact with
 *
 * This interface provides plugins with access to basic client
 * configuration without exposing internal implementation details.
 *
 * @category Plugin
 */
export interface PluginClient {
  /** Read-only client configuration */
  readonly config: {
    /** Base URL for API requests */
    baseURL?: string;
    /** Request timeout in milliseconds */
    timeout?: number;
    /** Maximum number of retry attempts */
    maxRetries?: number;
  };
}

/**
 * X Ads SDK Plugin Interface
 *
 * Plugins can hook into the request/response lifecycle to modify behavior,
 * add functionality, or handle errors. All hooks are optional.
 *
 * @category Plugin
 */
export interface XAdsPlugin {
  /** Unique plugin name */
  name: string;
  /** Plugin version */
  version?: string;

  /**
   * Hook called before making a request
   * @param config - Request configuration to potentially modify
   * @returns Modified config or undefined to use original
   */
  beforeRequest?(
    config: PluginRequestConfig
  ): Promise<PluginRequestConfig | undefined> | PluginRequestConfig | undefined;

  /**
   * Hook called after receiving a response
   * @param response - Response to potentially modify
   * @param config - Original request configuration
   * @returns Modified response or undefined to use original
   */
  afterResponse?(
    response: PluginResponse,
    config: PluginRequestConfig
  ): Promise<PluginResponse | undefined> | PluginResponse | undefined;

  /**
   * Hook called when an error occurs
   * @param error - The error that occurred
   * @param config - Original request configuration
   * @returns Response to use instead of error, or undefined to propagate error
   */
  onError?(
    error: Error,
    config: PluginRequestConfig
  ): Promise<PluginResponse | undefined> | PluginResponse | undefined;

  /**
   * Called when plugin is installed
   * @param client - Client instance for plugin initialization
   */
  install?(client: PluginClient): Promise<void> | void;

  /**
   * Called when plugin is uninstalled
   * @param client - Client instance for plugin cleanup
   */
  uninstall?(client: PluginClient): Promise<void> | void;
}

/**
 * Plugin Manager Interface
 *
 * Manages plugin lifecycle and executes plugin hooks during HTTP operations.
 *
 * @category Plugin
 */
export interface PluginManager {
  /** Map of installed plugins by name */
  plugins: Map<string, XAdsPlugin>;

  /** Install a plugin */
  use(plugin: XAdsPlugin): void;
  /** Remove a plugin by name */
  remove(pluginName: string): boolean;
  /** Check if a plugin is installed */
  has(pluginName: string): boolean;
  /** Get a plugin by name */
  get(pluginName: string): XAdsPlugin | undefined;

  /** Execute beforeRequest hooks for all plugins */
  executeBeforeRequest(config: PluginRequestConfig): Promise<PluginRequestConfig>;
  /** Execute afterResponse hooks for all plugins */
  executeAfterResponse(
    response: PluginResponse,
    config: PluginRequestConfig
  ): Promise<PluginResponse>;
  /** Execute onError hooks for all plugins */
  executeOnError(error: Error, config: PluginRequestConfig): Promise<PluginResponse>;
}

/**
 * Default implementation of PluginManager
 *
 * Handles plugin installation, removal, and execution of plugin hooks.
 *
 * @category Plugin
 */
export class DefaultPluginManager implements PluginManager {
  /** Map of installed plugins */
  public plugins = new Map<string, XAdsPlugin>();

  /**
   * Create a new plugin manager
   * @param client - Optional client instance for plugin hooks
   */
  constructor(private client?: PluginClient) {}

  use(plugin: XAdsPlugin): void {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' is already installed`);
    }

    this.plugins.set(plugin.name, plugin);

    // Execute install hook
    if (plugin.install && this.client) {
      plugin.install(this.client);
    }
  }

  remove(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      return false;
    }

    // Execute uninstall hook
    if (plugin.uninstall && this.client) {
      plugin.uninstall(this.client);
    }

    return this.plugins.delete(pluginName);
  }

  has(pluginName: string): boolean {
    return this.plugins.has(pluginName);
  }

  get(pluginName: string): XAdsPlugin | undefined {
    return this.plugins.get(pluginName);
  }

  async executeBeforeRequest(config: PluginRequestConfig): Promise<PluginRequestConfig> {
    let modifiedConfig = config;

    for (const plugin of this.plugins.values()) {
      if (plugin.beforeRequest) {
        const result = await plugin.beforeRequest(modifiedConfig);
        modifiedConfig = result || modifiedConfig;
      }
    }

    return modifiedConfig;
  }

  async executeAfterResponse(
    response: PluginResponse,
    config: PluginRequestConfig
  ): Promise<PluginResponse> {
    let modifiedResponse = response;

    for (const plugin of this.plugins.values()) {
      if (plugin.afterResponse) {
        const result = await plugin.afterResponse(modifiedResponse, config);
        modifiedResponse = result || modifiedResponse;
      }
    }

    return modifiedResponse;
  }

  async executeOnError(error: Error, config: PluginRequestConfig): Promise<PluginResponse> {
    for (const plugin of this.plugins.values()) {
      if (plugin.onError) {
        const result = await plugin.onError(error, config);
        if (result) {
          return result; // Plugin handled the error
        }
      }
    }

    throw error; // No plugin handled the error
  }
}
