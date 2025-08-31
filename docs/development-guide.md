# Development Guide

## Setting up the Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/kage1020/x-ads-sdk.git
   cd x-ads-sdk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── auth/           # OAuth authentication
├── client/         # HTTP client and base functionality  
├── modules/        # API modules (accounts, campaigns, etc.)
├── plugins/        # Plugin system implementation
├── paginators/     # Pagination utilities
├── types/          # TypeScript type definitions
├── errors/         # Error classes and utilities
└── __tests__/      # Test files
```

## Adding New Features

### 1. Create the Module
```typescript
// src/modules/new-feature.ts
import { HttpClient } from '../client/base.js';

export class NewFeatureModule {
  constructor(private httpClient: HttpClient) {}
  
  async list(accountId: string) {
    return this.httpClient.get(`/accounts/${accountId}/new-features`);
  }
}
```

### 2. Add Type Definitions
```typescript
// src/types/new-feature.ts
export interface NewFeature {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
}
```

### 3. Add to Main Client
```typescript
// src/client.ts
import { NewFeatureModule } from './modules/new-feature.js';

export class XAdsClient {
  public newFeatures: NewFeatureModule;
  
  constructor(config: ClientConfig) {
    // ... existing code
    this.newFeatures = new NewFeatureModule(this.httpClient);
  }
}
```

### 4. Write Tests
```typescript
// src/modules/__tests__/new-feature.test.ts
import { describe, it, expect } from 'vitest';
import { NewFeatureModule } from '../new-feature.js';

describe('NewFeatureModule', () => {
  it('should list new features', async () => {
    // Test implementation
  });
});
```

## Testing Strategy

- **Unit Tests**: Test individual modules and functions
- **Integration Tests**: Test module interactions
- **Type Tests**: Ensure TypeScript types are correct
- **Coverage**: Maintain >90% test coverage

## Plugin Development

```typescript
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
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Run tests: `npm test`
4. Build package: `npm run build`
5. Generate docs: `npm run docs`
6. Create PR to main branch
7. After merge, GitHub Actions will automatically publish

Generated on 2025-08-31T04:47:15.418Z
