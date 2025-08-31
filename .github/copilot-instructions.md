# X Ads SDK Development Instructions

**ALWAYS follow these instructions first and only search or explore further when the information here is incomplete or found to be in error.**

## Working Effectively

### Environment Setup

- Requires Node.js >= 20.0.0
- Uses npm for package management
- TypeScript/ESM project with modern tooling

### Bootstrap and Build Process

- `npm install` -- installs dependencies in ~6-33 seconds (varies by cache/network)
- `npm run lint` -- runs ESLint in ~1.4 seconds. ALWAYS run before committing
- `npm test` -- runs 57 tests in ~1.3 seconds. ALWAYS run before committing
- `npm run test:coverage` -- runs tests with coverage in ~1.5 seconds
- `npm run build` -- full build in ~8 seconds. NEVER CANCEL. Set timeout to 30+ minutes for safety
  - Includes TypeScript compilation (~1.6 seconds) and Rollup bundling (~6.3 seconds)
  - Creates dist/ directory with compiled JavaScript, TypeScript declarations, and source maps
- `npm run build:esm` -- TypeScript compilation only (~1.6 seconds)
- `npm run build:bundle` -- Rollup bundling only (~6.3 seconds)

### Documentation Generation

- `npm run docs` -- generates TypeDoc HTML documentation
- `npm run docs:serve` -- serves documentation on localhost:8080
- `npm run docs:generate` -- generates comprehensive docs including development guide (~8.7 seconds)
- `npm run docs:json` -- generates JSON API reference

## Validation

### ALWAYS run these validation steps after making changes:

1. `npm run lint` -- must pass with no errors
2. `npm test` -- all 57 tests must pass
3. `npm run build` -- must complete successfully
4. **Manual validation**: Test one complete scenario by running an example

### Manual Testing Scenarios

Test SDK functionality by running examples. Examples are TypeScript files that need compilation:

```bash
# Compile and run basic example (requires credentials)
npx tsc examples/basic-usage.ts --outDir dist/examples --module ESNext --target ES2020 --moduleResolution bundler --allowImportingTsExtensions false
node dist/examples/examples/basic-usage.js
```

Expected behavior:

- With valid credentials: Should connect and fetch account data
- With invalid/test credentials: Should fail with AuthenticationError (this is expected)

### CI Pipeline Validation

The CI runs these steps that your changes must pass:

- Lint: `npm run lint`
- Test: `npm test`
- Build: `npm run build`
- Security audit: `npm audit`

## Project Structure and Navigation

### Key Entry Points

- `src/index.ts` -- Main package exports
- `src/client.ts` -- XAdsClient main class (primary SDK interface)
- `package.json` -- Project configuration and scripts

### Core Directories

```
src/
├── auth/           # OAuth 1.0a authentication (oauth.ts is key file)
├── client/         # HTTP client functionality (base.ts is main)
├── errors/         # Error classes (comprehensive error handling)
├── modules/        # API modules (accounts, campaigns, ad-groups, analytics)
├── types/          # TypeScript type definitions (common.ts, api-version.ts)
├── plugins/        # Plugin system (base.ts, rate-limit-tracker.ts)
├── paginators/     # Pagination utilities
└── __tests__/      # Root-level tests
```

### Important Files to Know

- `src/client.ts` -- Main SDK client implementation
- `src/auth/oauth.ts` -- OAuth authentication logic
- `src/client/base.ts` -- Low-level HTTP client
- `src/modules/` -- All API endpoint implementations
- `src/types/common.ts` -- Core type definitions
- `examples/` -- Usage examples (TypeScript, need compilation)

### Build Output

- `dist/` -- All compiled output (auto-generated, don't edit)
- `docs/` -- Generated HTML documentation
- `coverage/` -- Test coverage reports

## Common Development Tasks

### Adding New Features

1. Add module in `src/modules/new-feature.ts`
2. Add types in `src/types/` if needed
3. Export from `src/modules/index.ts`
4. Add to client in `src/client.ts`
5. Write tests in `src/modules/__tests__/`
6. Update examples if relevant

### Testing Changes

- Unit tests: `npm test` (~1.3 seconds)
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage` (~1.5 seconds)
- Integration: Run examples to test end-to-end

### Working with Examples

Examples demonstrate SDK usage but need compilation:

- Located in `examples/` directory
- All are TypeScript files (.ts)
- Compile before running: use the tsc command shown above
- Require valid X Ads API credentials to run successfully

### Environment Configuration

The SDK requires OAuth 1.0a credentials. For testing, create `.env` file:

```env
X_CONSUMER_KEY=your_key
X_CONSUMER_SECRET=your_secret
X_ACCESS_TOKEN=your_token
X_ACCESS_TOKEN_SECRET=your_token_secret
```

## Build System Details

### TypeScript Configuration

- `tsconfig.json` -- Development configuration
- `tsconfig.build.json` -- Build configuration (extends tsconfig.json)
- Target: ES2020+, ESNext modules
- Generates declarations, source maps

### Rollup Configuration

- `rollup.config.js` -- Bundle configuration
- Creates multiple output formats: ESM, minified ESM, analysis bundle
- External dependencies: Node.js built-ins (crypto, http, https, url, querystring)

### Testing Setup

- Framework: Vitest (modern, fast Jest alternative)
- Configuration: `vitest.config.ts`
- Coverage: v8 provider with 75% thresholds
- Test files: `**/*.test.ts` and `**/__tests__/**/*.ts`

## Timing Expectations and Timeouts

**NEVER CANCEL these commands - always wait for completion:**

- `npm run build` -- 8 seconds normally, set 30+ minute timeout for safety
- `npm run docs:generate` -- 8.7 seconds normally, set 15+ minute timeout

**Fast commands (can use shorter timeouts):**

- `npm run lint` -- 1.4 seconds, set 5 minute timeout
- `npm test` -- 1.3 seconds, set 5 minute timeout
- `npm run test:coverage` -- 1.5 seconds, set 5 minute timeout

## Package Information

### Dependencies

- **Runtime**: None (pure TypeScript with Node.js built-ins)
- **Development**: TypeScript, Rollup, Vitest, ESLint, TypeDoc
- **Node.js**: >= 20.0.0 required
- **Package Type**: ESM (type: "module")

### Bundle Characteristics

- Small bundle size (~4-8KB gzipped)
- Tree-shakeable ESM exports
- Multiple output formats available
- No external runtime dependencies

## Quality Standards

### Code Quality

- ESLint with TypeScript rules enforced
- Prettier formatting (via ESLint config)
- Strict TypeScript configuration
- 75%+ test coverage requirement

### Testing Standards

- Comprehensive unit tests (57 tests currently)
- Fast test execution (<2 seconds)
- Coverage tracking with detailed reports
- Integration testing via examples

### Documentation Standards

- TypeDoc for API documentation
- Comprehensive README with examples
- Auto-generated development guides
- Migration guides for API changes

## Troubleshooting

### Common Issues

- **Build fails**: Check TypeScript errors, ensure all imports have .js extensions
- **Tests fail**: Run `npm test -- --reporter=verbose` for detailed output
- **Examples don't work**: Ensure proper compilation and valid credentials
- **Import errors**: Verify .js extensions in imports (required for ESM)

### Performance Issues

- Builds are normally fast (~8 seconds)
- If builds take >30 seconds, check for TypeScript configuration issues
- Tests should complete in <5 seconds; longer indicates test setup problems

This SDK provides a modern, type-safe interface to the X Ads API with comprehensive error handling, authentication, and developer experience features.
