module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended'
  ],
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
  },
  env: {
    node: true,
    es6: true
  },
  globals: {
    globalThis: 'readonly',
    RequestInit: 'readonly',
    Response: 'readonly',
    fetch: 'readonly',
    Headers: 'readonly'
  },
  ignorePatterns: [
    'dist/**',
    'docs/**',
    'node_modules/**',
    '*.config.js',
    '*.config.ts'
  ]
};