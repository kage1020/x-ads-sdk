import { OAuthService } from '../auth/oauth';
import {
  AccountsClient,
  AnalyticsClient,
  CampaignsClient,
  FundingInstrumentsClient,
  LineItemsClient,
  MediaClient,
  TargetingClient,
} from '../resources';
import type { AuthenticationContext, Environment, SDKConfig } from '../types';
import { ENVIRONMENTS } from '../types/auth';
import { ConfigManager } from '../utils/config';
import { HttpClient } from './http-client';
import { RateLimiter } from './rate-limiter';

export class XAdsClient {
  private configManager: ConfigManager;
  private authService: OAuthService;
  private rateLimiter: RateLimiter;
  private httpClient: HttpClient;

  public readonly campaigns: CampaignsClient;
  public readonly lineItems: LineItemsClient;
  public readonly analytics: AnalyticsClient;
  public readonly accounts: AccountsClient;
  public readonly fundingInstruments: FundingInstrumentsClient;
  public readonly media: MediaClient;
  public readonly targeting: TargetingClient;

  constructor(config: SDKConfig) {
    this.configManager = new ConfigManager(config);

    const validatedConfig = this.configManager.getConfig();

    this.authService = new OAuthService(validatedConfig.credentials);
    this.authService.validateCredentials();

    this.rateLimiter = new RateLimiter();
    this.rateLimiter.setBuffer(this.configManager.getRateLimitBuffer());

    const context: AuthenticationContext = {
      credentials: validatedConfig.credentials,
      environment: validatedConfig.environment,
      baseUrl: this.configManager.getBaseUrl(),
      debug: this.configManager.isDebugMode(),
    };

    this.httpClient = new HttpClient(
      this.authService,
      this.rateLimiter,
      context,
      this.configManager.getTimeout()
    );

    this.campaigns = new CampaignsClient(this.httpClient, context);
    this.lineItems = new LineItemsClient(this.httpClient, context);
    this.analytics = new AnalyticsClient(this.httpClient, context);
    this.accounts = new AccountsClient(this.httpClient, context);
    this.fundingInstruments = new FundingInstrumentsClient(this.httpClient, context);
    this.media = new MediaClient(this.httpClient, context);
    this.targeting = new TargetingClient(this.httpClient, context);
  }

  public setEnvironment(environment: Environment): void {
    const currentConfig = this.configManager.getConfig();
    this.configManager.updateConfig({ ...currentConfig, environment });

    const context: AuthenticationContext = {
      credentials: currentConfig.credentials,
      environment,
      baseUrl: ENVIRONMENTS[environment],
      debug: this.configManager.isDebugMode(),
    };

    this.httpClient.updateContext(context);
  }

  public setDebug(debug: boolean): void {
    const currentConfig = this.configManager.getConfig();
    this.configManager.updateConfig({ ...currentConfig, debug });

    const context: AuthenticationContext = {
      credentials: currentConfig.credentials,
      environment: currentConfig.environment,
      baseUrl: this.configManager.getBaseUrl(),
      debug,
    };

    this.httpClient.updateContext(context);
  }

  public setTimeout(timeout: number): void {
    const currentConfig = this.configManager.getConfig();
    this.configManager.updateConfig({ ...currentConfig, timeout });
    this.httpClient.updateTimeout(timeout);
  }

  public getRateLimitStatus() {
    return this.rateLimiter.getStatus();
  }

  public resetRateLimit(): void {
    this.rateLimiter.reset();
  }
}
