import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';

describe('Accounts Contract Tests', () => {
  let client: XAdsClient;
  const testAccountId = '18ce54d4x5t';

  beforeEach(() => {
    const config: SDKConfig = {
      credentials: {
        consumerKey: 'test-consumer-key',
        consumerSecret: 'test-consumer-secret',
        accessToken: 'test-access-token',
        accessTokenSecret: 'test-access-token-secret',
      },
      environment: 'sandbox',
    };

    client = new XAdsClient(config);
  });

  describe('Accounts Management', () => {
    it('should list all accessible accounts', async () => {
      const response = await client.accounts.list();

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('request');
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);

      const account = response.data[0];
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('name');
      expect(account).toHaveProperty('timezone');
      expect(account).toHaveProperty('created_at');
      expect(account).toHaveProperty('updated_at');
      expect(account).toHaveProperty('deleted');
    });

    it('should retrieve a specific account by ID', async () => {
      const response = await client.accounts.getAccount(testAccountId);

      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('id', testAccountId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('timezone');
      expect(response.data).toHaveProperty('timezone_switch_at');
      expect(response.data).toHaveProperty('created_at');
      expect(response.data).toHaveProperty('updated_at');
      expect(response.data).toHaveProperty('deleted');
    });

    it('should handle non-existent account requests', async () => {
      await expect(client.accounts.getAccount('non-existent-account')).rejects.toThrow();
    });

    it('should handle empty account ID', async () => {
      await expect(client.accounts.getAccount('')).rejects.toThrow();
    });
  });

  describe('Funding Instruments Management', () => {
    it('should list funding instruments for an account', async () => {
      const response = await client.fundingInstruments.list(testAccountId);

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('request');
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);

      const fundingInstrument = response.data[0];
      expect(fundingInstrument).toHaveProperty('id');
      expect(fundingInstrument).toHaveProperty('name');
      expect(fundingInstrument).toHaveProperty('account_id', testAccountId);
      expect(fundingInstrument).toHaveProperty('type');
      expect(fundingInstrument).toHaveProperty('currency');
      expect(fundingInstrument).toHaveProperty('created_at');
      expect(fundingInstrument).toHaveProperty('updated_at');
      expect(fundingInstrument).toHaveProperty('deleted');

      // Optional properties - check only if they exist
      if (fundingInstrument.credit_limit_local_micro !== undefined) {
        expect(fundingInstrument).toHaveProperty('credit_limit_local_micro');
      }
      if (fundingInstrument.funded_amount_local_micro !== undefined) {
        expect(fundingInstrument).toHaveProperty('funded_amount_local_micro');
      }
    });

    it('should retrieve a specific funding instrument', async () => {
      const fundingId = 'funding123';
      const response = await client.fundingInstruments.getFundingInstrument(
        testAccountId,
        fundingId
      );

      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('id', fundingId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('account_id', testAccountId);
      expect(response.data).toHaveProperty('type');
      expect(response.data).toHaveProperty('currency');

      // Optional properties - check only if they exist
      if (response.data.credit_limit_local_micro !== undefined) {
        expect(response.data).toHaveProperty('credit_limit_local_micro');
      }
      if (response.data.funded_amount_local_micro !== undefined) {
        expect(response.data).toHaveProperty('funded_amount_local_micro');
      }
    });

    it('should handle different funding instrument types', async () => {
      const response = await client.fundingInstruments.list(testAccountId);
      const fundingInstruments = response.data;

      // Check that we have different types in the test data
      const types = fundingInstruments.map((fi) => fi.type);
      expect(types).toContain('CREDIT_CARD');
      expect(types).toContain('INVOICE');
    });

    it('should handle non-existent funding instrument', async () => {
      await expect(
        client.fundingInstruments.getFundingInstrument(testAccountId, 'non-existent')
      ).rejects.toThrow();
    });

    it('should handle empty account ID for funding instruments', async () => {
      await expect(client.fundingInstruments.list('')).rejects.toThrow();
    });

    it('should handle empty funding instrument ID', async () => {
      await expect(
        client.fundingInstruments.getFundingInstrument(testAccountId, '')
      ).rejects.toThrow();
    });
  });

  describe('Client Integration', () => {
    it('should have accounts client available on main client', () => {
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.getAccount).toBe('function');
    });

    it('should have funding instruments client available on main client', () => {
      expect(client.fundingInstruments).toBeDefined();
      expect(typeof client.fundingInstruments.list).toBe('function');
      expect(typeof client.fundingInstruments.getFundingInstrument).toBe('function');
    });

    it('should handle concurrent account and funding instrument requests', async () => {
      const operations = [
        client.accounts.list(),
        client.accounts.getAccount(testAccountId),
        client.fundingInstruments.list(testAccountId),
        client.fundingInstruments.getFundingInstrument(testAccountId, 'funding123'),
      ];

      const results = await Promise.all(operations);

      expect(results).toHaveLength(4);
      expect(results[0].data).toBeInstanceOf(Array); // accounts list
      expect(results[1].data).toHaveProperty('id'); // specific account
      expect(results[2].data).toBeInstanceOf(Array); // funding instruments list
      expect(results[3].data).toHaveProperty('id'); // specific funding instrument
    });
  });

  describe('Account Information Validation', () => {
    it('should return accounts with proper timezone information', async () => {
      const response = await client.accounts.list();
      const account = response.data[0];

      expect(account.timezone).toMatch(/^[A-Za-z]+\/[A-Za-z_]+$/); // e.g., "America/New_York"
      expect(account.timezone_switch_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/); // ISO 8601
    });

    it('should return accounts with valid timestamps', async () => {
      const response = await client.accounts.list();
      const account = response.data[0];

      // Validate ISO 8601 timestamp format
      expect(account.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
      expect(account.updated_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

      // Ensure timestamps are valid dates
      expect(new Date(account.created_at).getTime()).not.toBeNaN();
      expect(new Date(account.updated_at).getTime()).not.toBeNaN();
    });

    it('should return accounts with boolean deleted flag', async () => {
      const response = await client.accounts.list();
      const account = response.data[0];

      expect(typeof account.deleted).toBe('boolean');
      expect(account.deleted).toBe(false); // Test accounts should not be deleted
    });
  });

  describe('Funding Instrument Validation', () => {
    it('should return funding instruments with proper currency codes', async () => {
      const response = await client.fundingInstruments.list(testAccountId);
      const fundingInstrument = response.data[0];

      // Should be valid ISO 4217 currency code
      expect(fundingInstrument.currency).toMatch(/^[A-Z]{3}$/);
      expect(fundingInstrument.currency).toBe('USD'); // Test data uses USD
    });

    it('should return funding instruments with valid credit amounts', async () => {
      const response = await client.fundingInstruments.list(testAccountId);
      const fundingInstrument = response.data[0];

      // Credit amounts should be numbers in micro units when defined
      if (fundingInstrument.credit_limit_local_micro !== undefined) {
        expect(typeof fundingInstrument.credit_limit_local_micro).toBe('number');
        expect(fundingInstrument.credit_limit_local_micro).toBeGreaterThan(0);
      }

      if (fundingInstrument.funded_amount_local_micro !== undefined) {
        expect(typeof fundingInstrument.funded_amount_local_micro).toBe('number');
        expect(fundingInstrument.funded_amount_local_micro).toBeGreaterThanOrEqual(0);

        if (fundingInstrument.credit_limit_local_micro !== undefined) {
          expect(fundingInstrument.funded_amount_local_micro).toBeLessThanOrEqual(
            fundingInstrument.credit_limit_local_micro
          );
        }
      }
    });

    it('should return funding instruments with valid types', async () => {
      const response = await client.fundingInstruments.list(testAccountId);

      const validTypes = ['CREDIT_CARD', 'DEBIT_CARD', 'INVOICE', 'GIFT_CARD'];
      response.data.forEach((fundingInstrument) => {
        expect(validTypes).toContain(fundingInstrument.type);
      });
    });
  });

  describe('Error Handling', () => {
    it('should provide meaningful error messages for account errors', async () => {
      try {
        await client.accounts.getAccount('non-existent-account');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Error should contain some indication of what went wrong
        expect((error as Error).message).toBeTruthy();
      }
    });

    it('should provide meaningful error messages for funding instrument errors', async () => {
      try {
        await client.fundingInstruments.getFundingInstrument(testAccountId, 'non-existent');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBeTruthy();
      }
    });
  });
});
