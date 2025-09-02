import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import { AccountResource } from '../account.js';

describe('AccountResource', () => {
  const mockHttpClient = {
    request: vi.fn(),
  } as unknown as HttpClient;

  const accountResource = new AccountResource(mockHttpClient);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should make correct API request to list accounts', async () => {
      const mockResponse = {
        data: [{ id: 'account1', name: 'Test Account' }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await accountResource.list();

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass options to the request', async () => {
      const options = { params: { with_deleted: true } };
      const mockResponse = { data: [], request: { params: options } };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      await accountResource.list(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts',
        ...options,
      });
    });
  });

  describe('get', () => {
    it('should make correct API request to get account by ID', async () => {
      const accountId = 'test-account-id';
      const mockResponse = {
        data: [{ id: accountId, name: 'Test Account' }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await accountResource.get(accountId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    it('should make correct API request to create account', async () => {
      const createData = { name: 'New Account', industry_type: 'technology' };
      const mockResponse = {
        data: [{ id: 'new-account-id', ...createData }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await accountResource.create(createData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts',
        body: createData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should make correct API request to update account', async () => {
      const accountId = 'test-account-id';
      const updateData = { name: 'Updated Account' };
      const mockResponse = {
        data: [{ id: accountId, ...updateData }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await accountResource.update(accountId, updateData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}`,
        body: updateData,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
