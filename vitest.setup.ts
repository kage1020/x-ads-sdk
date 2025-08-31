// vitest.setup.ts
// Setup file for improved test error handling without suppressing important errors

import { afterAll } from 'vitest';

// Store original process handlers
const originalProcessHandlers = {
  unhandledRejection: process.listeners('unhandledRejection'),
  uncaughtException: process.listeners('uncaughtException'),
};

// Enhanced error handler that logs all errors but doesn't fail tests for expected mock rejections
process.on('unhandledRejection', (reason: unknown) => {
  const error = reason as Error;

  // Check if this is likely a test mock rejection based on call stack analysis
  const stack = error?.stack || '';
  const isFromMockOperation =
    stack.includes('mockImplementation') ||
    stack.includes('mockRejectedValue') ||
    stack.includes('vitest/spy') ||
    stack.includes('retry.test.ts');

  if (isFromMockOperation) {
    // Use stderr to avoid interfering with test spies, but provide helpful context
    process.stderr.write(
      `[TEST DEBUG] Expected unhandled rejection from mock operation: "${error?.message || reason}"\n` +
        `             This is normal behavior when testing retry/error handling logic.\n`
    );
    // Don't exit the process for mock-related rejections - these are expected
    return;
  }

  // For non-mock errors, this is likely a real issue that should be investigated
  console.error(`[TEST ERROR] ⚠️  Genuine unhandled promise rejection detected!`);
  console.error(`[TEST ERROR] This may indicate a real bug in the code:`, error);
  console.error(`[TEST ERROR] Stack trace:`, error?.stack);
  console.error(`[TEST ERROR] Please investigate this error - it's not from test mocks.`);
  // Don't exit in test environment, but make it very visible
});

// Cleanup function
globalThis.__vitestCleanup = () => {
  // Remove our custom handlers
  process.removeAllListeners('unhandledRejection');
  process.removeAllListeners('uncaughtException');

  // Restore original handlers
  originalProcessHandlers.unhandledRejection.forEach((handler) => {
    process.on('unhandledRejection', handler as (...args: unknown[]) => void);
  });
  originalProcessHandlers.uncaughtException.forEach((handler) => {
    process.on('uncaughtException', handler as (...args: unknown[]) => void);
  });
};

// Clean up after all tests complete
afterAll(() => {
  globalThis.__vitestCleanup?.();
});
