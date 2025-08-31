# X Ads SDK

A Node.js SDK for the X Ads API built with TypeScript. This SDK provides easy access to advertising campaign management, analytics, and reporting functionality.

## 🚀 Features

- **Full TypeScript Support** - Complete type definitions for all API endpoints
- **OAuth 1.0a Authentication** - Secure authentication with automatic request signing
- **Comprehensive API Coverage** - Account management, campaigns, ad groups, and analytics
- **Rate Limit Handling** - Automatic rate limiting with configurable strategies
- **Retry Logic** - Built-in exponential backoff retry mechanism
- **Environment Support** - Easy switching between sandbox and production environments
- **Modern Architecture** - Built with ES modules and modern Node.js features

## 📦 Installation

```bash
npm install x-ads-sdk
```

## 🏁 Quick Start

### Basic Setup

```typescript
import { XAdsClient, Environment } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: {
    consumer_key: 'your_consumer_key',
    consumer_secret: 'your_consumer_secret',
    access_token: 'your_access_token',
    access_token_secret: 'your_access_token_secret'
  },
  environment: Environment.SANDBOX // or Environment.PRODUCTION
});
```

### Environment Variables Setup

Create a `.env` file in your project root:

```env
X_CONSUMER_KEY=your_consumer_key
X_CONSUMER_SECRET=your_consumer_secret
X_ACCESS_TOKEN=your_access_token
X_ACCESS_TOKEN_SECRET=your_access_token_secret
```

Then use in your code:

```typescript
const client = new XAdsClient({
  auth: {
    consumer_key: process.env.X_CONSUMER_KEY!,
    consumer_secret: process.env.X_CONSUMER_SECRET!,
    access_token: process.env.X_ACCESS_TOKEN!,
    access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX
});
```

## 📚 Usage Examples

### Account Management

```typescript
// List all accessible accounts
const accounts = await client.accounts.list();
console.log(`Found ${accounts.data.length} accounts`);

// Get specific account
const account = await client.accounts.get('account_id');
console.log(`Account: ${account.name}`);
```

### Campaign Management

```typescript
// List campaigns
const campaigns = await client.campaigns.list('account_id');

// Create a new campaign
const newCampaign = await client.campaigns.create('account_id', {
  name: 'My New Campaign',
  objective: CampaignObjective.ENGAGEMENTS,
  daily_budget_amount_local_micro: 10000000, // $10 in micro currency
  currency: 'USD'
});

// Update campaign
const updatedCampaign = await client.campaigns.update('account_id', 'campaign_id', {
  name: 'Updated Campaign Name',
  status: CampaignStatus.PAUSED
});

// Convenience methods
await client.campaigns.pause('account_id', 'campaign_id');
await client.campaigns.activate('account_id', 'campaign_id');
```

### Ad Group Management

```typescript
// List ad groups
const adGroups = await client.adGroups.list('account_id');

// Create ad group
const newAdGroup = await client.adGroups.create('account_id', {
  campaign_id: 'campaign_id',
  name: 'My Ad Group',
  bid_amount_local_micro: 1000000 // $1 bid
});

// Get ad groups by campaign
const campaignAdGroups = await client.adGroups.listByCampaign('account_id', 'campaign_id');
```

### Analytics and Reporting

```typescript
import { EntityType, Granularity } from 'x-ads-sdk';

// Get campaign analytics for the last 7 days
const analytics = await client.analytics.getCampaignAnalytics(
  'account_id',
  ['campaign_id1', 'campaign_id2'],
  {
    start_date: '2024-01-01',
    end_date: '2024-01-07'
  }
);

// Get daily performance trend
const dailyAnalytics = await client.analytics.getDailyAnalytics(
  'account_id',
  EntityType.CAMPAIGN,
  ['campaign_id'],
  {
    start_date: '2024-01-01',
    end_date: '2024-01-07'
  }
);

// Convenience methods
const lastWeekAnalytics = await client.analytics.getLastWeekAnalytics(
  'account_id',
  EntityType.CAMPAIGN,
  ['campaign_id']
);
```

## ⚙️ Configuration Options

### Client Configuration

```typescript
const client = new XAdsClient({
  auth: {
    consumer_key: 'your_key',
    consumer_secret: 'your_secret',
    access_token: 'your_token',
    access_token_secret: 'your_token_secret'
  },
  environment: Environment.SANDBOX, // or Environment.PRODUCTION
  timeout: 30000, // Request timeout in milliseconds
  maxRetries: 3, // Maximum retry attempts
  rateLimitStrategy: 'wait', // or 'throw'
  baseURL: 'https://custom-api.example.com' // Optional custom base URL
});
```

### Rate Limiting

The SDK includes built-in rate limiting with two strategies:

- `'wait'` (default): Wait until rate limit resets
- `'throw'`: Throw an error when rate limit is hit

```typescript
const client = new XAdsClient({
  auth: { /* auth config */ },
  rateLimitStrategy: 'throw' // Fail fast on rate limits
});
```

### Error Handling

```typescript
import {
  AuthenticationError,
  RateLimitError,
  APIError,
  ValidationError
} from 'x-ads-sdk';

try {
  const campaigns = await client.campaigns.list('account_id');
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit hit, resets at:', error.resetTime);
  } else if (error instanceof APIError) {
    console.error('API error:', error.statusCode, error.message);
  }
}
```

## 🧪 Examples

Check out the comprehensive examples in the `examples/` directory:

- [`basic-usage.ts`](examples/basic-usage.ts) - Basic SDK setup and usage
- [`campaign-management.ts`](examples/campaign-management.ts) - Campaign and ad group management
- [`analytics-reporting.ts`](examples/analytics-reporting.ts) - Performance analytics and reporting
- [`environment-setup.ts`](examples/environment-setup.ts) - Environment configuration

Run an example:

```bash
npm run build
node dist/examples/basic-usage.js
```

## 🔧 Development

### Building the SDK

```bash
npm run build
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Project Structure

```
src/
├── auth/           # OAuth authentication
├── client/         # HTTP client and base functionality
├── errors/         # Error definitions
├── modules/        # API modules (accounts, campaigns, etc.)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── client.ts       # Main SDK client
└── index.ts        # Package exports
```

## 📝 TypeScript Support

The SDK is built with TypeScript and provides comprehensive type definitions:

```typescript
import {
  Campaign,
  CampaignStatus,
  CampaignObjective,
  AdGroup,
  AnalyticsMetrics
} from 'x-ads-sdk';

const campaign: Campaign = {
  id: 'campaign_id',
  name: 'My Campaign',
  status: CampaignStatus.ACTIVE,
  objective: CampaignObjective.ENGAGEMENTS,
  // ... other properties with full type checking
};
```

## 🔐 Authentication

This SDK uses OAuth 1.0a for authentication. You'll need to:

1. Create a X Developer Account
2. Create an App in the X Developer Portal
3. Generate Consumer Keys and Access Tokens
4. Use these credentials in your SDK configuration

For detailed authentication setup, refer to the [X Developer Documentation](https://developer.x.com/en/docs/authentication/oauth-1-0a).

## 🌐 Environment Support

The SDK supports both sandbox and production environments:

### Sandbox (Development)

- Use `Environment.SANDBOX`
- Safe for testing and development
- No real money transactions

### Production

- Use `Environment.PRODUCTION`
- Live advertising campaigns
- Real money transactions - use with caution

## 📊 Supported Metrics

The analytics module supports comprehensive metrics:

- **Engagement Metrics**: Impressions, clicks, engagements, retweets, replies, likes
- **Billing Metrics**: Billed charges, billed engagements
- **Video Metrics**: Video views, completion rates, CTA clicks
- **Conversion Metrics**: Website conversions, app installs, custom events

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the examples and TypeScript definitions
- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/kage1020/x-ads-sdk/issues)
- **X Ads API**: Official [X Ads API Documentation](https://docs.x.com/x-ads-api/introduction)

## 🔗 Resources

- [X Ads API Documentation](https://docs.x.com/x-ads-api/introduction)
- [X Developer Platform](https://developer.x.com/en/docs/x-ads-api)
- [X Ads Python SDK](https://github.com/twitterdev/twitter-python-ads-sdk)
- [X TypeScript SDK](https://github.com/xdevplatform/twitter-api-typescript-sdk)

---

**Note**: This SDK is not officially maintained by X (formerly Twitter). It's a community-driven project designed to provide a robust Node.js/TypeScript interface to the X Ads API.
