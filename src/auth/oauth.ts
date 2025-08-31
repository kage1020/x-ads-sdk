import { AuthenticationError } from '../errors';
import type { AuthConfig, OAuthSignature, RequestOptions } from '../types/auth';
import { hmac, randomHex } from '../utils/crypto';

export class OAuth {
  private consumer_key: string;
  private consumer_secret: string;
  private access_token: string;
  private access_token_secret: string;
  private signature_method: 'HMAC-SHA1' | 'HMAC-SHA256';

  constructor(config: AuthConfig) {
    this.consumer_key = config.consumer_key;
    this.consumer_secret = config.consumer_secret;
    this.access_token = config.access_token;
    this.access_token_secret = config.access_token_secret;
    // Default to HMAC-SHA1 for OAuth 1.0a compatibility as per RFC 5849
    this.signature_method = config.signature_method || 'HMAC-SHA1';

    this.validateConfig();
  }

  private validateConfig(): void {
    const required = ['consumer_key', 'consumer_secret', 'access_token', 'access_token_secret'];
    const missing = required.filter((key) => !this[key as keyof OAuth]);

    if (missing.length > 0) {
      throw new AuthenticationError(`Missing required OAuth parameters: ${missing.join(', ')}`);
    }
  }

  async generateNonce(): Promise<string> {
    return randomHex(32);
  }

  generateTimestamp(): string {
    return Math.floor(Date.now() / 1000).toString();
  }

  percentEncode(str: string): string {
    return encodeURIComponent(str).replace(
      /[!'()*]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
    );
  }

  async generateSignature(
    httpMethod: string,
    baseURL: string,
    parameters: Record<string, string>
  ): Promise<string> {
    const sortedParams = Object.keys(parameters)
      .sort()
      .map((key) => `${this.percentEncode(key)}=${this.percentEncode(parameters[key])}`)
      .join('&');

    const signatureBaseString = [
      httpMethod.toUpperCase(),
      this.percentEncode(baseURL),
      this.percentEncode(sortedParams),
    ].join('&');

    const signingKey = [
      this.percentEncode(this.consumer_secret),
      this.percentEncode(this.access_token_secret),
    ].join('&');

    const algorithm = this.signature_method === 'HMAC-SHA256' ? 'SHA-256' : 'SHA-1';
    return hmac(algorithm, signingKey, signatureBaseString);
  }

  async generateOAuthSignature(options: RequestOptions): Promise<OAuthSignature> {
    const nonce = await this.generateNonce();
    const timestamp = this.generateTimestamp();

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: this.consumer_key,
      oauth_nonce: nonce,
      oauth_signature_method: this.signature_method,
      oauth_timestamp: timestamp,
      oauth_token: this.access_token,
      oauth_version: '1.0',
    };

    // Combine OAuth params with request params for signature generation
    const allParams = { ...oauthParams };
    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        allParams[key] = String(options.params?.[key]);
      });
    }

    const signature = await this.generateSignature(options.method, options.url, allParams);

    return {
      oauth_consumer_key: this.consumer_key,
      oauth_nonce: nonce,
      oauth_signature: signature,
      oauth_signature_method: this.signature_method,
      oauth_timestamp: timestamp,
      oauth_token: this.access_token,
      oauth_version: '1.0',
    };
  }

  generateAuthorizationHeader(signature: OAuthSignature): string {
    const authParams = Object.keys(signature)
      .sort()
      .map((key) => `${key}="${this.percentEncode(signature[key as keyof OAuthSignature])}"`)
      .join(', ');

    return `OAuth ${authParams}`;
  }

  async signRequest(options: RequestOptions): Promise<RequestOptions> {
    const signature = await this.generateOAuthSignature(options);
    const authHeader = this.generateAuthorizationHeader(signature);

    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: authHeader,
      },
    };
  }
}
