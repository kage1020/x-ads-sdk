import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XAdsSDK',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'index.js';
          case 'cjs':
            return 'index.cjs';
          case 'umd':
            return 'index.umd.js';
          default:
            return `index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: ['oauth-1.0a'],
      output: {
        globals: {
          'oauth-1.0a': 'OAuth',
        },
      },
    },
    sourcemap: true,
    minify: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
