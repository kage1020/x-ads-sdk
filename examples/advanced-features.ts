/**
 * Advanced Features Example for X Ads SDK
 * 
 * This example demonstrates advanced features like pagination,
 * plugins, and enhanced error handling.
 */

import { 
  XAdsClient, 
  Environment,
  RateLimitTracker,
  CursorPaginator,
  isAPIError,
  isRateLimitError,
  isTimeoutError 
} from '../src/index.js';

async function advancedFeaturesExample() {
  const client = new XAdsClient({
    auth: {
      consumer_key: process.env.X_CONSUMER_KEY!,
      consumer_secret: process.env.X_CONSUMER_SECRET!,
      access_token: process.env.X_ACCESS_TOKEN!,
      access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
    },
    environment: Environment.SANDBOX,
    rateLimitStrategy: 'wait'
  });

  console.log('🚀 X Ads SDK Advanced Features Example\n');

  try {
    // 1. Plugin Usage - Rate Limit Tracking
    console.log('1. Setting up Rate Limit Tracking Plugin');
    console.log('=' .repeat(50));

    const rateLimitTracker = new RateLimitTracker({
      trackingEnabled: true,
      logEnabled: true,
      warningThreshold: 5
    });

    client.use(rateLimitTracker);
    console.log('✅ Rate limit tracker plugin installed\n');

    // Get accounts for testing
    const accounts = await client.accounts.list({ count: 1 });
    if (accounts.data.length === 0) {
      console.log('❌ No accounts found');
      return;
    }
    
    const accountId = accounts.data[0].id;

    // 2. Pagination with Async Iterators
    console.log('2. Advanced Pagination Examples');
    console.log('=' .repeat(50));

    // Method 1: Using paginator directly
    console.log('📄 Method 1: Using CursorPaginator');
    const campaignPaginator = client.campaigns.paginate(accountId, {}, {
      maxResults: 20,
      pageSize: 5
    });

    let pageCount = 0;
    for await (const campaignPage of campaignPaginator) {
      pageCount++;
      console.log(`  Page ${pageCount}: ${campaignPage.length} campaigns`);
      campaignPage.forEach(campaign => {
        console.log(`    - ${campaign.name} (${campaign.status})`);
      });
    }

    // Method 2: Using async iterator for individual items
    console.log('\n📄 Method 2: Using Async Iterator for Items');
    let itemCount = 0;
    for await (const campaign of client.campaigns.iterateAll(accountId)) {
      itemCount++;
      console.log(`  Campaign ${itemCount}: ${campaign.name}`);
      
      if (itemCount >= 10) { // Limit to first 10 items
        console.log('  ... (limited to first 10 items)');
        break;
      }
    }

    // Method 3: Get all items at once (with limit)
    console.log('\n📄 Method 3: Get All Items at Once');
    const allCampaigns = await campaignPaginator.first(5);
    console.log(`  Retrieved ${allCampaigns.length} campaigns in one call`);

    // 3. Rate Limit Information
    console.log('\n3. Rate Limit Information');
    console.log('=' .repeat(50));

    const rateLimitSummary = rateLimitTracker.getSummary();
    if (rateLimitSummary.length > 0) {
      console.log('📊 Rate Limit Summary:');
      rateLimitSummary.forEach(info => {
        console.log(`  ${info.endpoint}:`);
        console.log(`    Remaining: ${info.remaining}/${info.limit}`);
        console.log(`    Utilization: ${info.utilizationRate.toFixed(1)}%`);
        console.log(`    Reset Time: ${info.resetTime.toLocaleString()}`);
        console.log('');
      });
    } else {
      console.log('📊 No rate limit data available yet');
    }

    // 4. Enhanced Error Handling
    console.log('4. Enhanced Error Handling Examples');
    console.log('=' .repeat(50));

    // Simulate various error scenarios
    console.log('🔍 Testing error handling...');
    
    try {
      // This should cause an authentication error with invalid credentials
      await client.campaigns.get(accountId, 'invalid_campaign_id');
    } catch (error) {
      console.log('✅ Caught error successfully:');
      
      if (isAPIError(error)) {
        console.log(`  Type: API Error`);
        console.log(`  Status: ${error.statusCode}`);
        console.log(`  Message: ${error.message}`);
        console.log(`  Code: ${error.code}`);
        console.log(`  Retryable: ${error.isRetryable()}`);
        console.log(`  Client Error: ${error.isClientError()}`);
        console.log('  Request Info:', error.request);
        console.log('  Response Info:', error.response?.headers);
      } else if (isRateLimitError(error)) {
        console.log(`  Type: Rate Limit Error`);
        console.log(`  Reset Time: ${error.resetTime?.toISOString()}`);
      } else if (isTimeoutError(error)) {
        console.log(`  Type: Timeout Error`);
        console.log(`  Timeout: ${error.timeoutMs}ms`);
      } else {
        console.log(`  Type: ${error.constructor.name}`);
        console.log(`  Message: ${error.message}`);
      }
    }

    // 5. Plugin Management
    console.log('\n5. Plugin Management');
    console.log('=' .repeat(50));

    console.log(`Installed plugins: ${client.hasPlugin('rate-limit-tracker') ? '✅' : '❌'} rate-limit-tracker`);
    
    // Get plugin information
    if (client.hasPlugin('rate-limit-tracker')) {
      const tracker = client.getHttpClient().getPluginManager().get('rate-limit-tracker') as RateLimitTracker;
      const allRateLimits = tracker.getAllRateLimits();
      console.log(`📊 Tracking ${allRateLimits.size} endpoints`);
    }

    // 6. Chaining Operations with Error Recovery
    console.log('\n6. Chaining Operations with Error Recovery');
    console.log('=' .repeat(50));

    try {
      // Chain multiple operations with proper error handling
      const activecampaigns = await client.campaigns.getActive(accountId, { count: 3 });
      console.log(`Found ${activecampaigns.data.length} active campaigns`);

      if (activecampaigns.data.length > 0) {
        const campaign = activecampaigns.data[0];
        
        // Get ad groups for the campaign
        const adGroups = await client.adGroups.listByCampaign(accountId, campaign.id);
        console.log(`Campaign "${campaign.name}" has ${adGroups.data.length} ad groups`);

        // Get analytics if available
        try {
          const analytics = await client.analytics.getCampaignAnalytics(
            accountId,
            [campaign.id],
            {
              start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              end_date: new Date().toISOString().split('T')[0]
            }
          );
          
          if (analytics.data.length > 0) {
            console.log(`✅ Analytics data available for ${campaign.name}`);
          }
        } catch (analyticsError) {
          console.log(`ℹ️  Analytics data not available: ${(analyticsError as Error).message}`);
        }
      }

    } catch (error) {
      console.error(`❌ Chain operation failed: ${(error as Error).message}`);
    }

    console.log('\n🎉 Advanced features example completed!');

  } catch (error) {
    console.error('❌ Example failed:', error);
    
    // Detailed error analysis
    if (isAPIError(error)) {
      console.error('API Error Details:', {
        status: error.statusCode,
        code: error.code,
        retryable: error.isRetryable(),
        timestamp: error.timestamp
      });
    }
  }
}

// Utility function to demonstrate error serialization
function serializeError(error: any): string {
  if (error && typeof error.toJSON === 'function') {
    return JSON.stringify(error.toJSON(), null, 2);
  }
  return JSON.stringify({
    name: error?.name,
    message: error?.message,
    stack: error?.stack
  }, null, 2);
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  advancedFeaturesExample();
}

export { advancedFeaturesExample, serializeError };