/**
 * Basic Usage Example for X Ads SDK
 *
 * This example demonstrates the basic setup and usage of the X Ads SDK
 * for managing advertising campaigns and analytics.
 */

import { Environment, XAdsClient } from '../src/index.js';

async function basicExample() {
  // Initialize the SDK client
  const client = new XAdsClient({
    auth: {
      consumerKey: process.env.X_CONSUMER_KEY!,
      consumerSecret: process.env.X_CONSUMER_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!,
    },
    environment: Environment.SANDBOX, // Use sandbox for testing
    timeout: 30000, // 30 second timeout
    maxRetries: 3, // Retry failed requests up to 3 times
    rateLimitStrategy: 'wait', // Wait when rate limits are hit
  });

  try {
    console.log('🚀 X Ads SDK Basic Usage Example\n');

    // 1. List accounts
    console.log('Fetching accounts...');
    const accounts = await client.accounts.list();
    console.log(`📋 Found ${accounts.data.length} account(s)`);

    if (accounts.data.length === 0) {
      console.log('❌ No accounts found. Please check your credentials.');
      return;
    }

    const account = accounts.data[0];
    console.log(`Using account: ${account.name} (${account.id})\n`);

    // 2. List campaigns
    console.log('Fetching campaigns...');
    const campaigns = await client.campaigns.list(account.id, { count: 10 });
    console.log(`📊 Found ${campaigns.data.length} campaign(s)`);

    if (campaigns.data.length > 0) {
      campaigns.data.forEach((campaign) => {
        console.log(`  - ${campaign.name} (${campaign.status})`);
      });
    }

    // 3. List ad groups for the first campaign (if exists)
    if (campaigns.data.length > 0) {
      const campaign = campaigns.data[0];
      console.log(`\nFetching ad groups for campaign: ${campaign.name}`);

      const adGroups = await client.adGroups.listByCampaign(account.id, campaign.id);
      console.log(`🎯 Found ${adGroups.data.length} ad group(s)`);

      adGroups.data.forEach((adGroup) => {
        console.log(`  - ${adGroup.name} (${adGroup.status})`);
      });
    }

    // 4. Get analytics for the last 7 days
    if (campaigns.data.length > 0) {
      console.log('\nFetching analytics for the last 7 days...');
      const campaignIds = campaigns.data.slice(0, 3).map((c) => c.id);

      const analytics = await client.analytics.getLastWeekAnalytics(
        account.id,
        'CAMPAIGN' as any,
        campaignIds
      );

      console.log(`📈 Analytics data points: ${analytics.data.length}`);

      analytics.data.forEach((data) => {
        if (data.id_data.length > 0) {
          const metrics = data.id_data[0].metrics;
          console.log(`Campaign ${data.id}:`);
          console.log(`  - Impressions: ${metrics.impressions || 0}`);
          console.log(`  - Clicks: ${metrics.clicks || 0}`);
          console.log(`  - Engagements: ${metrics.engagements || 0}`);
        }
      });
    }

    console.log('\n🎉 Basic example completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);

    if (error instanceof Error) {
      console.error('Message:', error.message);
      if ('statusCode' in error) {
        console.error('Status Code:', (error as any).statusCode);
      }
    }
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  basicExample();
}

export { basicExample };
