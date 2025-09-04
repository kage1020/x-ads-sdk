/**
 * Campaign Management Example for X Ads SDK
 *
 * This example demonstrates how to create, update, and manage campaigns using the X Ads SDK.
 */

/// <reference types="./vite-env" />

import { XAdsClient } from '../src/index';
import type { Campaign, CampaignCreateData, CampaignUpdateData, SDKConfig } from '../src/types';

async function campaignManagementExample() {
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

    // 1. Create a new campaign
    console.log('\n--- Creating a new campaign ---');
    const campaignData: CampaignCreateData = {
      name: `Test Campaign ${new Date().toISOString()}`,
      funding_instrument_id: 'your-funding-instrument-id', // Replace with actual funding instrument ID
      entity_status: 'PAUSED',
      campaign_optimization: 'DEFAULT',
      objective: 'AWARENESS',
      start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Start tomorrow
      daily_budget_amount_local_micro: 10000000, // $10 in micro currency
      total_budget_amount_local_micro: 100000000, // $100 in micro currency
    };

    const newCampaign = await client.campaigns.create(accountId, campaignData);
    console.log(`Created campaign: ${newCampaign.data.name} (ID: ${newCampaign.data.id})`);

    const campaignId = newCampaign.data.id;

    // 2. Get campaign details
    console.log('\n--- Fetching campaign details ---');
    const campaign = await client.campaigns.getCampaign(accountId, campaignId);
    console.log(`Campaign: ${campaign.data.name}`);
    console.log(`Status: ${campaign.data.entity_status}`);
    console.log(`Objective: ${campaign.data.objective}`);
    console.log(`Daily Budget: ${campaign.data.daily_budget_amount_local_micro} micro`);

    // 3. Update the campaign
    console.log('\n--- Updating campaign ---');
    const updateData: CampaignUpdateData = {
      name: `Updated ${(campaign.data as Campaign).name}`,
      daily_budget_amount_local_micro: 15000000, // Increase to $15
      entity_status: 'PAUSED',
    };

    const updatedCampaign = await client.campaigns.update(accountId, campaignId, updateData);
    console.log(`Updated campaign name: ${updatedCampaign.data.name}`);
    console.log(
      `Updated daily budget: ${updatedCampaign.data.daily_budget_amount_local_micro} micro`
    );

    // 4. List all campaigns with filtering
    console.log('\n--- Listing campaigns ---');
    const allCampaigns = await client.campaigns.list(accountId, {
      count: 10,
      entity_statuses: ['ACTIVE', 'PAUSED'],
      with_deleted: false,
    });

    console.log(`Found ${allCampaigns.data.length} campaigns:`);
    allCampaigns.data.forEach((camp, index) => {
      console.log(`${index + 1}. ${camp.name} (${camp.entity_status})`);
      console.log(`   Created: ${camp.created_at}`);
      console.log(
        `   Daily Budget: $${parseInt((camp.daily_budget_amount_local_micro || 0).toString(), 10) / 1000000}`
      );
    });

    // 5. Delete the test campaign (optional)
    console.log('\n--- Deleting test campaign ---');
    await client.campaigns.delete(accountId, campaignId);
    console.log(`Deleted campaign: ${campaignId}`);

    // 6. Demonstrate error handling
    console.log('\n--- Error handling example ---');
    try {
      // Try to get a non-existent campaign
      await client.campaigns.getCampaign(accountId, 'non-existent-campaign-id');
    } catch (error) {
      console.log('Expected error caught:', error instanceof Error ? error.message : error);
    }
  } catch (error) {
    console.error('Campaign management example failed:', error);
    throw error;
  }
}

campaignManagementExample()
  .then(() => {
    console.log('\nCampaign management example completed successfully');
  })
  .catch((error) => {
    console.error('Example failed:', error);
    if (typeof process !== 'undefined' && process.exit) {
      process.exit(1);
    }
  });
