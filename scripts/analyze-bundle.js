#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * 
 * Analyzes the bundle size and provides optimization recommendations
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, statSync } from 'fs';
import { gzipSync } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getGzipSize(filePath) {
  const content = readFileSync(filePath);
  const compressed = gzipSync(content);
  return compressed.length;
}

function analyzeFile(filePath, label) {
  if (!existsSync(filePath)) {
    log('red', `❌ File not found: ${filePath}`);
    return null;
  }

  const stats = statSync(filePath);
  const originalSize = stats.size;
  const gzipSize = getGzipSize(filePath);
  const compressionRatio = ((originalSize - gzipSize) / originalSize * 100).toFixed(1);

  log('cyan', `📄 ${label}:`);
  log('white', `   Original: ${formatBytes(originalSize)}`);
  log('white', `   Gzipped:  ${formatBytes(gzipSize)} (${compressionRatio}% compression)`);

  return { originalSize, gzipSize, compressionRatio };
}

function analyzeBundleComposition() {
  log('magenta', '📊 Bundle Composition Analysis');
  log('cyan', '=' .repeat(50));

  const distDir = join(rootDir, 'dist');
  
  // Analyze main compiled output
  const mainFiles = [
    { path: join(distDir, 'index.js'), label: 'Main Entry Point' },
    { path: join(distDir, 'client.js'), label: 'XAds Client' },
    { path: join(distDir, 'auth/oauth.js'), label: 'OAuth Authentication' },
    { path: join(distDir, 'errors/index.js'), label: 'Error Classes' }
  ];

  let totalOriginal = 0;
  let totalGzipped = 0;

  mainFiles.forEach(({ path, label }) => {
    const analysis = analyzeFile(path, label);
    if (analysis) {
      totalOriginal += analysis.originalSize;
      totalGzipped += analysis.gzipSize;
    }
  });

  log('yellow', '\n📦 Total Core Bundle:');
  log('white', `   Original: ${formatBytes(totalOriginal)}`);
  log('white', `   Gzipped:  ${formatBytes(totalGzipped)}`);

  // Analyze modules
  log('cyan', '\n🔍 Module Breakdown:');
  const moduleDir = join(distDir, 'modules');
  if (existsSync(moduleDir)) {
    const modules = [
      { file: 'accounts.js', name: 'Accounts Module' },
      { file: 'campaigns.js', name: 'Campaigns Module' },
      { file: 'ad-groups.js', name: 'Ad Groups Module' },
      { file: 'analytics.js', name: 'Analytics Module' }
    ];

    modules.forEach(({ file, name }) => {
      const filePath = join(moduleDir, file);
      analyzeFile(filePath, name);
    });
  }

  return { totalOriginal, totalGzipped };
}

function provideBundleSizeRecommendations(totalGzipped) {
  log('magenta', '\n💡 Bundle Size Recommendations');
  log('cyan', '=' .repeat(50));

  const sizeMB = totalGzipped / (1024 * 1024);
  const sizeKB = totalGzipped / 1024;

  if (sizeKB < 50) {
    log('green', '✅ Excellent: Your bundle is very small and efficient!');
    log('white', '   - Great for fast loading and minimal bandwidth usage');
    log('white', '   - Perfect for serverless and edge deployments');
  } else if (sizeKB < 100) {
    log('yellow', '⚠️  Good: Your bundle size is reasonable');
    log('white', '   - Consider tree shaking unused exports');
    log('white', '   - Look for opportunities to lazy load features');
  } else if (sizeKB < 200) {
    log('yellow', '⚠️  Large: Consider optimization');
    log('white', '   - Implement code splitting for optional features');
    log('white', '   - Remove unused dependencies');
    log('white', '   - Consider lazy loading heavy modules');
  } else {
    log('red', '❌ Very Large: Optimization required');
    log('white', '   - Implement aggressive code splitting');
    log('white', '   - Review all dependencies for necessity');
    log('white', '   - Consider plugin architecture for optional features');
  }

  log('white', '\n🎯 Optimization Strategies:');
  log('white', '   - Tree shaking: Ensure only used exports are bundled');
  log('white', '   - Code splitting: Separate optional features');
  log('white', '   - Lazy loading: Load modules on demand');
  log('white', '   - Dependency audit: Remove unused packages');
  log('white', '   - Minification: Use terser for production builds');
}

function compareWithSimilarPackages() {
  log('magenta', '\n📈 Comparison with Similar Packages');
  log('cyan', '=' .repeat(50));

  const comparisons = [
    { name: 'node-twitter-api-v2', size: '~150KB', description: 'Popular X/Twitter API client' },
    { name: 'twitter-lite', size: '~80KB', description: 'Lightweight Twitter client' },
    { name: 'axios', size: '~50KB', description: 'HTTP client library' },
    { name: 'node-fetch', size: '~20KB', description: 'Fetch polyfill' }
  ];

  log('white', 'Similar packages for context:');
  comparisons.forEach(({ name, size, description }) => {
    log('white', `   - ${name}: ${size} (${description})`);
  });

  log('white', '\n🎯 SDK-specific considerations:');
  log('white', '   - X Ads API SDKs need comprehensive type definitions');
  log('white', '   - OAuth 1.0a implementation adds necessary overhead');
  log('white', '   - Error handling and retry logic are essential');
  log('white', '   - Plugin system provides extensibility without bloat');
}

function analyzeTreeShakability() {
  log('magenta', '\n🌳 Tree Shakability Analysis');
  log('cyan', '=' .repeat(50));

  // Check if package.json has proper ESM configuration
  const packageJsonPath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  log('white', '📋 ESM Configuration:');
  log('white', `   - type: ${packageJson.type || 'commonjs'} ${packageJson.type === 'module' ? '✅' : '❌'}`);
  log('white', `   - main: ${packageJson.main || 'not specified'}`);
  log('white', `   - exports: ${packageJson.exports ? '✅ defined' : '❌ not defined'}`);
  log('white', `   - sideEffects: ${packageJson.sideEffects !== undefined ? packageJson.sideEffects : 'not specified'}`);

  log('white', '\n🎯 Tree Shaking Recommendations:');
  if (packageJson.type !== 'module') {
    log('yellow', '   ⚠️  Consider setting "type": "module" in package.json');
  }
  if (!packageJson.exports) {
    log('yellow', '   ⚠️  Define "exports" field for better module resolution');
  }
  if (packageJson.sideEffects === undefined) {
    log('yellow', '   ⚠️  Specify "sideEffects": false for better tree shaking');
  }

  log('white', '\n✅ Good practices already in place:');
  log('white', '   - ES modules for better tree shaking');
  log('white', '   - Individual module exports');
  log('white', '   - Plugin system for optional features');
}

function main() {
  log('magenta', '🔍 X Ads SDK Bundle Analysis');
  log('cyan', '=' .repeat(60));

  try {
    // Ensure we have a built version
    log('blue', '🔨 Building project for analysis...');
    execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });
    log('green', '✅ Build completed');

    // Run bundle analysis
    const { totalGzipped } = analyzeBundleComposition();
    
    provideBundleSizeRecommendations(totalGzipped);
    compareWithSimilarPackages();
    analyzeTreeShakability();

    log('green', '\n🎉 Bundle analysis completed!');
    log('cyan', '\nTo optimize bundle size:');
    log('white', '  - Run: npm run build:bundle (creates optimized bundles)');
    log('white', '  - Check: dist/index.esm.min.js for production build');
    log('white', '  - Use: import { XAdsClient } from "x-ads-sdk" for tree shaking');

  } catch (error) {
    log('red', '❌ Analysis failed:');
    log('red', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}