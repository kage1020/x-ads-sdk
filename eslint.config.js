import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        global: 'readonly',
        process: 'readonly',
        console: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        AbortController: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Buffer: 'readonly',
        globalThis: 'readonly',
        RequestInit: 'readonly',
        Response: 'readonly',
        fetch: 'readonly',
        Headers: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      // Allow console statements for debugging
      'no-console': 'off',
      
      // TypeScript-specific rules
      'no-unused-vars': 'off', // Use TypeScript compiler for this
      
      // Import/export rules
      'prefer-const': 'error',
      'no-var': 'error',
      
      // General code quality
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-throw-literal': 'error'
    }
  },
  {
    ignores: [
      'dist/**',
      'docs/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts'
    ]
  }
];