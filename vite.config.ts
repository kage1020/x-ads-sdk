import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XAdsSDK',
      formats: ['es', 'cjs'],
      fileName: (format) => `x-ads-sdk.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['node:crypto', 'node:url'],
      output: {
        // Provide global variables for these externals in UMD build
        globals: {
          'node:crypto': 'crypto',
          'node:url': 'url'
        }
      }
    },
    sourcemap: true,
    target: 'es2020'
  }
});