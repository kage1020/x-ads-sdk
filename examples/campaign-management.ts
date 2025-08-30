/**
 * Campaign Management Example for X Ads SDK
 * 
 * This example demonstrates how to create, manage, and optimize 
 * advertising campaigns using the X Ads SDK.
 */

import { 
  XAdsClient, 
  Environment, 
  CampaignObjective, 
  CampaignStatus,
  AdGroupStatus
} from '../src/index.js';

async function campaignManagementExample() {
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

  try {
    console.log('🎯 X Ads SDK Campaign Management Example\n');

    // Get the first available account
    const accounts = await client.accounts.list();
    if (accounts.data.length === 0) {
      throw new Error('No accounts found');
    }
    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accounts.data[0].name}\n`);

    // 1. Create a new campaign
    console.log('Creating a new campaign...');
    const newCampaign = await client.campaigns.create(accountId, {
      name: `Test Campaign ${Date.now()}`,
      objective: CampaignObjective.ENGAGEMENTS,
      daily_budget_amount_local_micro: 10000000, // $10 in micro currency
      currency: 'USD'
    });
    console.log(`✅ Created campaign: ${newCampaign.name} (${newCampaign.id})`);

    // 2. Create ad groups for the campaign
    console.log('\nCreating ad groups...');
    const adGroup1 = await client.adGroups.create(accountId, {
      campaign_id: newCampaign.id,
      name: `Ad Group 1 - ${Date.now()}`,
      bid_amount_local_micro: 1000000 // $1 bid
    });

    const adGroup2 = await client.adGroups.create(accountId, {
      campaign_id: newCampaign.id,
      name: `Ad Group 2 - ${Date.now()}`,
      bid_amount_local_micro: 1500000 // $1.5 bid
    });

    console.log(`✅ Created ad group: ${adGroup1.name} (${adGroup1.id})`);
    console.log(`✅ Created ad group: ${adGroup2.name} (${adGroup2.id})`);

    // 3. Update campaign settings
    console.log('\nUpdating campaign budget...');
    const updatedCampaign = await client.campaigns.update(
      accountId,
      newCampaign.id,
      {
        daily_budget_amount_local_micro: 15000000 // Increase to $15
      }
    );
    console.log(`✅ Updated campaign budget to $15`);

    // 4. Pause one ad group and activate another
    console.log('\nManaging ad group status...');
    await client.adGroups.pause(accountId, adGroup1.id);
    console.log(`⏸️  Paused ad group: ${adGroup1.name}`);

    await client.adGroups.activate(accountId, adGroup2.id);
    console.log(`▶️  Activated ad group: ${adGroup2.name}`);

    // 5. Get campaign performance overview
    console.log('\nFetching campaign performance...');
    const activeAdGroups = await client.adGroups.getActiveByCampaign(
      accountId, 
      newCampaign.id
    );
    console.log(`📊 Active ad groups in campaign: ${activeAdGroups.data.length}`);

    // 6. Bulk operations - get all active campaigns
    console.log('\nFetching all active campaigns...');
    const activeCampaigns = await client.campaigns.getActive(accountId);
    console.log(`🚀 Total active campaigns: ${activeCampaigns.data.length}`);

    // Display campaign summary
    console.log('\n📈 Campaign Summary:');
    activeCampaigns.data.forEach(campaign => {
      const budgetUSD = campaign.daily_budget_amount_local_micro 
        ? (campaign.daily_budget_amount_local_micro / 1000000).toFixed(2)
        : 'Not set';
      
      console.log(`  - ${campaign.name}`);
      console.log(`    Status: ${campaign.status}`);
      console.log(`    Objective: ${campaign.objective}`);
      console.log(`    Daily Budget: $${budgetUSD}`);
      console.log(`    Created: ${new Date(campaign.created_at).toLocaleDateString()}`);
      console.log('');
    });

    // 7. Analytics for the new campaign (may not have data yet)
    console.log('Checking analytics availability...');
    try {
      const campaignAnalytics = await client.analytics.getCampaignAnalytics(
        accountId,
        [newCampaign.id],
        {
          start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end_date: new Date().toISOString().split('T')[0]
        }
      );
      
      if (campaignAnalytics.data.length > 0) {
        console.log('📊 Analytics data available');
      } else {
        console.log('📊 No analytics data available yet (new campaign)');
      }
    } catch (error) {
      console.log('📊 Analytics not available for new campaign');
    }

    // 8. Clean up - pause the test campaign
    console.log('\nCleaning up test campaign...');
    await client.campaigns.pause(accountId, newCampaign.id);
    console.log(`⏸️  Paused test campaign: ${newCampaign.name}`);

    console.log('\n🎉 Campaign management example completed successfully!');

  } catch (error) {
    console.error('❌ Error in campaign management:', error);
    
    if (error instanceof Error) {
      console.error('Message:', error.message);
      if ('statusCode' in error) {
        console.error('Status Code:', (error as any).statusCode);
      }
    }
  }
}

// Helper function to format currency
function formatCurrency(microAmount: number | undefined, currency = 'USD'): string {
  if (!microAmount) return 'N/A';
  const amount = microAmount / 1000000;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  campaignManagementExample();
}

export { campaignManagementExample, formatCurrency };