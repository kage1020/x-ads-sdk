# X Ads SDK for TypeScript

A TypeScript SDK for the X Ads API, providing type-safe access to advertising campaigns, analytics, media management, and more.

[![NPM Version](https://img.shields.io/npm/v/x-ads-sdk.svg)](https://www.npmjs.com/package/x-ads-sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/x-ads-sdk.svg)](https://bundlephobia.com/package/x-ads-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/x-ads-sdk.svg)](https://github.com/kage1020/x-ads-sdk/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kage1020/x-ads-sdk/ci.yml?branch=main)](https://github.com/kage1020/x-ads-sdk/actions)
[![Coverage](https://img.shields.io/codecov/c/github/kage1020/x-ads-sdk.svg)](https://codecov.io/gh/kage1020/x-ads-sdk)

## Features

- 🔒 **OAuth 1.0a Authentication** - Secure authentication with X Ads API
- 📊 **Analytics & Reporting** - Comprehensive analytics with async job support
- 🎯 **Campaign Management** - Create, update, and manage advertising campaigns
- 📱 **Media Management** - Upload and manage media assets
- 🎨 **Targeting Options** - Advanced audience targeting capabilities
- 📈 **Rate Limiting** - Built-in rate limiting with exponential backoff
- 🛡️ **Type Safety** - Full TypeScript support with comprehensive type definitions
- 🌐 **Runtime Agnostic** - Works in browsers, Node.js, and edge environments
- 🧪 **Well Tested** - Comprehensive test coverage with contract and integration tests

## Installation

```bash
npm install x-ads-sdk
```

## Quick Start

```typescript
import { XAdsClient } from 'x-ads-sdk';

// Initialize the client
const client = new XAdsClient({
  credentials: {
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-consumer-secret',
    accessToken: 'your-access-token',
    accessTokenSecret: 'your-access-token-secret',
  },
  environment: 'sandbox', // or 'production'
});

// Get advertising accounts
const accounts = await client.accounts.list();
console.log(`Found ${accounts.data.length} accounts`);

// Create a campaign
const campaign = await client.campaigns.create(accounts.data[0].id, {
  name: 'My First Campaign',
  funding_instrument_id: 'funding-instrument-id',
  entity_status: 'PAUSED',
  objective: 'AWARENESS',
  start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  daily_budget_amount_local_micro: 10000000, // $10 in micro currency
});

// Get campaign analytics
const analytics = await client.analytics.getStats(accounts.data[0].id, {
  entity: 'CAMPAIGN',
  entity_ids: [campaign.data.id],
  start_time: '2024-01-01T00:00:00Z',
  end_time: '2024-01-07T00:00:00Z',
  granularity: 'DAY',
  placement: 'ALL_ON_TWITTER',
  metrics: ['impressions', 'clicks', 'spend_micro'],
});
```

## API Reference

### Client Initialization

```typescript
const client = new XAdsClient({
  credentials: {
    consumerKey: string;
    consumerSecret: string;
    accessToken: string;
    accessTokenSecret: string;
  },
  environment: 'sandbox' | 'production';
  timeout?: number; // Request timeout in ms (default: 60000)
  debug?: boolean; // Enable debug logging (default: false)
  rateLimitBuffer?: number; // Rate limit buffer (0-1, default: 0.1)
});
```

### Available Resources

#### Accounts

```typescript
// List advertising accounts
const accounts = await client.accounts.list();

// Get specific account
const account = await client.accounts.get(accountId);
```

#### Campaigns

```typescript
// List campaigns
const campaigns = await client.campaigns.list(accountId, {
  count: 10,
  entity_statuses: ['ACTIVE', 'PAUSED'],
});

// Create campaign
const campaign = await client.campaigns.create(accountId, {
  name: 'Campaign Name',
  funding_instrument_id: 'funding-id',
  objective: 'AWARENESS',
  // ... other campaign data
});

// Update campaign
const updatedCampaign = await client.campaigns.update(accountId, campaignId, {
  name: 'Updated Name',
  entity_status: 'ACTIVE',
});

// Get campaign details
const campaign = await client.campaigns.getCampaign(accountId, campaignId);

// Delete campaign
await client.campaigns.delete(accountId, campaignId);
```

#### Line Items

```typescript
// List line items
const lineItems = await client.lineItems.list(accountId, {
  campaign_ids: ['campaign-id'],
});

// Create line item
const lineItem = await client.lineItems.create(accountId, {
  name: 'Line Item Name',
  campaign_id: 'campaign-id',
  objective: 'AWARENESS',
  product_type: 'PROMOTED_TWEETS',
  // ... other line item data
});
```

#### Analytics

```typescript
// Get synchronous analytics (small date ranges)
const analytics = await client.analytics.getStats(accountId, {
  entity: 'CAMPAIGN',
  entity_ids: ['campaign-id'],
  start_time: '2024-01-01T00:00:00Z',
  end_time: '2024-01-07T00:00:00Z',
  granularity: 'DAY',
  placement: 'ALL_ON_TWITTER',
  metrics: ['impressions', 'clicks', 'spend_micro'],
});

// Create asynchronous analytics job (large date ranges)
const job = await client.analytics.createJob(accountId, {
  entity: 'CAMPAIGN',
  entity_ids: ['campaign-id'],
  start_time: '2024-01-01T00:00:00Z',
  end_time: '2024-03-31T00:00:00Z',
  granularity: 'DAY',
  placement: 'ALL_ON_TWITTER',
  metrics: ['impressions', 'clicks', 'spend_micro'],
});

// Check job status
const jobStatus = await client.analytics.getJob(accountId, job.data.job_id);

// List recent jobs
const jobs = await client.analytics.listJobs(accountId, { count: 10 });
```

#### Media

```typescript
// Upload media
const media = await client.media.upload(accountId, {
  file: fileData, // File object or Blob
  media_category: 'TWEET_IMAGE',
  name: 'My Creative Asset',
});

// List media library
const mediaList = await client.media.list(accountId, {
  media_category: 'TWEET_IMAGE',
  count: 20,
});

// Get media details
const mediaDetails = await client.media.getMedia(accountId, mediaId);

// Delete media
await client.media.delete(accountId, mediaId);
```

#### Targeting

```typescript
// Get targeting criteria
const locations = await client.targeting.getLocations('US');
const interests = await client.targeting.getInterests('technology');
const behaviors = await client.targeting.getBehaviors();
```

### Rate Limiting

The SDK includes built-in rate limiting with exponential backoff:

```typescript
// Check current rate limit status
const status = client.getRateLimitStatus();
console.log(`Remaining requests: ${status.remaining}`);

// Reset rate limiter (if needed)
client.resetRateLimit();
```

### Error Handling

```typescript
try {
  const campaigns = await client.campaigns.list(accountId);
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);

    // Handle specific error types
    if (error.message.includes('rate limit')) {
      // Handle rate limiting
    } else if (error.message.includes('unauthorized')) {
      // Handle authentication errors
    }
  }
}
```

## Authentication

To use the X Ads API, you need to:

1. Create a Twitter/X Developer App
2. Apply for Ads API access
3. Generate OAuth 1.0a credentials

### Environment Variables

For security, use environment variables for credentials:

```bash
# For Vite projects (browser)
VITE_CONSUMER_KEY=your-consumer-key
VITE_CONSUMER_SECRET=your-consumer-secret
VITE_ACCESS_TOKEN=your-access-token
VITE_ACCESS_TOKEN_SECRET=your-access-token-secret

# For Node.js projects
CONSUMER_KEY=your-consumer-key
CONSUMER_SECRET=your-consumer-secret
ACCESS_TOKEN=your-access-token
ACCESS_TOKEN_SECRET=your-access-token-secret
```

## Examples

Comprehensive examples are available in the [`examples/`](./examples/) directory:

- [Basic Usage](./examples/01-basic-usage.ts) - SDK initialization and basic operations
- [Campaign Management](./examples/02-campaign-management.ts) - Creating and managing campaigns
- [Analytics](./examples/03-analytics.ts) - Retrieving analytics data and managing jobs
- [Media Upload](./examples/04-media-upload.ts) - Uploading and managing media assets

### Running Examples

```bash
# Install dependencies
npm install

# Run specific example
npx ts-node examples/01-basic-usage.ts

# Or use the example scripts
npm run example:basic
npm run example:campaigns
npm run example:analytics
npm run example:media
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [X Ads API Documentation](https://docs.x.com/x-ads-api/introduction)
- [X Developer Platform](https://developer.x.com/en/docs/x-ads-api)
- [X Ads Python SDK](https://github.com/twitterdev/twitter-python-ads-sdk)
- [X TypeScript SDK](https://github.com/xdevplatform/twitter-api-typescript-sdk)

---

**Note**: This SDK is not officially endorsed by X. It's a community-driven project to help developers integrate with the X Ads API more easily.
