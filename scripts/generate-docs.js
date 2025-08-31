#!/usr/bin/env node

/**
 * Documentation Generation Script
 *
 * This script generates comprehensive documentation for the X Ads SDK,
 * including TypeDoc API documentation and additional guides.
 */

import { execSync } from "child_process"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
}

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function run(command, options = {}) {
  log("blue", `Running: ${command}`)
  try {
    const result = execSync(command, {
      cwd: rootDir,
      stdio: "pipe",
      ...options,
    })
    return result.toString()
  } catch (error) {
    log("red", `Command failed: ${command}`)
    log("red", error.message)
    process.exit(1)
  }
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
    log("green", `Created directory: ${dir}`)
  }
}

function generateTypeDoc() {
  log("cyan", "📚 Generating TypeDoc documentation...")

  // Clean existing docs
  if (existsSync(join(rootDir, "docs"))) {
    run("npx rimraf docs")
  }

  // Generate HTML documentation
  run("npm run docs")
  log("green", "✅ HTML documentation generated")

  // Generate JSON API reference
  run("npm run docs:json")
  log("green", "✅ JSON API reference generated")
}

function generateAdditionalDocs() {
  log("cyan", "📖 Generating additional documentation...")

  const docsDir = join(rootDir, "docs")
  ensureDir(docsDir)

  // Generate API coverage report
  const apiCoverage = `# API Coverage Report

This document provides an overview of the X Ads API endpoints covered by this SDK.

## Authentication
- ✅ OAuth 1.0a signature generation
- ✅ Request signing and authorization headers

## Accounts Management
- ✅ List advertising accounts
- ✅ Get account details
- ✅ Update account settings

## Campaign Management
- ✅ List campaigns
- ✅ Create campaigns
- ✅ Update campaigns
- ✅ Pause/resume campaigns
- ✅ Get campaign details

## Ad Group Management
- ✅ List ad groups
- ✅ Create ad groups
- ✅ Update ad groups
- ✅ Pause/resume ad groups
- ✅ Get ad group details

## Analytics & Reporting
- ✅ Campaign analytics
- ✅ Ad group analytics
- ✅ Custom date ranges
- ✅ Multiple metrics support

## Advanced Features
- ✅ Rate limiting with configurable strategies
- ✅ Automatic retry with exponential backoff
- ✅ Plugin system for extensibility
- ✅ Advanced pagination with async iterators
- ✅ API version management
- ✅ Comprehensive error handling

## Plugin System
- ✅ Rate limit tracking plugin
- ✅ Plugin lifecycle hooks
- ✅ Extensible architecture

Generated on ${new Date().toISOString()}
`

  writeFileSync(join(docsDir, "api-coverage.md"), apiCoverage)
  log("green", "✅ API coverage report generated")

  // Generate migration guide
  const migrationGuide = `# Migration Guide

## Migrating from other X API SDKs

### From node-twitter-api-v2

\`\`\`typescript
// Old way (node-twitter-api-v2)
import { TwitterApi } from 'node-twitter-api-v2';

const client = new TwitterApi({
  appKey: 'consumer_key',
  appSecret: 'consumer_secret',
  accessToken: 'access_token',
  accessSecret: 'access_token_secret'
});

// New way (x-ads-sdk)
import { XAdsClient, Environment } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: {
    consumerKey: 'consumer_key',
    consumerSecret: 'consumer_secret',
    accessToken: 'access_token',
    accessTokenSecret: 'access_token_secret'
  },
  environment: Environment.SANDBOX
});
\`\`\`

### API Version Management

This SDK provides built-in API version management:

\`\`\`typescript
// Explicit version control
const client = new XAdsClient({
  auth: { ... },
  apiVersion: APIVersion.V12,
  autoUpgradeVersion: false
});

// Check for version warnings
const versionInfo = client.getVersionInfo();
if (versionInfo.warnings.length > 0) {
  console.warn('API Version warnings:', versionInfo.warnings);
}
\`\`\`

### Enhanced Error Handling

\`\`\`typescript
import { isAPIError, isRateLimitError, isTimeoutError } from 'x-ads-sdk';

try {
  await client.campaigns.list(accountId);
} catch (error) {
  if (isAPIError(error)) {
    console.log('API Error:', error.statusCode, error.message);
    console.log('Retryable:', error.isRetryable());
  } else if (isRateLimitError(error)) {
    console.log('Rate limited until:', error.resetTime);
  } else if (isTimeoutError(error)) {
    console.log('Request timed out after:', error.timeoutMs, 'ms');
  }
}
\`\`\`

Generated on ${new Date().toISOString()}
`

  writeFileSync(join(docsDir, "migration-guide.md"), migrationGuide)
  log("green", "✅ Migration guide generated")
}

function generateDevGuide() {
  log("cyan", "🛠️ Generating development guide...")

  const devGuide = `# Development Guide

## Setting up the Development Environment

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/kage1020/x-ads-sdk.git
   cd x-ads-sdk
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run tests**
   \`\`\`bash
   npm test
   \`\`\`

4. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

## Project Structure

\`\`\`
src/
├── auth/           # OAuth authentication
├── client/         # HTTP client and base functionality
├── modules/        # API modules (accounts, campaigns, etc.)
├── plugins/        # Plugin system implementation
├── paginators/     # Pagination utilities
├── types/          # TypeScript type definitions
├── errors/         # Error classes and utilities
└── __tests__/      # Test files
\`\`\`

## Adding New Features

### 1. Create the Module
\`\`\`typescript
// src/modules/new-feature.ts
import { HttpClient } from '../client/base.js';

export class NewFeatureModule {
  constructor(private httpClient: HttpClient) {}

  async list(accountId: string) {
    return this.httpClient.get(\`/accounts/\${accountId}/new-features\`);
  }
}
\`\`\`

### 2. Add Type Definitions
\`\`\`typescript
// src/types/new-feature.ts
export interface NewFeature {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
}
\`\`\`

### 3. Add to Main Client
\`\`\`typescript
// src/client.ts
import { NewFeatureModule } from './modules/new-feature.js';

export class XAdsClient {
  public newFeatures: NewFeatureModule;

  constructor(config: ClientConfig) {
    // ... existing code
    this.newFeatures = new NewFeatureModule(this.httpClient);
  }
}
\`\`\`

### 4. Write Tests
\`\`\`typescript
// src/modules/__tests__/new-feature.test.ts
import { describe, it, expect } from 'vitest';
import { NewFeatureModule } from '../new-feature.js';

describe('NewFeatureModule', () => {
  it('should list new features', async () => {
    // Test implementation
  });
});
\`\`\`

## Testing Strategy

- **Unit Tests**: Test individual modules and functions
- **Integration Tests**: Test module interactions
- **Type Tests**: Ensure TypeScript types are correct
- **Coverage**: Maintain >90% test coverage

## Plugin Development

\`\`\`typescript
import { XAdsPlugin } from 'x-ads-sdk';

export class MyPlugin implements XAdsPlugin {
  name = 'my-plugin';

  async beforeRequest(config: any) {
    // Modify request before sending
    return config;
  }

  async afterResponse(response: any, config: any) {
    // Process response after receiving
    return response;
  }

  async onError(error: any, config: any) {
    // Handle errors
    throw error;
  }
}
\`\`\`

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Run tests: \`npm test\`
4. Build package: \`npm run build\`
5. Generate docs: \`npm run docs\`
6. Create PR to main branch
7. After merge, GitHub Actions will automatically publish

Generated on ${new Date().toISOString()}
`

  const docsDir = join(rootDir, "docs")
  writeFileSync(join(docsDir, "development-guide.md"), devGuide)
  log("green", "✅ Development guide generated")
}

function main() {
  log("magenta", "🚀 Starting documentation generation...")

  try {
    generateTypeDoc()
    generateAdditionalDocs()
    generateDevGuide()

    log("green", "🎉 Documentation generation completed successfully!")
    log("cyan", "\nGenerated files:")
    log("white", "  - docs/                 (HTML documentation)")

    log("white", "  - docs/api.json         (JSON API reference)")
    log("white", "  - docs/api-coverage.md  (API coverage report)")
    log("white", "  - docs/migration-guide.md (Migration guide)")
    log("white", "  - docs/development-guide.md (Development guide)")

    log("cyan", "\nTo serve documentation locally:")
    log("white", "  npm run docs:serve")
  } catch (error) {
    log("red", "❌ Documentation generation failed:")
    log("red", error.message)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
