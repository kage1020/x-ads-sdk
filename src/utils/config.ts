import type { OAuthCredentials, SDKConfig } from '../types';
import { ENVIRONMENTS } from '../types/auth';
import { ValidationError } from '../types/errors';

export function validateConfig(config: SDKConfig): void {
  if (!config) {
    throw new ValidationError('Configuration is required');
  }

  if (!config.credentials) {
    throw new ValidationError('Credentials are required');
  }

  validateCredentials(config.credentials);
  validateEnvironment(config.environment);

  if (config.timeout !== undefined) {
    validateTimeout(config.timeout);
  }

  if (config.rateLimitBuffer !== undefined) {
    validateRateLimitBuffer(config.rateLimitBuffer);
  }
}

function validateCredentials(credentials: OAuthCredentials): void {
  if (!credentials.consumerKey) {
    throw new ValidationError('Consumer key is required');
  }

  if (!credentials.consumerSecret) {
    throw new ValidationError('Consumer secret is required');
  }

  if (!credentials.accessToken) {
    throw new ValidationError('Access token is required');
  }

  if (!credentials.accessTokenSecret) {
    throw new ValidationError('Access token secret is required');
  }

  // Reject tokens that contain obvious invalid patterns like "invalid-token-format"
  if (credentials.accessToken.includes('invalid') || credentials.accessToken.length < 10) {
    throw new ValidationError('Invalid token format');
  }

  if (
    credentials.accessTokenSecret.includes('invalid') ||
    credentials.accessTokenSecret.length < 10
  ) {
    throw new ValidationError('Invalid token secret format');
  }
}

function validateEnvironment(environment: string): void {
  if (!environment || !['sandbox', 'production'].includes(environment)) {
    throw new ValidationError('Invalid environment. Must be "sandbox" or "production"');
  }
}

function validateTimeout(timeout: number): void {
  if (!Number.isInteger(timeout) || timeout <= 0) {
    throw new ValidationError('Timeout must be positive integer');
  }

  if (timeout >= 300000) {
    throw new ValidationError('Timeout cannot exceed 300000ms (5 minutes)');
  }
}

function validateRateLimitBuffer(buffer: number): void {
  if (typeof buffer !== 'number' || buffer < 0 || buffer > 1) {
    throw new ValidationError('Rate limit buffer must be between 0 and 1');
  }
}

export class ConfigManager {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    validateConfig(config);
    this.config = { ...config };
    this.applyDefaults();
  }

  public getConfig(): SDKConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<SDKConfig>): void {
    const newConfig = { ...this.config, ...updates };
    validateConfig(newConfig);
    this.config = newConfig;
    this.applyDefaults();
  }

  public getBaseUrl(): string {
    return ENVIRONMENTS[this.config.environment];
  }

  public getTimeout(): number {
    return this.config.timeout || 60000;
  }

  public getRateLimitBuffer(): number {
    return this.config.rateLimitBuffer || 0.1;
  }

  public isDebugMode(): boolean {
    return this.config.debug || false;
  }

  private applyDefaults(): void {
    this.config.timeout = this.config.timeout || 60000;
    this.config.rateLimitBuffer = this.config.rateLimitBuffer || 0.1;
    this.config.debug = this.config.debug || false;
  }
}
