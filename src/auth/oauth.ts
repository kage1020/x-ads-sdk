import type { OAuthCredentials, RequestOptions } from '../types';

interface OAuthParams {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: string;
  oauth_signature: string;
}

export class OAuthService {
  private credentials: OAuthCredentials;

  constructor(credentials: OAuthCredentials) {
    this.credentials = credentials;
  }

  public async signRequest(requestOptions: RequestOptions): Promise<RequestOptions> {
    const authHeader = await this.getAuthorizationHeader(requestOptions);

    return {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: authHeader,
      },
    };
  }

  public async getAuthorizationHeader(requestOptions: RequestOptions): Promise<string> {
    const oauthParams: Omit<OAuthParams, 'oauth_signature'> = {
      oauth_consumer_key: this.credentials.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_token: this.credentials.accessToken,
      oauth_version: '1.0',
    };

    const signature = await this.generateSignature(requestOptions.method, requestOptions.url, {
      ...oauthParams,
      ...(requestOptions.params || {}),
    });

    const fullOAuthParams: OAuthParams = {
      ...oauthParams,
      oauth_signature: signature,
    };

    return this.buildAuthorizationHeader(fullOAuthParams);
  }

  public validateCredentials(): void {
    if (!this.credentials.consumerKey) {
      throw new Error('Consumer key is required');
    }
    if (!this.credentials.consumerSecret) {
      throw new Error('Consumer secret is required');
    }
    if (!this.credentials.accessToken) {
      throw new Error('Access token is required');
    }
    if (!this.credentials.accessTokenSecret) {
      throw new Error('Access token secret is required');
    }

    if (!/^[a-zA-Z0-9\-_]+$/.test(this.credentials.accessToken)) {
      throw new Error('Invalid token format');
    }
  }

  public updateCredentials(newCredentials: OAuthCredentials): void {
    this.credentials = newCredentials;
  }

  private generateNonce(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  private percentEncode(value: string): string {
    return encodeURIComponent(value).replace(
      /[!'()*]/g,
      (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
    );
  }

  private buildAuthorizationHeader(oauthParams: OAuthParams): string {
    const headerParams = Object.entries(oauthParams)
      .map(([key, value]) => `${key}="${this.percentEncode(value)}"`)
      .join(', ');

    return `OAuth ${headerParams}`;
  }

  private async generateSignature(
    method: string,
    url: string,
    params: Record<string, unknown>
  ): Promise<string> {
    const normalizedParams = this.normalizeParams(params);
    const baseString = this.createSignatureBaseString(method, url, normalizedParams);
    const signingKey = this.createSigningKey();

    return this.hmacSha1(baseString, signingKey);
  }

  private normalizeParams(params: Record<string, unknown>): string {
    const encodedParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [this.percentEncode(key), this.percentEncode(String(value))])
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return encodedParams;
  }

  private createSignatureBaseString(method: string, url: string, normalizedParams: string): string {
    const baseUrl = url.split('?')[0];
    return [
      method.toUpperCase(),
      this.percentEncode(baseUrl),
      this.percentEncode(normalizedParams),
    ].join('&');
  }

  private createSigningKey(): string {
    return [
      this.percentEncode(this.credentials.consumerSecret),
      this.percentEncode(this.credentials.accessTokenSecret),
    ].join('&');
  }

  private async hmacSha1(data: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const dataToSign = encoder.encode(data);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataToSign);

    // Convert to base64
    const signatureArray = new Uint8Array(signature);
    let binary = '';
    for (let i = 0; i < signatureArray.byteLength; i++) {
      binary += String.fromCharCode(signatureArray[i]);
    }
    return btoa(binary);
  }
}
