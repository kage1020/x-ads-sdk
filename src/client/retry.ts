export interface RetryOptions {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryableStatusCodes: number[];
}

export interface RetryContext {
  attempt: number;
  lastError: Error;
  nextDelay: number;
}

export class RetryHandler {
  private options: RetryOptions;

  constructor(options: Partial<RetryOptions> = {}) {
    this.options = {
      maxRetries: 3,
      initialDelay: 1000, // 1 second
      maxDelay: 30000, // 30 seconds
      backoffFactor: 2,
      retryableStatusCodes: [429, 500, 502, 503, 504],
      ...options
    };
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: { endpoint?: string; method?: string } = {}
  ): Promise<T> {
    let lastError: Error | null = null;
    let delay = this.options.initialDelay;

    for (let attempt = 0; attempt <= this.options.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on the last attempt
        if (attempt === this.options.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!this.isRetryableError(error as Error)) {
          break;
        }

        // Log retry attempt
        console.warn(
          `Attempt ${attempt + 1} failed for ${context.method || 'request'} ${context.endpoint || ''}. ` +
          `Retrying in ${delay}ms. Error: ${(error as Error).message}`
        );

        // Wait before retrying
        await this.sleep(delay);

        // Calculate next delay with exponential backoff
        delay = Math.min(delay * this.options.backoffFactor, this.options.maxDelay);
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  private isRetryableError(error: Error): boolean {
    // Check for network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true;
    }

    // Check for timeout errors
    if (error.name === 'AbortError') {
      return true;
    }

    // Check for API errors with retryable status codes
    if ('statusCode' in error) {
      const statusCode = (error as any).statusCode;
      return this.options.retryableStatusCodes.includes(statusCode);
    }

    // Check for rate limit errors (should be handled by rate limiter, but just in case)
    if (error.name === 'RateLimitError') {
      return true;
    }

    return false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getNextDelay(attempt: number): number {
    return Math.min(
      this.options.initialDelay * Math.pow(this.options.backoffFactor, attempt),
      this.options.maxDelay
    );
  }

  isRetryable(error: Error): boolean {
    return this.isRetryableError(error);
  }
}