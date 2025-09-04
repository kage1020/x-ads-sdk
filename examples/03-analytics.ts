/**
 * Analytics Example for X Ads SDK
 *
 * This example demonstrates how to retrieve analytics data and create async jobs using the X Ads SDK.
 */

/// <reference types="./vite-env" />

import { XAdsClient } from '../src/index';
import type { AnalyticsRequest, SDKConfig } from '../src/types';

async function analyticsExample() {
  // Initialize the client
  const config: SDKConfig = {
    credentials: {
      consumerKey: import.meta.env.VITE_CONSUMER_KEY || 'your-consumer-key',
      consumerSecret: import.meta.env.VITE_CONSUMER_SECRET || 'your-consumer-secret',
      accessToken: import.meta.env.VITE_ACCESS_TOKEN || 'your-access-token',
      accessTokenSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET || 'your-access-token-secret',
    },
    environment: 'sandbox',
    debug: true,
  };

  const client = new XAdsClient(config);

  try {
    // Get the first available account
    const accounts = await client.accounts.list();
    if (accounts.data.length === 0) {
      throw new Error('No advertising accounts found');
    }

    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accountId}`);

    // Get some campaigns to analyze
    const campaigns = await client.campaigns.list(accountId, { count: 5 });
    if (campaigns.data.length === 0) {
      console.log('No campaigns found. Creating analytics examples with placeholder data.');
    }

    const campaignIds =
      campaigns.data.length > 0
        ? campaigns.data.slice(0, 3).map((c) => c.id)
        : ['placeholder-campaign-1', 'placeholder-campaign-2'];

    console.log(`Analyzing campaigns: ${campaignIds.join(', ')}`);

    // 1. Get synchronous analytics data (small date range)
    console.log('\n--- Getting synchronous analytics data ---');
    const syncRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN',
      entity_ids: campaignIds,
      start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      end_time: new Date().toISOString(),
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions', 'clicks', 'spend_micro', 'engagements'],
    };

    const syncAnalytics = await client.analytics.getStats(accountId, syncRequest);
    console.log(`Retrieved ${syncAnalytics.data.length} data points`);
    console.log(`Time series length: ${syncAnalytics.time_series_length}`);

    // Display sample data
    if (syncAnalytics.data.length > 0) {
      const sampleData = syncAnalytics.data[0];
      console.log('Sample data point:', {
        id: sampleData.id,
        id_data: sampleData.id_data,
      });
    }

    // 2. Create an asynchronous analytics job (large date range)
    console.log('\n--- Creating asynchronous analytics job ---');
    const asyncRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN',
      entity_ids: campaignIds,
      start_time: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
      end_time: new Date().toISOString(),
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions', 'clicks', 'spend_micro', 'engagements', 'conversions'],
    };

    const jobResponse = await client.analytics.createJob(accountId, asyncRequest);
    const jobId = jobResponse.data.job_id;
    console.log(`Created analytics job: ${jobId}`);
    console.log(`Job status: ${jobResponse.data.status}`);

    // 3. Poll the job status
    console.log('\n--- Monitoring job progress ---');
    let jobStatus = jobResponse.data.status;
    let attempts = 0;
    const maxAttempts = 10;

    while (jobStatus === 'QUEUED' || jobStatus === 'PROCESSING') {
      if (attempts >= maxAttempts) {
        console.log('Max polling attempts reached');
        break;
      }

      console.log(`Job status: ${jobStatus} (attempt ${attempts + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

      const jobStatusResponse = await client.analytics.getJob(accountId, jobId);
      jobStatus = jobStatusResponse.data.status;
      attempts++;
    }

    console.log(`Final job status: ${jobStatus}`);

    // 4. List recent analytics jobs
    console.log('\n--- Listing recent analytics jobs ---');
    const jobsList = await client.analytics.listJobs(accountId, { count: 5 });
    console.log(`Found ${jobsList.data.length} recent jobs:`);

    jobsList.data.forEach((job, index) => {
      console.log(`${index + 1}. Job ID: ${job.job_id}`);
      console.log(`   Status: ${job.status}`);
      console.log(`   Created: ${job.created_at}`);
      console.log(`   Updated: ${job.updated_at}`);
    });

    // 5. Different entity type example - Line Items
    if (campaigns.data.length > 0) {
      console.log('\n--- Getting line item analytics ---');

      // First get line items for the campaign
      const lineItems = await client.lineItems.list(accountId, {
        campaign_ids: [campaignIds[0]],
        count: 3,
      });

      if (lineItems.data.length > 0) {
        const lineItemIds = lineItems.data.map((li) => li.id);

        const lineItemRequest: AnalyticsRequest = {
          entity: 'LINE_ITEM',
          entity_ids: lineItemIds,
          start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          end_time: new Date().toISOString(),
          granularity: 'HOUR',
          placement: 'ALL_ON_TWITTER',
          metrics: ['impressions', 'clicks', 'spend_micro'],
        };

        const lineItemAnalytics = await client.analytics.getStats(accountId, lineItemRequest);
        console.log(`Retrieved line item analytics: ${lineItemAnalytics.data.length} data points`);
      } else {
        console.log('No line items found for analytics');
      }
    }

    // 6. Account level analytics
    console.log('\n--- Getting account level analytics ---');
    const accountRequest: AnalyticsRequest = {
      entity: 'ACCOUNT',
      entity_ids: [accountId],
      start_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      end_time: new Date().toISOString(),
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions', 'clicks', 'spend_micro'],
    };

    const accountAnalytics = await client.analytics.getStats(accountId, accountRequest);
    console.log(`Account analytics data points: ${accountAnalytics.data.length}`);
  } catch (error) {
    console.error('Analytics example failed:', error);
    throw error;
  }
}

analyticsExample()
  .then(() => {
    console.log('\nAnalytics example completed successfully');
  })
  .catch((error) => {
    console.error('Example failed:', error);
    if (typeof process !== 'undefined' && process.exit) {
      process.exit(1);
    }
  });
