/**
 * Environment Setup Example for X Ads SDK
 * 
 * This example shows how to configure the SDK for different
 * environments (sandbox vs production) and various settings.
 */

import { XAdsClient, Environment } from '../src/index.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Development/Testing Configuration
const developmentConfig = {
  auth: {
    consumer_key: process.env.X_CONSUMER_KEY!,
    consumer_secret: process.env.X_CONSUMER_SECRET!,
    access_token: process.env.X_ACCESS_TOKEN!,
    access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX,
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  rateLimitStrategy: 'wait' as const
};

// Production Configuration
const productionConfig = {
  auth: {
    consumer_key: process.env.X_PROD_CONSUMER_KEY!,
    consumer_secret: process.env.X_PROD_CONSUMER_SECRET!,
    access_token: process.env.X_PROD_ACCESS_TOKEN!,
    access_token_secret: process.env.X_PROD_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.PRODUCTION,
  timeout: 60000, // 60 seconds (production may need longer)
  maxRetries: 5, // More retries for production
  rateLimitStrategy: 'wait' as const
};

// High-throughput Configuration (for analytics/reporting)
const analyticsConfig = {
  auth: {
    consumer_key: process.env.X_CONSUMER_KEY!,
    consumer_secret: process.env.X_CONSUMER_SECRET!,
    access_token: process.env.X_ACCESS_TOKEN!,
    access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX,
  timeout: 120000, // 2 minutes for large analytics requests
  maxRetries: 2, // Fewer retries for analytics
  rateLimitStrategy: 'wait' as const,
  rateLimitOptions: {
    strategy: 'wait' as const,
    defaultLimit: 300, // Higher rate limit for analytics
    defaultWindow: 900 // 15 minutes
  }
};

// Strict Configuration (fail fast on errors)
const strictConfig = {
  auth: {
    consumer_key: process.env.X_CONSUMER_KEY!,
    consumer_secret: process.env.X_CONSUMER_SECRET!,
    access_token: process.env.X_ACCESS_TOKEN!,
    access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX,
  timeout: 15000, // Short timeout
  maxRetries: 1, // Minimal retries
  rateLimitStrategy: 'throw' as const // Throw on rate limits
};

async function environmentSetupExample() {
  console.log('⚙️  X Ads SDK Environment Setup Example\n');

  // 1. Development Environment Setup
  console.log('1. Development Environment (Sandbox)');
  console.log('=' .repeat(40));
  
  try {
    const devClient = new XAdsClient(developmentConfig);
    console.log('✅ Development client initialized');
    
    const isConnected = await devClient.testConnection();
    console.log(`Connection test: ${isConnected ? '✅ Success' : '❌ Failed'}`);
    
    if (isConnected) {
      const accounts = await devClient.accounts.list({ count: 1 });
      console.log(`Accounts accessible: ${accounts.data.length}`);
    }
  } catch (error) {
    console.error('❌ Development setup failed:', (error as Error).message);
  }
  console.log('');

  // 2. Production Environment Setup (if credentials available)
  console.log('2. Production Environment Setup');
  console.log('=' .repeat(40));
  
  if (process.env.X_PROD_CONSUMER_KEY) {
    try {
      const prodClient = new XAdsClient(productionConfig);
      console.log('✅ Production client initialized');
      console.log('⚠️  Production environment - use with caution!');
      
      // Only test connection in production, don't perform operations
      const isConnected = await prodClient.testConnection();
      console.log(`Production connection: ${isConnected ? '✅ Success' : '❌ Failed'}`);
    } catch (error) {
      console.error('❌ Production setup failed:', (error as Error).message);
    }
  } else {
    console.log('⚠️  Production credentials not configured');
    console.log('Set X_PROD_* environment variables for production access');
  }
  console.log('');

  // 3. Analytics-Optimized Configuration
  console.log('3. Analytics-Optimized Configuration');
  console.log('=' .repeat(40));
  
  try {
    const analyticsClient = new XAdsClient(analyticsConfig);
    console.log('✅ Analytics client initialized');
    console.log('📊 Optimized for large analytics requests');
    
    // Test with an analytics request
    const accounts = await analyticsClient.accounts.list({ count: 1 });
    if (accounts.data.length > 0) {
      try {
        // Try to get comprehensive analytics
        const analytics = await analyticsClient.analytics.getLastMonthAnalytics(
          accounts.data[0].id,
          'ACCOUNT' as any,
          [accounts.data[0].id]
        );
        console.log('📈 Analytics request successful');
      } catch (error) {
        console.log('📈 Analytics data not available (expected for new accounts)');
      }
    }
  } catch (error) {
    console.error('❌ Analytics setup failed:', (error as Error).message);
  }
  console.log('');

  // 4. Strict/Fail-Fast Configuration
  console.log('4. Strict/Fail-Fast Configuration');
  console.log('=' .repeat(40));
  
  try {
    const strictClient = new XAdsClient(strictConfig);
    console.log('✅ Strict client initialized');
    console.log('⚡ Configured for fail-fast behavior');
    
    // This should work or fail quickly
    const testResult = await strictClient.testConnection();
    console.log(`Strict connection test: ${testResult ? '✅ Success' : '❌ Failed'}`);
  } catch (error) {
    console.error('❌ Strict client failed:', (error as Error).message);
    console.log('This is expected behavior in strict mode');
  }
  console.log('');

  // 5. Custom Configuration Examples
  console.log('5. Custom Configuration Options');
  console.log('=' .repeat(40));
  
  // Custom base URL (for testing or custom endpoints)
  const customConfig = {
    ...developmentConfig,
    baseURL: 'https://custom.api.endpoint.com'
  };
  
  console.log('Available configuration options:');
  console.log('• environment: Environment.SANDBOX | Environment.PRODUCTION');
  console.log('• baseURL: Custom API base URL');
  console.log('• timeout: Request timeout in milliseconds');
  console.log('• maxRetries: Maximum number of retry attempts');
  console.log('• rateLimitStrategy: "wait" | "throw"');
  console.log('• rateLimitOptions: Fine-tune rate limiting behavior');
  console.log('');

  // 6. Environment Variable Setup Guide
  console.log('6. Environment Variables Setup');
  console.log('=' .repeat(40));
  console.log('Create a .env file with the following variables:');
  console.log('');
  console.log('# Sandbox/Development Credentials');
  console.log('X_CONSUMER_KEY=your_sandbox_consumer_key');
  console.log('X_CONSUMER_SECRET=your_sandbox_consumer_secret');
  console.log('X_ACCESS_TOKEN=your_sandbox_access_token');
  console.log('X_ACCESS_TOKEN_SECRET=your_sandbox_access_token_secret');
  console.log('');
  console.log('# Production Credentials (optional)');
  console.log('X_PROD_CONSUMER_KEY=your_prod_consumer_key');
  console.log('X_PROD_CONSUMER_SECRET=your_prod_consumer_secret');
  console.log('X_PROD_ACCESS_TOKEN=your_prod_access_token');
  console.log('X_PROD_ACCESS_TOKEN_SECRET=your_prod_access_token_secret');
  console.log('');

  console.log('🎉 Environment setup example completed!');
}

// Configuration factory functions
export function createDevelopmentClient(): XAdsClient {
  return new XAdsClient(developmentConfig);
}

export function createProductionClient(): XAdsClient {
  if (!process.env.X_PROD_CONSUMER_KEY) {
    throw new Error('Production credentials not configured');
  }
  return new XAdsClient(productionConfig);
}

export function createAnalyticsClient(): XAdsClient {
  return new XAdsClient(analyticsConfig);
}

export function createStrictClient(): XAdsClient {
  return new XAdsClient(strictConfig);
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  environmentSetupExample();
}

export { 
  environmentSetupExample,
  developmentConfig,
  productionConfig,
  analyticsConfig,
  strictConfig 
};