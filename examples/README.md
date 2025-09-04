# X Ads SDK Examples

This directory contains practical examples demonstrating how to use the X Ads SDK for various advertising operations. Each example is self-contained and includes detailed comments explaining the functionality.

## Prerequisites

Before running any examples, make sure you have:

1. **X Ads API Access**: Valid credentials for the X Ads API
2. **Environment Variables**: Set up your credentials as environment variables
3. **Dependencies**: Install the SDK and its dependencies

### Setting Up Environment Variables

Create a `.env` file in the examples directory or project root with these environment variables (note the `VITE_` prefix required by Vite):

```bash
VITE_CONSUMER_KEY=your-consumer-key
VITE_CONSUMER_SECRET=your-consumer-secret  
VITE_ACCESS_TOKEN=your-access-token
VITE_ACCESS_TOKEN_SECRET=your-access-token-secret
```

### Installing Dependencies

```bash
npm install
npm run build
```

## Available Examples

### 01. Basic Usage (`01-basic-usage.ts`)

**What it demonstrates:**
- SDK initialization and configuration
- Basic authentication setup
- Fetching advertising accounts
- Rate limit monitoring
- Basic error handling

**Key concepts covered:**
- Client configuration options
- Environment selection (sandbox vs production)
- Account listing and selection
- Rate limit status checking

**Run the example:**
```bash
npx ts-node examples/01-basic-usage.ts
```

### 02. Campaign Management (`02-campaign-management.ts`)

**What it demonstrates:**
- Creating new campaigns
- Updating campaign settings
- Retrieving campaign details
- Listing campaigns with filters
- Deleting campaigns

**Key concepts covered:**
- Campaign lifecycle management
- Budget management (micro currency conversion)
- Campaign status management
- Error handling for campaign operations
- Filtering and pagination

**Run the example:**
```bash
npx ts-node examples/02-campaign-management.ts
```

### 03. Analytics (`03-analytics.ts`)

**What it demonstrates:**
- Synchronous analytics data retrieval
- Asynchronous analytics job creation
- Job status monitoring and polling
- Different entity types (campaigns, line items, accounts)
- Multiple granularity options

**Key concepts covered:**
- Analytics request configuration
- Date range validation
- Granularity and entity compatibility
- Job-based vs direct analytics
- Metrics calculation and analysis

**Run the example:**
```bash
npx ts-node examples/03-analytics.ts
```

### 04. Media Upload (`04-media-upload.ts`)

**What it demonstrates:**
- Uploading images and videos
- Managing media library
- Media categorization
- File validation and error handling
- Media cleanup operations

**Key concepts covered:**
- File upload with FormData
- Media category selection
- File size and type validation
- Media library management
- Error handling for uploads

**Run the example:**
```bash
npx ts-node examples/04-media-upload.ts
```

## Running Examples

### Individual Examples

Run any example directly using ts-node:

```bash
# Basic usage
npx ts-node examples/01-basic-usage.ts

# Campaign management
npx ts-node examples/02-campaign-management.ts

# Analytics
npx ts-node examples/03-analytics.ts

# Media upload
npx ts-node examples/04-media-upload.ts
```

### Running All Examples

Create a script to run all examples in sequence:

```bash
#!/bin/bash
echo "Running X Ads SDK Examples..."

echo "1. Basic Usage"
npx ts-node examples/01-basic-usage.ts

echo "2. Campaign Management"
npx ts-node examples/02-campaign-management.ts

echo "3. Analytics"
npx ts-node examples/03-analytics.ts

echo "4. Media Upload"
npx ts-node examples/04-media-upload.ts

echo "All examples completed!"
```

## Common Patterns

### Error Handling

All examples include comprehensive error handling:

```typescript
try {
  const result = await client.campaigns.list(accountId);
  // Handle success
} catch (error) {
  console.error('Operation failed:', error);
  
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  }
}
```

### Rate Limiting

Monitor and respect rate limits:

```typescript
const rateLimitStatus = client.getRateLimitStatus();
console.log('Rate limit status:', rateLimitStatus);

// Reset if needed
if (rateLimitStatus.remaining < 10) {
  client.resetRateLimit();
}
```

### Currency Conversion

Handle micro currency conversions:

```typescript
// Convert micro currency to dollars
const dollarAmount = microAmount / 1000000;

// Convert dollars to micro currency
const microAmount = dollarAmount * 1000000;
```

### Pagination

Handle paginated responses:

```typescript
let allCampaigns = [];
let cursor = null;

do {
  const response = await client.campaigns.list(accountId, {
    count: 200,
    cursor: cursor
  });
  
  allCampaigns.push(...response.data);
  cursor = response.next_cursor;
} while (cursor);
```

## Environment Considerations

### Sandbox vs Production

The examples use sandbox environment by default. For production:

```typescript
const config: SDKConfig = {
  credentials: { /* ... */ },
  environment: 'production', // Change from 'sandbox'
};
```

### Debugging

Enable debug mode to see detailed request/response information:

```typescript
const config: SDKConfig = {
  credentials: { /* ... */ },
  environment: 'sandbox',
  debug: true, // Enable debugging
};
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your credentials are correct
   - Ensure your app has proper permissions
   - Check if tokens have expired

2. **Rate Limit Errors**
   - Monitor rate limit status
   - Implement proper retry logic
   - Use the rate limit buffer setting

3. **Validation Errors**
   - Check required fields are provided
   - Validate date ranges
   - Ensure entity IDs exist

4. **Network Errors**
   - Check internet connectivity
   - Verify API endpoints are accessible
   - Consider timeout settings

### Getting Help

- Check the [API Documentation](https://developer.twitter.com/en/docs/twitter-ads-api)
- Review error messages carefully
- Enable debug mode for detailed logging
- Check rate limits and quotas

## Best Practices

1. **Always handle errors gracefully**
2. **Monitor rate limits proactively**
3. **Use appropriate timeouts**
4. **Validate input data before API calls**
5. **Use sandbox for testing**
6. **Keep credentials secure**
7. **Implement proper logging**
8. **Use TypeScript for type safety**

## Contributing

To add new examples:

1. Create a new `.ts` file following the naming pattern
2. Include comprehensive comments
3. Add error handling
4. Update this README with the new example
5. Test thoroughly in sandbox environment

## License

These examples are provided under the same license as the X Ads SDK.