import { XAdsClient, Environment, EntityType } from './index.js';

// Example usage (for development/testing)
async function example() {
  const client = new XAdsClient({
    auth: {
      consumer_key: process.env.X_CONSUMER_KEY!,
      consumer_secret: process.env.X_CONSUMER_SECRET!,
      access_token: process.env.X_ACCESS_TOKEN!,
      access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
    },
    environment: Environment.SANDBOX
  });

  try {
    // Test connection
    const isConnected = await client.testConnection();
    console.log('Connection test:', isConnected ? 'SUCCESS' : 'FAILED');

    if (isConnected) {
      // List accounts
      const accounts = await client.accounts.list();
      console.log('Accounts:', accounts.data.length);

      // If we have accounts, list campaigns and ad groups
      if (accounts.data.length > 0) {
        const accountId = accounts.data[0].id;
        
        const campaigns = await client.campaigns.list(accountId);
        console.log('Campaigns:', campaigns.data.length);

        const adGroups = await client.adGroups.list(accountId);
        console.log('Ad Groups:', adGroups.data.length);

        // Get analytics for the last 7 days
        if (campaigns.data.length > 0) {
          const campaignIds = campaigns.data.slice(0, 3).map(c => c.id); // Get first 3 campaigns
          const analyticsData = await client.analytics.getLastWeekAnalytics(
            accountId,
            EntityType.CAMPAIGN,
            campaignIds
          );
          console.log('Analytics data points:', analyticsData.data.length);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Only run example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  example();
}