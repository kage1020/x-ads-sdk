export interface XAdsPlugin {
  name: string;
  version?: string;
  
  // Lifecycle hooks
  beforeRequest?(config: any): Promise<any> | any;
  afterResponse?(response: any, config: any): Promise<any> | any;
  onError?(error: any, config: any): Promise<any> | any;
  
  // Plugin initialization
  install?(client: any): Promise<void> | void;
  uninstall?(client: any): Promise<void> | void;
}

export interface PluginManager {
  plugins: Map<string, XAdsPlugin>;
  
  use(plugin: XAdsPlugin): void;
  remove(pluginName: string): boolean;
  has(pluginName: string): boolean;
  get(pluginName: string): XAdsPlugin | undefined;
  
  // Hooks execution
  executeBeforeRequest(config: any): Promise<any>;
  executeAfterResponse(response: any, config: any): Promise<any>;
  executeOnError(error: any, config: any): Promise<any>;
}

export class DefaultPluginManager implements PluginManager {
  public plugins = new Map<string, XAdsPlugin>();
  
  constructor(private client?: any) {}

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

  async executeBeforeRequest(config: any): Promise<any> {
    let modifiedConfig = config;
    
    for (const plugin of this.plugins.values()) {
      if (plugin.beforeRequest) {
        modifiedConfig = await plugin.beforeRequest(modifiedConfig) || modifiedConfig;
      }
    }
    
    return modifiedConfig;
  }

  async executeAfterResponse(response: any, config: any): Promise<any> {
    let modifiedResponse = response;
    
    for (const plugin of this.plugins.values()) {
      if (plugin.afterResponse) {
        modifiedResponse = await plugin.afterResponse(modifiedResponse, config) || modifiedResponse;
      }
    }
    
    return modifiedResponse;
  }

  async executeOnError(error: any, config: any): Promise<any> {
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