import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';

export default [
  // ESM build (main entry point)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false, // TypeScript compiler will handle declarations
        sourceMap: true,
      }),
      filesize({
        showMinifiedSize: false,
        showGzippedSize: true,
      }),
    ],
  },

  // Minified ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
        sourceMap: true,
      }),
      terser(),
      filesize({
        showMinifiedSize: true,
        showGzippedSize: true,
      }),
    ],
  },
];
