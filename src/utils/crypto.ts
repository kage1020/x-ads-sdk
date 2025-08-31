/**
 * Cross-platform crypto utilities using Web standards
 *
 * This module uses the Web Crypto API which is available in:
 * - Modern browsers
 * - Node.js 16+ (via globalThis.crypto)
 * - Deno (native support)
 * - Bun (native support)
 */

/**
 * Generate cryptographically secure random bytes
 * @param size - Number of bytes to generate
 * @returns Promise<Uint8Array>
 */
export async function randomBytes(size: number): Promise<Uint8Array> {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Web Crypto API not available. This environment is not supported.');
  }
  return crypto.getRandomValues(new Uint8Array(size));
}

/**
 * Convert bytes to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert string to UTF-8 bytes
 */
export function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Convert bytes to base64 string using standard browser API
 */
export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof btoa === 'undefined') {
    throw new Error('btoa not available. This environment is not supported.');
  }
  return btoa(String.fromCharCode(...bytes));
}

/**
 * HMAC signature generation using Web Crypto API
 * @param algorithm - 'SHA-1' or 'SHA-256'
 * @param key - Signing key as string
 * @param data - Data to sign as string
 * @returns Promise<string> - Base64 encoded signature
 */
export async function hmac(
  algorithm: 'SHA-1' | 'SHA-256',
  key: string,
  data: string
): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      'Web Crypto API SubtleCrypto not available. This environment is not supported.'
    );
  }

  const keyBytes = stringToBytes(key);
  const dataBytes = stringToBytes(data);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes as BufferSource,
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBytes as BufferSource);
  return bytesToBase64(new Uint8Array(signature));
}

/**
 * Generate a cryptographically secure random hex string
 * @param length - Length of the hex string (will generate length/2 bytes)
 * @returns Promise<string> - Hex string
 */
export async function randomHex(length: number): Promise<string> {
  const bytes = await randomBytes(Math.ceil(length / 2));
  const hex = bytesToHex(bytes);
  return hex.slice(0, length);
}
