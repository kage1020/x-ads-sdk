/**
 * X Ads SDK Resource Usage Examples
 * 
 * This file demonstrates how to use the new resource-based architecture
 * that follows the X Ads API hierarchy structure.
 */
import { XAdsClient, Environment } from '../src/index.js';
import { AccountResource, CampaignResource, LineItemResource } from '../src/resources/index.js';
import { CampaignEntityStatus, LineItemObjective, LineItemProductType, LineItemPlacement } from '../src/types/resources/index.js';

async function exampleUsage() {
  // Initialize the client
  const client = new XAdsClient({
    auth: {
      consumerKey: process.env.X_CONSUMER_KEY!,
      consumerSecret: process.env.X_CONSUMER_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!,
    },
    environment: Environment.SANDBOX
  });

  try {
    // === Account Management ===
    console.log('🔍 Managing Accounts...');
    
    // Create account resource
    const accountResource = new AccountResource(client.getHttpClient());
    
    // List all accessible accounts
    const accounts = await accountResource.list();
    console.log(`Found ${accounts.data.length} accounts`);
    
    if (accounts.data.length === 0) {
      throw new Error('No accounts available');
    }
    
    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accountId}`);

    // === Campaign Management ===
    console.log('\n📊 Managing Campaigns...');
    
    // Create campaign resource for specific account
    const campaignResource = new CampaignResource(client.getHttpClient(), accountId);
    
    // List existing campaigns
    const campaigns = await campaignResource.list();
    console.log(`Found ${campaigns.data.length} campaigns in account ${accountId}`);
    
    // Create a new campaign
    const newCampaign = await campaignResource.create({
      name: 'SDK Example Campaign',
      funding_instrument_id: 'example_funding_instrument', // Replace with actual funding instrument ID
      entity_status: CampaignEntityStatus.DRAFT,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      currency: 'USD',
      daily_budget_amount_local_micro: 10000000, // $10.00 in micros
    });
    console.log(`Created campaign: ${newCampaign.data[0].id}`);
    
    const campaignId = newCampaign.data[0].id;
    
    // Update campaign to active
    await campaignResource.update(campaignId, {
      entity_status: CampaignEntityStatus.ACTIVE,
      name: 'SDK Example Campaign - Active'
    });
    console.log(`Activated campaign: ${campaignId}`);

    // === Line Item (Ad Group) Management ===
    console.log('\n🎯 Managing Line Items...');
    
    // Create line item resource for specific account
    const lineItemResource = new LineItemResource(client.getHttpClient(), accountId);
    
    // Create a line item for the campaign
    const newLineItem = await lineItemResource.create({
      name: 'SDK Example Line Item',
      campaign_id: campaignId,
      objective: LineItemObjective.WEBSITE_CLICKS,
      product_type: LineItemProductType.PROMOTED_TWEETS,
      placements: [LineItemPlacement.ALL_ON_TWITTER],
      entity_status: 'DRAFT' as any, // This would be LineItemEntityStatus.DRAFT if imported
      daily_budget_amount_local_micro: 5000000, // $5.00 in micros
      automatically_select_bid: true,
    });
    console.log(`Created line item: ${newLineItem.data[0].id}`);
    
    const lineItemId = newLineItem.data[0].id;
    
    // List all line items for the account
    const lineItems = await lineItemResource.list();
    console.log(`Found ${lineItems.data.length} line items in account ${accountId}`);
    
    // Update line item
    await lineItemResource.update(lineItemId, {
      name: 'SDK Example Line Item - Updated',
      daily_budget_amount_local_micro: 7500000, // $7.50 in micros
    });
    console.log(`Updated line item: ${lineItemId}`);

    // === Clean up (optional) ===
    console.log('\n🧹 Cleaning up...');
    
    // Delete line item
    await lineItemResource.delete(lineItemId);
    console.log(`Deleted line item: ${lineItemId}`);
    
    // Delete campaign
    await campaignResource.delete(campaignId);
    console.log(`Deleted campaign: ${campaignId}`);
    
    console.log('\n✅ Example completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

/**
 * Advanced usage example showing resource hierarchy
 */
async function advancedResourceHierarchy() {
  console.log('\n🏗️ Advanced Resource Hierarchy Example');
  
  const client = new XAdsClient({
    auth: {
      consumerKey: process.env.X_CONSUMER_KEY!,
      consumerSecret: process.env.X_CONSUMER_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!,
    },
    environment: Environment.SANDBOX
  });

  // Get accounts
  const accountResource = new AccountResource(client.getHttpClient());
  const accounts = await accountResource.list();
  const accountId = accounts.data[0]?.id;
  
  if (!accountId) {
    console.log('No accounts available for advanced example');
    return;
  }

  // Create campaign hierarchy: Account -> Campaign -> Line Items
  const campaignResource = new CampaignResource(client.getHttpClient(), accountId);
  const lineItemResource = new LineItemResource(client.getHttpClient(), accountId);
  
  // Create campaign
  const campaign = await campaignResource.create({
    name: 'Hierarchical Campaign Example',
    funding_instrument_id: 'example_funding_instrument',
    entity_status: CampaignEntityStatus.DRAFT,
    start_time: new Date().toISOString(),
    currency: 'USD',
    daily_budget_amount_local_micro: 50000000, // $50.00
  });
  
  const campaignId = campaign.data[0].id;
  console.log(`📊 Created parent campaign: ${campaignId}`);
  
  // Create multiple line items under the campaign
  const lineItemTypes = [
    { name: 'Mobile Users', objective: LineItemObjective.APP_INSTALLS },
    { name: 'Desktop Users', objective: LineItemObjective.WEBSITE_CLICKS },
    { name: 'Brand Awareness', objective: LineItemObjective.AWARENESS },
  ];
  
  const createdLineItems = [];
  for (const lineItemType of lineItemTypes) {
    const lineItem = await lineItemResource.create({
      name: `${lineItemType.name} - ${campaignId.slice(-6)}`,
      campaign_id: campaignId,
      objective: lineItemType.objective,
      product_type: LineItemProductType.PROMOTED_TWEETS,
      placements: [LineItemPlacement.ALL_ON_TWITTER],
      daily_budget_amount_local_micro: 15000000, // $15.00 each
      automatically_select_bid: true,
    });
    
    createdLineItems.push(lineItem.data[0]);
    console.log(`🎯 Created line item: ${lineItem.data[0].name} (${lineItem.data[0].id})`);
  }
  
  // Show hierarchy
  console.log('\n🏗️ Resource Hierarchy:');
  console.log(`Account: ${accountId}`);
  console.log(`└── Campaign: ${campaign.data[0].name} (${campaignId})`);
  createdLineItems.forEach((item, index) => {
    const isLast = index === createdLineItems.length - 1;
    const prefix = isLast ? '    └──' : '    ├──';
    console.log(`${prefix} Line Item: ${item.name} (${item.id})`);
  });
  
  console.log('\n✅ Hierarchical structure demonstrated successfully!');
}

// Export for use in other examples or tests
export { exampleUsage, advancedResourceHierarchy };

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleUsage()
    .then(() => advancedResourceHierarchy())
    .catch(console.error);
}