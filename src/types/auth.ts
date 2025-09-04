export interface OAuthCredentials {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

export interface SDKConfig {
  credentials: OAuthCredentials;
  environment: 'sandbox' | 'production';
  timeout?: number;
  rateLimitBuffer?: number;
  debug?: boolean;
}

export interface OAuthSignature {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: string;
  oauth_signature: string;
}

export interface AuthenticationContext {
  credentials: OAuthCredentials;
  environment: 'sandbox' | 'production';
  baseUrl: string;
  debug: boolean;
}

export const ENVIRONMENTS = {
  sandbox: 'https://ads-api-sandbox.twitter.com/12',
  production: 'https://ads-api.twitter.com/12',
} as const;

export type Environment = keyof typeof ENVIRONMENTS;
