# X Ads SDK Architecture

This document describes the updated architecture of the X Ads SDK that aligns with the official X Ads API hierarchy and best practices.

## Architecture Overview

The SDK is designed to mirror the X Ads API hierarchy:

```
X Ads SDK
├── Accounts (Global)
└── Account-Scoped Resources
    ├── Campaigns
    ├── Line Items (Ad Groups)
    ├── Funding Instruments
    ├── Account Media
    ├── Cards
    └── Tailored Audiences
```

## Key Components

### 1. Core Client (`XAdsSDK`)

The main SDK client that provides:
- OAuth 1.0a authentication
- Global account management
- Account-scoped resource access
- API version management
- Rate limiting and retry logic
- Plugin system

### 2. Resource Hierarchy

#### Global Resources
- **Accounts**: Top-level account management

#### Account-Scoped Resources
- **Campaigns**: Campaign management within an account
- **Line Items**: Ad group/line item management
- **Funding Instruments**: Payment method management
- **Media Library**: Asset management
- **Cards**: Rich media card management
- **Tailored Audiences**: Custom audience management

### 3. Authentication System

OAuth 1.0a implementation with:
- Secure signature generation
- Automatic header creation
- Error handling for auth failures

### 4. Error Handling

Comprehensive error types:
- `APIError`: HTTP API errors with retry logic
- `AuthenticationError`: OAuth authentication failures
- `RateLimitError`: Rate limit exceeded errors
- `ValidationError`: Request validation errors
- `NetworkError`: Network connectivity issues

### 5. Type Safety

Full TypeScript support with:
- Resource type definitions
- Request/response interfaces
- Enum definitions for API constants
- Generic types for pagination

## Usage Examples

### Basic Usage

```typescript
import { XAdsSDK } from 'x-ads-sdk';

const sdk = new XAdsSDK({
  auth: {
    consumerKey: process.env.X_CONSUMER_KEY!,
    consumerSecret: process.env.X_CONSUMER_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: 'sandbox'
});

// Get all accessible accounts
const accounts = await sdk.accounts.list();

// Work with a specific account
const account = sdk.account('account_id');
const campaigns = await account.campaigns.list();
```

### Campaign Management

```typescript
// Create a campaign
const campaign = await account.campaigns.create({
  name: 'Holiday Sale Campaign',
  funding_instrument_id: 'fi_123',
  entity_status: 'DRAFT',
  start_time: '2024-12-01T00:00:00Z',
  end_time: '2024-12-31T23:59:59Z',
  currency: 'USD',
  daily_budget_amount_local_micro: 10000000 // $10.00
});

// Update campaign status
await account.campaigns.update(campaign.data[0].id, {
  entity_status: 'ACTIVE'
});
```

### Line Item (Ad Group) Management

```typescript
// Create a line item
const lineItem = await account.lineItems.create({
  name: 'Holiday Sale - Mobile Users',
  campaign_id: campaign.data[0].id,
  objective: 'WEBSITE_CLICKS',
  product_type: 'PROMOTED_TWEETS',
  placements: ['ALL_ON_TWITTER'],
  bid_type: 'AUTO',
  daily_budget_amount_local_micro: 5000000 // $5.00
});
```

## API Version Management

The SDK supports X Ads API version management:

```typescript
import { APIVersion } from 'x-ads-sdk';

const sdk = new XAdsSDK({
  // ... auth config
  apiVersion: APIVersion.V12,
  autoUpgradeVersion: false // Prevent automatic upgrades
});

// Check version status
const versionInfo = sdk.getVersionInfo();
if (versionInfo.recommendedAction === 'upgrade') {
  console.warn('Consider upgrading:', versionInfo.warnings);
}
```

## Rate Limiting

The SDK includes built-in rate limiting:

```typescript
import { RateLimitTracker } from 'x-ads-sdk';

// Add rate limit tracking
const rateLimitTracker = new RateLimitTracker({
  logEnabled: true,
  strategy: 'wait' // or 'throw'
});

sdk.use(rateLimitTracker);
```

## Error Handling

```typescript
import { isAPIError, isRateLimitError, isAuthenticationError } from 'x-ads-sdk';

try {
  const campaigns = await account.campaigns.list();
} catch (error) {
  if (isRateLimitError(error)) {
    console.log('Rate limited, retry after:', error.resetTime);
  } else if (isAuthenticationError(error)) {
    console.error('Authentication failed:', error.message);
  } else if (isAPIError(error)) {
    console.error('API error:', error.statusCode, error.message);
  }
}
```

## Plugin System

Extend SDK functionality with plugins:

```typescript
import { XAdsPlugin } from 'x-ads-sdk';

class CustomLoggingPlugin implements XAdsPlugin {
  name = 'CustomLogging';
  version = '1.0.0';

  async beforeRequest(request: any) {
    console.log('Making request to:', request.url);
    return request;
  }

  async afterResponse(response: any) {
    console.log('Received response:', response.status);
    return response;
  }
}

sdk.use(new CustomLoggingPlugin());
```

## Migration from Old SDK

The new architecture is backward compatible but encourages using the hierarchical approach:

```typescript
// Old approach (still supported)
import { XAdsClient } from 'x-ads-sdk';
const client = new XAdsClient(config);
const accounts = await client.accounts.list();

// New approach (recommended)
import { XAdsSDK } from 'x-ads-sdk';
const sdk = new XAdsSDK(config);
const accounts = await sdk.accounts.list();
const account = sdk.account('account_id');
const campaigns = await account.campaigns.list();
```

## Benefits of the New Architecture

1. **API Alignment**: Matches X Ads API hierarchy exactly
2. **Type Safety**: Full TypeScript support with proper types
3. **Resource Scoping**: Clear separation between global and account-scoped resources
4. **Error Handling**: Comprehensive error types with retry logic
5. **Extensibility**: Plugin system for custom functionality
6. **Performance**: Built-in rate limiting and request optimization
7. **Maintainability**: Modular design for easy updates and testing