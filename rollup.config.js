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
    external: [
      // Node.js built-ins
      'crypto', 'http', 'https', 'url', 'querystring'
    ]
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
    external: [
      // Node.js built-ins
      'crypto', 'http', 'https', 'url', 'querystring'
    ]
  },

  // Bundle analyzer build (includes all dependencies for size analysis)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/bundle-analysis.js',
      format: 'esm',
      sourcemap: false
    },
    plugins: [
      resolve({
        preferBuiltins: false, // Include polyfills to see full bundle size
        browser: false
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        sourceMap: false
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3
        },
        mangle: true,
        format: {
          comments: false
        }
      }),
      filesize({
        showMinifiedSize: true,
        showGzippedSize: true,
        reporter: [
          'boxen', 
          function(options, bundle, { bundleSize, gzipSize }) {
            console.log('📦 Bundle Analysis:');
            console.log(`   Original size: ${(bundleSize / 1024).toFixed(2)} KB`);
            console.log(`   Gzipped size:  ${(gzipSize / 1024).toFixed(2)} KB`);
            
            // Bundle size recommendations
            if (gzipSize < 50 * 1024) {
              console.log('   ✅ Excellent: Bundle size is under 50KB (gzipped)');
            } else if (gzipSize < 100 * 1024) {
              console.log('   ⚠️  Good: Bundle size is under 100KB (gzipped)');
            } else {
              console.log('   ❌ Large: Consider code splitting or removing unused code');
            }
          }
        ]
      })
    ],
    external: [] // Include everything for size analysis
  }
];