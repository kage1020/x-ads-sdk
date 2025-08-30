export interface AuthConfig {
  consumer_key: string;
  consumer_secret: string;
  access_token: string;
  access_token_secret: string;
  sandbox?: boolean;
}

export interface OAuthSignature {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: string;
}

export interface RequestOptions {
  method: string;
  url: string;
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}