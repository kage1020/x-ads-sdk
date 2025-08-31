// Plugin type definitions
export interface PluginRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: unknown;
}

export interface PluginResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface PluginClient {
  // Basic client interface that plugins can interact with
  readonly config: {
    baseURL?: string;
    timeout?: number;
    maxRetries?: number;
  };
}

export interface XAdsPlugin {
  name: string;
  version?: string;

  // Lifecycle hooks
  beforeRequest?(
    config: PluginRequestConfig
  ): Promise<PluginRequestConfig | undefined> | PluginRequestConfig | undefined;
  afterResponse?(
    response: PluginResponse,
    config: PluginRequestConfig
  ): Promise<PluginResponse | undefined> | PluginResponse | undefined;
  onError?(
    error: Error,
    config: PluginRequestConfig
  ): Promise<PluginResponse | undefined> | PluginResponse | undefined;

  // Plugin initialization
  install?(client: PluginClient): Promise<void> | void;
  uninstall?(client: PluginClient): Promise<void> | void;
}

export interface PluginManager {
  plugins: Map<string, XAdsPlugin>;

  use(plugin: XAdsPlugin): void;
  remove(pluginName: string): boolean;
  has(pluginName: string): boolean;
  get(pluginName: string): XAdsPlugin | undefined;

  // Hooks execution
  executeBeforeRequest(config: PluginRequestConfig): Promise<PluginRequestConfig>;
  executeAfterResponse(
    response: PluginResponse,
    config: PluginRequestConfig
  ): Promise<PluginResponse>;
  executeOnError(error: Error, config: PluginRequestConfig): Promise<PluginResponse>;
}

export class DefaultPluginManager implements PluginManager {
  public plugins = new Map<string, XAdsPlugin>();

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
