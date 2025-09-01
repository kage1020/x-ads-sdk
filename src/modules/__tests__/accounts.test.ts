import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type { Account, AccountListParams, UpdateAccountData } from '../../types/account.js';
import { AccountStatus, AccountType } from '../../types/account.js';
import type { PaginatedResponse } from '../../types/common.js';
import { AccountsModule } from '../accounts.js';

describe('AccountsModule', () => {
  let mockClient: HttpClient;
  let accountsModule: AccountsModule;

  const mockAccount: Account = {
    id: 'account123',
    name: 'Test Account',
    status: AccountStatus.ACTIVE,
    type: AccountType.PROMOTED_ACCOUNT,
    currency: 'USD',
    timezone: 'America/New_York',
    timezone_switch_at: '2023-01-01T00:00:00Z',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    deleted: false,
  };

  const mockPaginatedResponse: PaginatedResponse<Account> = {
    data: [mockAccount],
    request: {
      params: {},
    },
    next_cursor: 'next_cursor_value',
    previous_cursor: 'prev_cursor_value',
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn().mockResolvedValue({ data: mockAccount }),
      delete: vi.fn(),
    } as unknown as HttpClient;

    // Default GET mock returns paginated response
    vi.mocked(mockClient.get).mockResolvedValue({ data: mockPaginatedResponse });

    accountsModule = new AccountsModule(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with correct base endpoint', () => {
      expect(accountsModule).toBeInstanceOf(AccountsModule);
    });
  });

  describe('list', () => {
    it('should call client.get with correct endpoint and default params', async () => {
      await accountsModule.list();

      expect(mockClient.get).toHaveBeenCalledWith('/accounts', {});
    });

    it('should call client.get with custom params', async () => {
      const params: AccountListParams = {
        with_deleted: true,
        count: 50,
        cursor: 'test_cursor',
        sort_by: 'created_at',
      };

      await accountsModule.list(params);

      expect(mockClient.get).toHaveBeenCalledWith('/accounts', params);
    });

    it('should return paginated response', async () => {
      const result = await accountsModule.list();

      expect(result).toEqual(mockPaginatedResponse);
    });
  });

  describe('get', () => {
    it('should call client.get with correct endpoint', async () => {
      // Mock GET to return single account for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockAccount });

      await accountsModule.get('account123');

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123');
    });

    it('should return account data', async () => {
      // Mock GET to return single account for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockAccount });

      const result = await accountsModule.get('account123');

      expect(result).toEqual(mockAccount);
    });
  });

  describe('update', () => {
    const updateData: UpdateAccountData = {
      name: 'Updated Account',
      timezone: 'Europe/London',
    };

    it('should call client.put with correct endpoint and data', async () => {
      await accountsModule.update('account123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/accounts/account123', updateData);
    });

    it('should return updated account', async () => {
      const result = await accountsModule.update('account123', updateData);

      expect(result).toEqual(mockAccount);
    });
  });

  describe('getByStatus', () => {
    const mockActiveAccount = { ...mockAccount, status: AccountStatus.ACTIVE };
    const mockSuspendedAccount = {
      ...mockAccount,
      id: 'account456',
      status: AccountStatus.SUSPENDED,
    };
    const mockDeletedAccount = {
      ...mockAccount,
      id: 'account789',
      status: AccountStatus.DELETED,
    };

    const mockMixedResponse: PaginatedResponse<Account> = {
      data: [mockActiveAccount, mockSuspendedAccount, mockDeletedAccount],
      request: { params: {} },
      next_cursor: 'next',
      previous_cursor: 'prev',
    };

    beforeEach(() => {
      vi.spyOn(accountsModule, 'list').mockResolvedValue(mockMixedResponse);
    });

    it('should filter active accounts', async () => {
      const result = await accountsModule.getByStatus(AccountStatus.ACTIVE);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockActiveAccount],
      });
    });

    it('should filter suspended accounts', async () => {
      const result = await accountsModule.getByStatus(AccountStatus.SUSPENDED);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockSuspendedAccount],
      });
    });

    it('should filter deleted accounts and set with_deleted to true', async () => {
      const spy = vi.spyOn(accountsModule, 'list');

      const result = await accountsModule.getByStatus(AccountStatus.DELETED);

      expect(spy).toHaveBeenCalledWith({ with_deleted: true });
      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockDeletedAccount],
      });
    });

    it('should merge additional params except with_deleted', async () => {
      const spy = vi.spyOn(accountsModule, 'list');
      const params = { count: 50, sort_by: 'created_at', cursor: 'test' };

      await accountsModule.getByStatus(AccountStatus.ACTIVE, params);

      expect(spy).toHaveBeenCalledWith({
        ...params,
        with_deleted: false,
      });
    });

    it('should override with_deleted for deleted status even if params include it', async () => {
      const spy = vi.spyOn(accountsModule, 'list');

      await accountsModule.getByStatus(AccountStatus.DELETED, { count: 25 });

      expect(spy).toHaveBeenCalledWith({
        count: 25,
        with_deleted: true,
      });
    });
  });

  describe('getActive', () => {
    it('should call getByStatus with ACTIVE status', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await accountsModule.getActive(params);

      expect(spy).toHaveBeenCalledWith(AccountStatus.ACTIVE, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');

      await accountsModule.getActive();

      expect(spy).toHaveBeenCalledWith(AccountStatus.ACTIVE, undefined);
    });

    it('should return filtered active accounts', async () => {
      const mockFilteredResponse = { ...mockPaginatedResponse };
      vi.spyOn(accountsModule, 'getByStatus').mockResolvedValue(mockFilteredResponse);

      const result = await accountsModule.getActive();

      expect(result).toEqual(mockFilteredResponse);
    });
  });

  describe('getSuspended', () => {
    it('should call getByStatus with SUSPENDED status', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await accountsModule.getSuspended(params);

      expect(spy).toHaveBeenCalledWith(AccountStatus.SUSPENDED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');

      await accountsModule.getSuspended();

      expect(spy).toHaveBeenCalledWith(AccountStatus.SUSPENDED, undefined);
    });
  });

  describe('getDeleted', () => {
    it('should call getByStatus with DELETED status', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await accountsModule.getDeleted(params);

      expect(spy).toHaveBeenCalledWith(AccountStatus.DELETED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');

      await accountsModule.getDeleted();

      expect(spy).toHaveBeenCalledWith(AccountStatus.DELETED, undefined);
    });
  });

  describe('getFirstActive', () => {
    it('should return first active account when accounts exist', async () => {
      const mockActiveAccount = { ...mockAccount, status: AccountStatus.ACTIVE };
      const mockResponse: PaginatedResponse<Account> = {
        data: [mockActiveAccount],
        request: { params: {} },
      };

      vi.spyOn(accountsModule, 'getActive').mockResolvedValue(mockResponse);

      const result = await accountsModule.getFirstActive();

      expect(result).toEqual(mockActiveAccount);
      expect(accountsModule.getActive).toHaveBeenCalledWith({ count: 1 });
    });

    it('should return null when no active accounts exist', async () => {
      const mockEmptyResponse: PaginatedResponse<Account> = {
        data: [],
        request: { params: {} },
      };

      vi.spyOn(accountsModule, 'getActive').mockResolvedValue(mockEmptyResponse);

      const result = await accountsModule.getFirstActive();

      expect(result).toBeNull();
      expect(accountsModule.getActive).toHaveBeenCalledWith({ count: 1 });
    });

    it('should pass count parameter to getActive', async () => {
      const spy = vi.spyOn(accountsModule, 'getActive');
      spy.mockResolvedValue({ data: [], request: { params: {} } });

      await accountsModule.getFirstActive();

      expect(spy).toHaveBeenCalledWith({ count: 1 });
    });
  });

  describe('error handling', () => {
    it('should propagate client errors from list', async () => {
      const error = new Error('Network error');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(accountsModule.list()).rejects.toThrow('Network error');
    });

    it('should propagate client errors from get', async () => {
      const error = new Error('Not found');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(accountsModule.get('account123')).rejects.toThrow('Not found');
    });

    it('should propagate client errors from update', async () => {
      const error = new Error('Update failed');
      vi.mocked(mockClient.put).mockRejectedValue(error);

      const updateData = { name: 'Updated' };
      await expect(accountsModule.update('account123', updateData)).rejects.toThrow(
        'Update failed'
      );
    });
  });

  describe('integration with all enum values', () => {
    it('should work with all AccountStatus values', async () => {
      const statuses = [AccountStatus.ACTIVE, AccountStatus.SUSPENDED, AccountStatus.DELETED];

      for (const status of statuses) {
        await accountsModule.getByStatus(status);
        expect(mockClient.get).toHaveBeenCalled();
      }
    });

    it('should handle all account properties', async () => {
      const fullAccount: Account = {
        id: 'account123',
        name: 'Full Account',
        status: AccountStatus.ACTIVE,
        type: AccountType.PROMOTED_ACCOUNT,
        currency: 'EUR',
        timezone: 'Europe/Paris',
        timezone_switch_at: '2023-06-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-06-01T00:00:00Z',
        deleted: false,
      };

      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: fullAccount });

      const result = await accountsModule.get('account123');

      expect(result).toEqual(fullAccount);
      expect(result.timezone_switch_at).toBe('2023-06-01T00:00:00Z');
    });

    it('should handle account without optional fields', async () => {
      const minimalAccount: Account = {
        id: 'account456',
        name: 'Minimal Account',
        status: AccountStatus.ACTIVE,
        type: AccountType.PROMOTED_ACCOUNT,
        currency: 'USD',
        timezone: 'UTC',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      };

      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: minimalAccount });

      const result = await accountsModule.get('account456');

      expect(result).toEqual(minimalAccount);
      expect(result.timezone_switch_at).toBeUndefined();
      expect(result.deleted).toBeUndefined();
    });
  });

  describe('complex workflow scenarios', () => {
    it('should handle account lifecycle: list, get, update', async () => {
      // List all accounts
      const listResult = await accountsModule.list();
      expect(listResult).toEqual(mockPaginatedResponse);

      // Get specific account
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockAccount });
      const getResult = await accountsModule.get('account123');
      expect(getResult).toEqual(mockAccount);

      // Update account
      const updateData = { name: 'Updated Name' };
      const updateResult = await accountsModule.update('account123', updateData);
      expect(updateResult).toEqual(mockAccount);

      // Verify all operations called the correct endpoints
      expect(mockClient.get).toHaveBeenCalledWith('/accounts', {});
      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123');
      expect(mockClient.put).toHaveBeenCalledWith('/accounts/account123', updateData);
    });

    it('should handle filtering accounts by different statuses', async () => {
      const spy = vi.spyOn(accountsModule, 'getByStatus');

      // Get accounts by different statuses
      await accountsModule.getActive();
      await accountsModule.getSuspended();
      await accountsModule.getDeleted();

      expect(spy).toHaveBeenCalledWith(AccountStatus.ACTIVE, undefined);
      expect(spy).toHaveBeenCalledWith(AccountStatus.SUSPENDED, undefined);
      expect(spy).toHaveBeenCalledWith(AccountStatus.DELETED, undefined);
    });
  });
});
