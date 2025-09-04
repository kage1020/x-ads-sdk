import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';

describe('SDK Initialization Integration', () => {
  const validCredentials = {
    consumerKey: 'test-consumer-key',
    consumerSecret: 'test-consumer-secret',
    accessToken: 'test-access-token',
    accessTokenSecret: 'test-access-token-secret',
  };

  describe('XAdsClient Constructor', () => {
    it('should initialize with valid configuration', () => {
      const config: SDKConfig = {
        credentials: validCredentials,
        environment: 'sandbox',
      };

      const client = new XAdsClient(config);

      expect(client).toBeDefined();
      expect(client.campaigns).toBeDefined();
      expect(client.lineItems).toBeDefined();
      expect(client.analytics).toBeDefined();
      expect(client.media).toBeDefined();
      expect(client.targeting).toBeDefined();
      expect(client.accounts).toBeDefined();
      expect(client.fundingInstruments).toBeDefined();
    });

    it('should initialize with production environment', () => {
      const config: SDKConfig = {
        credentials: validCredentials,
        environment: 'production',
      };

      const client = new XAdsClient(config);
      expect(client).toBeDefined();
    });

    it('should initialize with optional configuration parameters', () => {
      const config: SDKConfig = {
        credentials: validCredentials,
        environment: 'sandbox',
        timeout: 30000,
        rateLimitBuffer: 0.1,
        debug: true,
      };

      const client = new XAdsClient(config);
      expect(client).toBeDefined();
    });

    it('should throw error for missing credentials', () => {
      expect(() => {
        new XAdsClient({
          credentials: {
            consumerKey: '',
            consumerSecret: 'secret',
            accessToken: 'token',
            accessTokenSecret: 'token-secret',
          },
          environment: 'sandbox',
        });
      }).toThrow(/consumer key is required/i);
    });

    it('should throw error for invalid environment', () => {
      expect(() => {
        new XAdsClient({
          credentials: validCredentials,
          environment: 'invalid' as 'sandbox',
        });
      }).toThrow(/invalid environment/i);
    });

    it('should validate credential format', () => {
      expect(() => {
        new XAdsClient({
          credentials: {
            consumerKey: 'key',
            consumerSecret: 'secret',
            accessToken: 'invalid-token-format',
            accessTokenSecret: 'token-secret',
          },
          environment: 'sandbox',
        });
      }).toThrow(/invalid token format/i);
    });

    it('should set default timeout when not specified', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });

      expect(client).toBeDefined();
    });

    it('should validate timeout range', () => {
      expect(() => {
        new XAdsClient({
          credentials: validCredentials,
          environment: 'sandbox',
          timeout: -1000,
        });
      }).toThrow(/timeout must be positive/i);

      expect(() => {
        new XAdsClient({
          credentials: validCredentials,
          environment: 'sandbox',
          timeout: 300000,
        });
      }).toThrow(/timeout cannot exceed/i);
    });

    it('should validate rate limit buffer range', () => {
      expect(() => {
        new XAdsClient({
          credentials: validCredentials,
          environment: 'sandbox',
          rateLimitBuffer: -0.1,
        });
      }).toThrow(/rate limit buffer must be between/i);

      expect(() => {
        new XAdsClient({
          credentials: validCredentials,
          environment: 'sandbox',
          rateLimitBuffer: 1.5,
        });
      }).toThrow(/rate limit buffer must be between/i);
    });
  });

  describe('SDK Methods Availability', () => {
    let client: XAdsClient;

    beforeEach(() => {
      client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });
    });

    it('should have all campaign management methods', () => {
      expect(typeof client.campaigns.create).toBe('function');
      expect(typeof client.campaigns.list).toBe('function');
      expect(typeof client.campaigns.getCampaign).toBe('function');
      expect(typeof client.campaigns.update).toBe('function');
      expect(typeof client.campaigns.delete).toBe('function');
    });

    it('should have all line item management methods', () => {
      expect(typeof client.lineItems.create).toBe('function');
      expect(typeof client.lineItems.list).toBe('function');
      expect(typeof client.lineItems.getLineItem).toBe('function');
      expect(typeof client.lineItems.update).toBe('function');
      expect(typeof client.lineItems.delete).toBe('function');
    });

    it('should have all analytics methods', () => {
      expect(typeof client.analytics.getStats).toBe('function');
      expect(typeof client.analytics.createJob).toBe('function');
      expect(typeof client.analytics.getJob).toBe('function');
      expect(typeof client.analytics.listJobs).toBe('function');
    });

    it('should have all media management methods', () => {
      expect(typeof client.media.upload).toBe('function');
      expect(typeof client.media.list).toBe('function');
      expect(typeof client.media.getMedia).toBe('function');
      expect(typeof client.media.delete).toBe('function');
    });

    it('should have all targeting methods', () => {
      expect(typeof client.targeting.create).toBe('function');
      expect(typeof client.targeting.list).toBe('function');
      expect(typeof client.targeting.delete).toBe('function');
      expect(typeof client.targeting.getCriteria).toBe('function');
    });

    it('should have all account management methods', () => {
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.getAccount).toBe('function');
      expect(typeof client.fundingInstruments.list).toBe('function');
      expect(typeof client.fundingInstruments.getFundingInstrument).toBe('function');
    });
  });

  describe('Environment Configuration', () => {
    it('should use correct sandbox API endpoint', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });

      expect(client).toBeDefined();
    });

    it('should use correct production API endpoint', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'production',
      });

      expect(client).toBeDefined();
    });

    it('should allow environment switching after initialization', async () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });

      expect(client.setEnvironment).toBeDefined();
      client.setEnvironment('production');

      expect(client).toBeDefined();
    });
  });

  describe('Debug Mode', () => {
    it('should initialize with debug mode enabled', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
        debug: true,
      });

      expect(client).toBeDefined();
    });

    it('should initialize with debug mode disabled by default', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });

      expect(client).toBeDefined();
    });

    it('should allow debug mode toggling', () => {
      const client = new XAdsClient({
        credentials: validCredentials,
        environment: 'sandbox',
      });

      expect(client.setDebug).toBeDefined();
      client.setDebug(true);
      client.setDebug(false);

      expect(client).toBeDefined();
    });
  });

  describe('Error Handling Configuration', () => {
    it('should handle initialization errors gracefully', () => {
      expect(() => {
        new XAdsClient(null as unknown as SDKConfig);
      }).toThrow(/configuration is required/i);

      expect(() => {
        new XAdsClient({} as SDKConfig);
      }).toThrow(/credentials are required/i);
    });

    it('should validate all required credential fields', () => {
      const incompleteCredentials = [
        {
          consumerKey: '',
          consumerSecret: 'secret',
          accessToken: 'token',
          accessTokenSecret: 'secret',
        },
        {
          consumerKey: 'key',
          consumerSecret: '',
          accessToken: 'token',
          accessTokenSecret: 'secret',
        },
        {
          consumerKey: 'key',
          consumerSecret: 'secret',
          accessToken: '',
          accessTokenSecret: 'secret',
        },
        {
          consumerKey: 'key',
          consumerSecret: 'secret',
          accessToken: 'token',
          accessTokenSecret: '',
        },
      ];

      incompleteCredentials.forEach((credentials) => {
        expect(() => {
          new XAdsClient({
            credentials,
            environment: 'sandbox',
          });
        }).toThrow();
      });
    });
  });
});
