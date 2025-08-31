/**
 * HTTP-related utility functions
 */

/**
 * Convert Headers object to a plain Record<string, string>
 * @param headers - Headers object from fetch API
 * @returns Plain object with header key-value pairs
 */
export function headersToRecord(headers: Headers): Record<string, string> {
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    record[key.toLowerCase()] = value;
  });
  return record;
}

/**
 * Build URL with query parameters
 * @param baseUrl - Base URL
 * @param endpoint - API endpoint
 * @param params - Query parameters
 * @returns Complete URL with parameters
 */
export function buildURL(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, unknown>
): string {
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, String(params[key]));
      }
    });
  }

  return url.toString();
}

/**
 * Extract endpoint path from a complete URL
 * @param fullUrl - Complete URL
 * @param basePath - Base path to remove (e.g., version path)
 * @returns Endpoint path
 */
export function extractEndpointFromUrl(fullUrl: string, basePath = ''): string {
  try {
    const url = new URL(fullUrl);
    return url.pathname.replace(basePath, '');
  } catch {
    // If URL parsing fails, return the input as-is
    return fullUrl;
  }
}
