/**
 * Analytics and Reporting Example for X Ads SDK
 * 
 * This example demonstrates how to retrieve and analyze
 * performance data for campaigns and ad groups.
 */

import { 
  XAdsClient, 
  Environment,
  EntityType,
  Granularity,
  AnalyticsModule
} from '../src/index.js';

async function analyticsReportingExample() {
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
    console.log('📊 X Ads SDK Analytics and Reporting Example\n');

    // Get the first available account
    const accounts = await client.accounts.list();
    if (accounts.data.length === 0) {
      throw new Error('No accounts found');
    }
    const accountId = accounts.data[0].id;
    console.log(`Using account: ${accounts.data[0].name}\n`);

    // Get campaigns for analysis
    const campaigns = await client.campaigns.getActive(accountId, { count: 5 });
    if (campaigns.data.length === 0) {
      console.log('❌ No active campaigns found for analytics');
      return;
    }

    console.log(`📈 Analyzing ${campaigns.data.length} active campaigns\n`);

    // 1. Account-level analytics for the last 30 days
    console.log('1. Account-Level Performance (Last 30 Days)');
    console.log('=' .repeat(50));
    
    const accountAnalytics = await client.analytics.getAccountAnalytics(
      accountId,
      {
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0]
      }
    );

    if (accountAnalytics.data.length > 0 && accountAnalytics.data[0].id_data.length > 0) {
      const metrics = accountAnalytics.data[0].id_data[0].metrics;
      displayMetrics('Account Total', metrics);
    } else {
      console.log('No account-level data available\n');
    }

    // 2. Campaign performance comparison
    console.log('2. Campaign Performance Comparison (Last 7 Days)');
    console.log('=' .repeat(50));

    const campaignIds = campaigns.data.map(c => c.id);
    const campaignAnalytics = await client.analytics.getCampaignAnalytics(
      accountId,
      campaignIds,
      {
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0]
      }
    );

    // Create a map for easy lookup
    const campaignMap = new Map(campaigns.data.map(c => [c.id, c]));

    if (campaignAnalytics.data.length > 0) {
      campaignAnalytics.data.forEach(analyticsData => {
        const campaign = campaignMap.get(analyticsData.id);
        const campaignName = campaign?.name || 'Unknown Campaign';
        
        if (analyticsData.id_data.length > 0) {
          const metrics = analyticsData.id_data[0].metrics;
          displayMetrics(campaignName, metrics);
        }
      });
    } else {
      console.log('No campaign analytics data available\n');
    }

    // 3. Daily performance trend for the top campaign
    if (campaigns.data.length > 0) {
      console.log('3. Daily Performance Trend (Last 7 Days)');
      console.log('=' .repeat(50));

      const topCampaign = campaigns.data[0];
      console.log(`Campaign: ${topCampaign.name}\n`);

      const dailyAnalytics = await client.analytics.getDailyAnalytics(
        accountId,
        EntityType.CAMPAIGN,
        [topCampaign.id],
        {
          start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end_date: new Date().toISOString().split('T')[0]
        }
      );

      if (dailyAnalytics.data.length > 0 && dailyAnalytics.data[0].id_data.length > 0) {
        dailyAnalytics.data[0].id_data.forEach((dayData, index) => {
          const date = new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0];
          console.log(`${date}: ${JSON.stringify(dayData.metrics, null, 2)}`);
        });
      } else {
        console.log('No daily trend data available\n');
      }
    }

    // 4. Ad Group performance within top campaign
    if (campaigns.data.length > 0) {
      console.log('\n4. Ad Group Performance');
      console.log('=' .repeat(50));

      const topCampaign = campaigns.data[0];
      const adGroups = await client.adGroups.listByCampaign(accountId, topCampaign.id);
      
      if (adGroups.data.length > 0) {
        console.log(`Analyzing ${adGroups.data.length} ad groups in: ${topCampaign.name}\n`);

        const adGroupIds = adGroups.data.map(ag => ag.id);
        const adGroupAnalytics = await client.analytics.getAdGroupAnalytics(
          accountId,
          adGroupIds,
          {
            start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0]
          }
        );

        const adGroupMap = new Map(adGroups.data.map(ag => [ag.id, ag]));

        if (adGroupAnalytics.data.length > 0) {
          adGroupAnalytics.data.forEach(analyticsData => {
            const adGroup = adGroupMap.get(analyticsData.id);
            const adGroupName = adGroup?.name || 'Unknown Ad Group';
            
            if (analyticsData.id_data.length > 0) {
              const metrics = analyticsData.id_data[0].metrics;
              displayMetrics(`${adGroupName} (${adGroup?.status})`, metrics);
            }
          });
        } else {
          console.log('No ad group analytics data available');
        }
      } else {
        console.log('No ad groups found in the campaign');
      }
    }

    // 5. Custom date range analysis
    console.log('\n5. Custom Date Range Analysis (Last 14 Days)');
    console.log('=' .repeat(50));

    const customAnalytics = await client.analytics.getComprehensiveAnalytics(
      accountId,
      EntityType.CAMPAIGN,
      campaignIds.slice(0, 3), // Top 3 campaigns
      {
        start_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0]
      },
      Granularity.TOTAL
    );

    if (customAnalytics.data.length > 0) {
      console.log('Top 3 Campaigns Performance Summary:');
      customAnalytics.data.forEach(analyticsData => {
        const campaign = campaignMap.get(analyticsData.id);
        if (analyticsData.id_data.length > 0) {
          const metrics = analyticsData.id_data[0].metrics;
          console.log(`\n📊 ${campaign?.name || 'Unknown Campaign'}`);
          
          // Calculate key performance indicators
          const impressions = metrics.impressions || 0;
          const clicks = metrics.clicks || 0;
          const engagements = metrics.engagements || 0;
          const cost = metrics.billed_charge_local_micro || 0;
          
          const ctr = impressions > 0 ? ((clicks / impressions) * 100) : 0;
          const engagementRate = impressions > 0 ? ((engagements / impressions) * 100) : 0;
          const costPerEngagement = engagements > 0 ? (cost / engagements / 1000000) : 0;

          console.log(`   Impressions: ${impressions.toLocaleString()}`);
          console.log(`   Clicks: ${clicks.toLocaleString()}`);
          console.log(`   Engagements: ${engagements.toLocaleString()}`);
          console.log(`   CTR: ${ctr.toFixed(2)}%`);
          console.log(`   Engagement Rate: ${engagementRate.toFixed(2)}%`);
          console.log(`   Cost per Engagement: $${costPerEngagement.toFixed(2)}`);
          console.log(`   Total Cost: $${(cost / 1000000).toFixed(2)}`);
        }
      });
    } else {
      console.log('No comprehensive analytics data available');
    }

    console.log('\n🎉 Analytics reporting example completed successfully!');

  } catch (error) {
    console.error('❌ Error in analytics reporting:', error);
    
    if (error instanceof Error) {
      console.error('Message:', error.message);
      if ('statusCode' in error) {
        console.error('Status Code:', (error as any).statusCode);
      }
    }
  }
}

// Helper function to display metrics in a formatted way
function displayMetrics(title: string, metrics: any) {
  console.log(`📊 ${title}`);
  console.log(`   Impressions: ${(metrics.impressions || 0).toLocaleString()}`);
  console.log(`   Clicks: ${(metrics.clicks || 0).toLocaleString()}`);
  console.log(`   Engagements: ${(metrics.engagements || 0).toLocaleString()}`);
  
  if (metrics.billed_charge_local_micro) {
    console.log(`   Cost: $${(metrics.billed_charge_local_micro / 1000000).toFixed(2)}`);
  }
  
  if (metrics.video_total_views) {
    console.log(`   Video Views: ${metrics.video_total_views.toLocaleString()}`);
  }
  
  // Calculate CTR if we have impressions and clicks
  if (metrics.impressions && metrics.clicks) {
    const ctr = (metrics.clicks / metrics.impressions * 100).toFixed(2);
    console.log(`   CTR: ${ctr}%`);
  }
  
  console.log('');
}

// Helper function to create date ranges
function createDateRange(daysAgo: number) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - daysAgo);
  
  return {
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0]
  };
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  analyticsReportingExample();
}

export { analyticsReportingExample, displayMetrics, createDateRange };