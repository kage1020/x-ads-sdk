import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    target: 'es2020',
    format: 'esm',
  },
  test: {
    environment: 'node',
    globals: true,
    // Suppress unhandled promise rejection warnings from mock operations
    testTimeout: 10000,
    setupFiles: ['./vitest.setup.ts'],
    // Force use of esbuild instead of Rollup for transforms
    deps: {
      optimizer: {
        ssr: {
          exclude: ['rollup'],
        },
      },
    },
    // Use esbuild for TypeScript transformation instead of Rollup
    testTransformMode: {
      ssr: ['**/*.ts'],
    },
    include: ['src/**/*.test.ts', 'src/**/__tests__/**/*.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/__tests__/**',
        'src/types/**', // Type definitions
        'src/index.ts', // Simple re-export file
        'src/vite-env.d.ts', // Vite type definitions
        'node_modules/',
        'dist/',
        'coverage/',
        'docs/',
        'examples/',
        'scripts/',
        '**/*.d.ts',
        '*.config.*',
      ],
      thresholds: {
        global: {
          branches: 75,
          functions: 75,
          lines: 75,
          statements: 75,
        },
      },
    },
  },
});
