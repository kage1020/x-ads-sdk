/**
 * API Versioning Example for X Ads SDK
 *
 * This example demonstrates how to use the API versioning features
 * including version management, deprecation warnings, and upgrade paths.
 */

import { APIVersion, APIVersionManager, Environment, XAdsClient } from '../src/index.js';

async function apiVersioningExample() {
  console.log('🔄 X Ads SDK API Versioning Example\n');

  // 1. Basic Version Management
  console.log('1. Basic Version Management');
  console.log('='.repeat(50));

  // Create client with specific API version
  const client = new XAdsClient({
    auth: {
      consumerKey: process.env.X_CONSUMER_KEY!,
      consumerSecret: process.env.X_CONSUMER_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!,
    },
    environment: Environment.SANDBOX,
    apiVersion: APIVersion.V12, // Explicitly set version
    autoUpgradeVersion: false, // Manual version control
  });

  console.log(`Current API version: ${client.getAPIVersion()}`);
  console.log(`Is version deprecated: ${client.isVersionDeprecated()}`);

  // 2. Version Information and Recommendations
  console.log('\n2. Version Information and Recommendations');
  console.log('='.repeat(50));

  const versionInfo = client.getVersionInfo();
  console.log(`Current version: ${versionInfo.currentVersion}`);
  console.log(
    `Warnings: ${versionInfo.warnings.length > 0 ? versionInfo.warnings.join(', ') : 'None'}`
  );
  console.log(`Recommended action: ${versionInfo.recommendedAction}`);
  console.log(`Version supported: ${versionInfo.isVersionSupported}`);

  // 3. Working with Deprecated Versions
  console.log('\n3. Working with Deprecated Versions');
  console.log('='.repeat(50));

  // Switch to a deprecated version (v11)
  console.log('Switching to deprecated version v11.0...');
  client.setAPIVersion(APIVersion.V11);

  const deprecatedInfo = client.getVersionInfo();
  console.log(`⚠️  Current version: ${deprecatedInfo.currentVersion}`);
  console.log(`⚠️  Is deprecated: ${client.isVersionDeprecated()}`);

  if (deprecatedInfo.warnings.length > 0) {
    console.log('📢 Warnings:');
    deprecatedInfo.warnings.forEach((warning) => {
      console.log(`   - ${warning}`);
    });
  }

  if (deprecatedInfo.recommendedAction === 'upgrade') {
    console.log('🔄 Recommendation: Upgrade to a newer API version');
  }

  // 4. Version Manager Usage
  console.log('\n4. Advanced Version Manager Usage');
  console.log('='.repeat(50));

  // Get all available versions
  const allVersions = APIVersionManager.getAllVersions();
  console.log('📋 Available API versions:');
  allVersions.forEach((version) => {
    const status = version.isDefault
      ? '(default)'
      : version.isDeprecated
        ? '(deprecated)'
        : '(supported)';
    console.log(
      `   - ${version.version} ${status} - Released: ${version.releaseDate.toDateString()}`
    );
    if (version.supportedUntil) {
      console.log(`     Supported until: ${version.supportedUntil.toDateString()}`);
    }
  });

  // 5. Auto-Upgrade Feature
  console.log('\n5. Auto-Upgrade Feature');
  console.log('='.repeat(50));

  // Create a client with auto-upgrade enabled
  const autoUpgradeClient = new XAdsClient({
    auth: {
      consumerKey: process.env.X_CONSUMER_KEY!,
      consumerSecret: process.env.X_CONSUMER_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!,
    },
    environment: Environment.SANDBOX,
    apiVersion: APIVersion.V11,
    autoUpgradeVersion: true, // Enable auto-upgrade
  });

  console.log(`Auto-upgrade client version: ${autoUpgradeClient.getAPIVersion()}`);
  console.log(`Should upgrade: ${autoUpgradeClient.getVersionManager().shouldUpgrade()}`);

  // 6. Version Comparison and Migration
  console.log('\n6. Version Comparison and Migration');
  console.log('='.repeat(50));

  const versionManager = new APIVersionManager();

  // Check if specific versions are supported
  console.log(`Is v12.0 supported: ${APIVersionManager.isVersionSupported(APIVersion.V12)}`);
  console.log(`Is v11.0 supported: ${APIVersionManager.isVersionSupported(APIVersion.V11)}`);
  console.log(`Latest version: ${APIVersionManager.getLatestVersion()}`);

  // 7. Making Requests with Version Awareness
  console.log('\n7. Making Requests with Version Awareness');
  console.log('='.repeat(50));

  try {
    // Switch back to the latest version for actual API calls
    client.setAPIVersion(APIVersionManager.getLatestVersion());
    console.log(`✅ Switched to latest version: ${client.getAPIVersion()}`);

    // Make a test request to verify the version is working
    const accounts = await client.accounts.list({ count: 1 });
    console.log(`✅ Successfully made API request with ${client.getAPIVersion()}`);
    console.log(`   Found ${accounts.data.length} account(s)`);

    // Check for any version warnings after the request
    const postRequestInfo = client.getVersionInfo();
    if (postRequestInfo.warnings.length > 0) {
      console.log('📢 Post-request warnings:');
      postRequestInfo.warnings.forEach((warning) => {
        console.log(`   - ${warning}`);
      });
    }
  } catch (error) {
    console.error('❌ API request failed:', (error as Error).message);
    console.log('This might be due to authentication or network issues, not versioning');
  }

  // 8. Best Practices Summary
  console.log('\n8. API Versioning Best Practices');
  console.log('='.repeat(50));
  console.log('📋 Best Practices:');
  console.log('   ✅ Always specify the API version explicitly in production');
  console.log('   ✅ Monitor version warnings in your application logs');
  console.log('   ✅ Test your application with new API versions before upgrading');
  console.log('   ✅ Use auto-upgrade cautiously in production environments');
  console.log('   ✅ Plan migration windows for deprecated API versions');
  console.log('   ✅ Keep track of API version deprecation schedules');

  console.log('\n🎉 API Versioning example completed!');
}

// Helper function to demonstrate version-specific features
function demonstrateVersionSpecificFeatures(version: APIVersion) {
  console.log(`\n🔍 Features available in API version ${version}:`);

  switch (version) {
    case APIVersion.V12:
      console.log('   ✨ Latest features and improvements');
      console.log('   ✨ Enhanced error responses');
      console.log('   ✨ Improved rate limiting');
      break;
    case APIVersion.V11:
      console.log('   📦 Stable feature set');
      console.log('   ⚠️  Will be deprecated soon');
      break;
    default:
      console.log('   ❓ Unknown version features');
  }
}

// Utility function for version migration planning
function planVersionMigration(fromVersion: APIVersion, toVersion: APIVersion) {
  console.log(`\n📋 Migration Plan: ${fromVersion} → ${toVersion}`);
  console.log('   1. Review API changes and deprecations');
  console.log('   2. Update client code to handle new responses');
  console.log('   3. Test thoroughly in sandbox environment');
  console.log('   4. Deploy with monitoring enabled');
  console.log('   5. Monitor for any version warnings');
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  apiVersioningExample().catch(console.error);
}

export { apiVersioningExample, demonstrateVersionSpecificFeatures, planVersionMigration };
