/**
 * Basic Usage Example for X Ads SDK
 *
 * This example demonstrates the basic setup and initialization of the X Ads SDK.
 */

/// <reference types="./vite-env" />

import { XAdsClient } from '../src/index';
import type { SDKConfig } from '../src/types';

async function basicUsageExample() {
  // 1. Configure the SDK
  const config: SDKConfig = {
    credentials: {
      consumerKey: import.meta.env.VITE_CONSUMER_KEY || 'your-consumer-key',
      consumerSecret: import.meta.env.VITE_CONSUMER_SECRET || 'your-consumer-secret',
      accessToken: import.meta.env.VITE_ACCESS_TOKEN || 'your-access-token',
      accessTokenSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET || 'your-access-token-secret',
    },
    environment: 'sandbox', // Use 'production' for live environment
    timeout: 30000, // Optional: 30 second timeout
    debug: true, // Optional: Enable debug logging
  };

  // 2. Initialize the client
  const client = new XAdsClient(config);

  try {
    // 3. Get account information
    console.log('Fetching advertising accounts...');
    const accounts = await client.accounts.list();

    if (accounts.data.length === 0) {
      console.log('No advertising accounts found');
      return;
    }

    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accountId}`);

    // 4. Check rate limit status
    const rateLimitStatus = client.getRateLimitStatus();
    console.log('Rate limit status:', rateLimitStatus);

    // 5. Get campaigns for the account
    console.log('Fetching campaigns...');
    const campaigns = await client.campaigns.list(accountId, { count: 5 });
    console.log(`Found ${campaigns.data.length} campaigns`);

    campaigns.data.forEach((campaign, index) => {
      console.log(`${index + 1}. ${campaign.name} (ID: ${campaign.id})`);
      console.log(`   Status: ${campaign.entity_status}`);
      console.log(`   Daily budget: ${campaign.daily_budget_amount_local_micro} micro`);
    });
  } catch (error) {
    console.error('Error occurred:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

// Run the example if this file is the main module
if (typeof window === 'undefined') {
  basicUsageExample()
    .then(() => {
      console.log('Basic usage example completed successfully');
    })
    .catch((error) => {
      console.error('Example failed:', error);
      if (typeof process !== 'undefined' && process.exit) {
        process.exit(1);
      }
    });
}

export { basicUsageExample };
