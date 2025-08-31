# Migration Guide

## Migrating from other X API SDKs

### From node-twitter-api-v2

```typescript
// Old way (node-twitter-api-v2)
import { TwitterApi } from 'node-twitter-api-v2';

const client = new TwitterApi({
  appKey: 'consumer_key',
  appSecret: 'consumer_secret',
  accessToken: 'access_token',
  accessSecret: 'access_token_secret'
});

// New way (x-ads-sdk)
import { XAdsClient, Environment } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: {
    consumer_key: 'consumer_key',
    consumer_secret: 'consumer_secret',
    access_token: 'access_token',
    access_token_secret: 'access_token_secret'
  },
  environment: Environment.SANDBOX
});
```

### API Version Management

This SDK provides built-in API version management:

```typescript
// Explicit version control
const client = new XAdsClient({
  auth: { ... },
  apiVersion: APIVersion.V12,
  autoUpgradeVersion: false
});

// Check for version warnings
const versionInfo = client.getVersionInfo();
if (versionInfo.warnings.length > 0) {
  console.warn('API Version warnings:', versionInfo.warnings);
}
```

### Enhanced Error Handling

```typescript
import { isAPIError, isRateLimitError, isTimeoutError } from 'x-ads-sdk';

try {
  await client.campaigns.list(accountId);
} catch (error) {
  if (isAPIError(error)) {
    console.log('API Error:', error.statusCode, error.message);
    console.log('Retryable:', error.isRetryable());
  } else if (isRateLimitError(error)) {
    console.log('Rate limited until:', error.resetTime);
  } else if (isTimeoutError(error)) {
    console.log('Request timed out after:', error.timeoutMs, 'ms');
  }
}
```

Generated on 2025-08-31T04:50:49.781Z
