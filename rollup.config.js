import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';

export default [
  // ESM build (main entry point)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      banner: '/* X Ads SDK - ESM Bundle */'
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        exportConditions: ['node']
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false, // TypeScript compiler will handle declarations
        sourceMap: true
      }),
      filesize({
        showMinifiedSize: false,
        showGzippedSize: true
      })
    ],
    external: ['node:crypto']
  },
  
  // Minified ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
      banner: '/* X Ads SDK - ESM Bundle (Minified) */'
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        exportConditions: ['node']
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
        sourceMap: true
      }),
      terser({
        compress: {
          drop_console: false, // Keep console statements for debugging
          drop_debugger: true,
          pure_funcs: ['console.debug'],
          passes: 2
        },
        mangle: {
          reserved: ['XAdsClient', 'APIError', 'RateLimitError', 'TimeoutError'],
          properties: false
        },
        format: {
          comments: /^!/,
          preserve_annotations: true
        }
      }),
      filesize({
        showMinifiedSize: true,
        showGzippedSize: true
      })
    ],
    external: ['node:crypto']
  },
];