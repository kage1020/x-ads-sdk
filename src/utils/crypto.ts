/**
 * Cross-platform crypto utilities
 *
 * This module provides crypto functionality that works across Node.js, Deno, Bun,
 * and browsers by detecting the runtime environment and using the appropriate APIs.
 */

/**
 * Runtime detection utilities
 */
const isNode = typeof process !== 'undefined' && process.versions?.node;
const isDeno = typeof globalThis !== 'undefined' && 'Deno' in globalThis;
const isBun = typeof globalThis !== 'undefined' && 'Bun' in globalThis;
const isBrowser = typeof window !== 'undefined' && typeof window.crypto !== 'undefined';

/**
 * Generate cryptographically secure random bytes
 * @param size - Number of bytes to generate
 * @returns Promise<Uint8Array> or Uint8Array depending on environment
 */
export async function randomBytes(size: number): Promise<Uint8Array> {
  if (isNode) {
    // Node.js
    const { randomBytes: nodeRandomBytes } = await import('node:crypto');
    return nodeRandomBytes(size);
  }

  if (isDeno) {
    // Deno
    return crypto.getRandomValues(new Uint8Array(size));
  }

  if (isBun) {
    // Bun (has both crypto.getRandomValues and node:crypto compatibility)
    return crypto.getRandomValues(new Uint8Array(size));
  }

  if (isBrowser) {
    // Browser - Web Crypto API
    return crypto.getRandomValues(new Uint8Array(size));
  }

  throw new Error('No supported crypto implementation found');
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
 * Convert bytes to base64 string
 */
export function bytesToBase64(bytes: Uint8Array): string {
  if (isNode || isBun) {
    // Node.js and Bun have Buffer
    return Buffer.from(bytes).toString('base64');
  }

  if (isDeno) {
    // Deno has btoa in globals
    return btoa(String.fromCharCode(...bytes));
  }

  if (isBrowser) {
    // Browser has btoa
    return btoa(String.fromCharCode(...bytes));
  }

  throw new Error('No supported base64 implementation found');
}

/**
 * HMAC signature generation
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
  if (isNode) {
    // Node.js
    const { createHmac } = await import('node:crypto');
    const hashAlgorithm = algorithm === 'SHA-256' ? 'sha256' : 'sha1';
    return createHmac(hashAlgorithm, key).update(data).digest('base64');
  }

  if (isDeno || isBun || isBrowser) {
    // Web Crypto API (available in Deno, Bun, and browsers)
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

  throw new Error('No supported HMAC implementation found');
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
