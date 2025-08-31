export interface AuthConfig {
  consumer_key: string;
  consumer_secret: string;
  access_token: string;
  access_token_secret: string;
  sandbox?: boolean;
  /**
   * @default 'HMAC-SHA1' - Required by OAuth 1.0a specification for maximum compatibility
   *
   * OAuth signature method to use for request signing.
   * This is for OAuth signature generation, not password hashing.
   * HMAC-SHA1 is the standard OAuth 1.0a signature method as defined in RFC 5849.
   */
  signature_method?: 'HMAC-SHA1' | 'HMAC-SHA256';
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
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
}
