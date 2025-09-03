import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  FundingInstrumentResponse,
  SingleFundingInstrumentResponse,
} from '../../types/resources/funding-instrument.js';
import {
  FundingInstrumentEntityStatus,
  FundingInstrumentType,
} from '../../types/resources/funding-instrument.js';
import { FundingInstrumentResource } from '../funding-instrument.js';

describe('FundingInstrumentResource', () => {
  let httpClient: HttpClient;
  let fundingInstrument: FundingInstrumentResource;

  beforeEach(() => {
    httpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;

    fundingInstrument = new FundingInstrumentResource(httpClient);
  });

  describe('getFundingInstruments', () => {
    const mockFundingInstrumentResponse: FundingInstrumentResponse = {
      data: [
        {
          id: 'fi_123',
          type: FundingInstrumentType.CREDIT_CARD,
          entity_status: FundingInstrumentEntityStatus.ACTIVE,
          currency: 'USD',
          description: 'Test Credit Card',
          is_default: true,
          credit_remaining_local_micro: 1000000000, // $1000 in micros
          credit_limit_local_micro: 5000000000, // $5000 in micros
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        {
          id: 'fi_456',
          type: FundingInstrumentType.INSERTION_ORDER,
          entity_status: FundingInstrumentEntityStatus.ACTIVE,
          currency: 'USD',
          description: 'Test Insertion Order',
          is_default: false,
          credit_remaining_local_micro: 2000000000, // $2000 in micros
          credit_limit_local_micro: 10000000000, // $10000 in micros
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: { params: {} },
      total_count: 2,
    };

    it('should get funding instruments with default parameters', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockFundingInstrumentResponse);

      const result = await fundingInstrument.getFundingInstruments('account_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/funding_instruments',
        params: {},
      });
      expect(result).toEqual(mockFundingInstrumentResponse);
    });

    it('should get funding instruments with filters', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockFundingInstrumentResponse);

      const options = {
        funding_instrument_ids: ['fi_123', 'fi_456'],
        funding_instrument_types: [FundingInstrumentType.CREDIT_CARD],
        entity_statuses: [FundingInstrumentEntityStatus.ACTIVE],
        count: 10,
        cursor: 'cursor_123',
        sort_by: 'created_at' as const,
        with_deleted: false,
      };

      await fundingInstrument.getFundingInstruments('account_123', options);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/funding_instruments',
        params: {
          funding_instrument_ids: 'fi_123,fi_456',
          funding_instrument_types: 'CREDIT_CARD',
          entity_statuses: 'ACTIVE',
          count: '10',
          cursor: 'cursor_123',
          sort_by: 'created_at',
          with_deleted: 'false',
        },
      });
    });

    it('should handle requestOptions.params', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockFundingInstrumentResponse);

      const requestOptions = {
        params: { custom_param: 'custom_value' },
      };

      await fundingInstrument.getFundingInstruments('account_123', undefined, requestOptions);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/funding_instruments',
        params: { custom_param: 'custom_value' },
      });
    });
  });

  describe('getFundingInstrument', () => {
    const mockSingleFundingInstrumentResponse: SingleFundingInstrumentResponse = {
      data: {
        id: 'fi_123',
        type: FundingInstrumentType.CREDIT_CARD,
        entity_status: FundingInstrumentEntityStatus.ACTIVE,
        currency: 'USD',
        description: 'Test Credit Card',
        is_default: true,
        credit_remaining_local_micro: 1000000000,
        credit_limit_local_micro: 5000000000,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
      },
      request: { params: {} },
    };

    it('should get specific funding instrument', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockSingleFundingInstrumentResponse);

      const result = await fundingInstrument.getFundingInstrument('account_123', 'fi_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/funding_instruments/fi_123',
      });
      expect(result).toEqual(mockSingleFundingInstrumentResponse);
    });
  });

  describe('Convenience Methods', () => {
    const mockActiveFundingInstruments: FundingInstrumentResponse = {
      data: [
        {
          id: 'fi_123',
          type: FundingInstrumentType.CREDIT_CARD,
          entity_status: FundingInstrumentEntityStatus.ACTIVE,
          currency: 'USD',
          description: 'Test Credit Card',
          is_default: true,
          credit_remaining_local_micro: 1000000000,
          credit_limit_local_micro: 5000000000,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        {
          id: 'fi_456',
          type: FundingInstrumentType.INSERTION_ORDER,
          entity_status: FundingInstrumentEntityStatus.ACTIVE,
          currency: 'USD',
          description: 'Test Insertion Order',
          is_default: false,
          credit_remaining_local_micro: 2000000000,
          credit_limit_local_micro: 10000000000,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: { params: {} },
      total_count: 2,
    };

    describe('getActiveFundingInstruments', () => {
      it('should get only active funding instruments', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockActiveFundingInstruments);

        const result = await fundingInstrument.getActiveFundingInstruments('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/funding_instruments',
          params: {
            entity_statuses: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockActiveFundingInstruments);
      });
    });

    describe('getCreditCardFundingInstruments', () => {
      it('should get only credit card funding instruments', async () => {
        const mockCreditCardResponse = {
          ...mockActiveFundingInstruments,
          data: [mockActiveFundingInstruments.data[0]], // Only credit card
        };
        vi.mocked(httpClient.request).mockResolvedValue(mockCreditCardResponse);

        const result = await fundingInstrument.getCreditCardFundingInstruments('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/funding_instruments',
          params: {
            funding_instrument_types: 'CREDIT_CARD',
            entity_statuses: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockCreditCardResponse);
      });
    });

    describe('getInsertionOrderFundingInstruments', () => {
      it('should get only insertion order funding instruments', async () => {
        const mockInsertionOrderResponse = {
          ...mockActiveFundingInstruments,
          data: [mockActiveFundingInstruments.data[1]], // Only insertion order
        };
        vi.mocked(httpClient.request).mockResolvedValue(mockInsertionOrderResponse);

        const result = await fundingInstrument.getInsertionOrderFundingInstruments('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/funding_instruments',
          params: {
            funding_instrument_types: 'INSERTION_ORDER',
            entity_statuses: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockInsertionOrderResponse);
      });
    });

    describe('getDefaultFundingInstrument', () => {
      it('should get the default funding instrument', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockActiveFundingInstruments);

        const result = await fundingInstrument.getDefaultFundingInstrument('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/funding_instruments',
          params: {
            entity_statuses: 'ACTIVE',
          },
        });

        expect(result).toEqual({
          data: mockActiveFundingInstruments.data[0], // The one with is_default: true
          request: mockActiveFundingInstruments.request,
        });
      });

      it('should return null when no default funding instrument exists', async () => {
        const mockNoDefaultResponse = {
          ...mockActiveFundingInstruments,
          data: mockActiveFundingInstruments.data.map((fi) => ({ ...fi, is_default: false })),
        };
        vi.mocked(httpClient.request).mockResolvedValue(mockNoDefaultResponse);

        const result = await fundingInstrument.getDefaultFundingInstrument('account_123');

        expect(result).toBeNull();
      });
    });

    describe('hasAvailableCredit', () => {
      it('should check available credit', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockActiveFundingInstruments);

        const result = await fundingInstrument.hasAvailableCredit('account_123');

        expect(result).toEqual({
          has_credit: true,
          total_available_credit: 3000000000, // $3000 in micros (1000 + 2000)
          funding_instruments_with_credit: 2,
        });
      });

      it('should handle no available credit', async () => {
        const mockNoCreditResponse = {
          ...mockActiveFundingInstruments,
          data: mockActiveFundingInstruments.data.map((fi) => ({
            ...fi,
            credit_remaining_local_micro: 0,
          })),
        };
        vi.mocked(httpClient.request).mockResolvedValue(mockNoCreditResponse);

        const result = await fundingInstrument.hasAvailableCredit('account_123');

        expect(result).toEqual({
          has_credit: false,
          total_available_credit: 0,
          funding_instruments_with_credit: 0,
        });
      });
    });

    describe('getFundingInstrumentsSummary', () => {
      it('should get funding instruments summary', async () => {
        const mockMixedStatusResponse: FundingInstrumentResponse = {
          data: [
            {
              id: 'fi_123',
              type: FundingInstrumentType.CREDIT_CARD,
              entity_status: FundingInstrumentEntityStatus.ACTIVE,
              currency: 'USD',
              is_default: true,
              credit_remaining_local_micro: 1000000000,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
            {
              id: 'fi_456',
              type: FundingInstrumentType.INSERTION_ORDER,
              entity_status: FundingInstrumentEntityStatus.PAUSED,
              currency: 'USD',
              is_default: false,
              credit_remaining_local_micro: 2000000000,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
            {
              id: 'fi_789',
              type: FundingInstrumentType.CREDIT_CARD,
              entity_status: FundingInstrumentEntityStatus.CANCELLED,
              currency: 'USD',
              is_default: false,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
          ],
          request: { params: {} },
          total_count: 3,
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockMixedStatusResponse);

        const result = await fundingInstrument.getFundingInstrumentsSummary('account_123');

        expect(result).toEqual({
          total_count: 3,
          active_count: 1,
          paused_count: 1,
          cancelled_count: 1,
          credit_card_count: 2,
          insertion_order_count: 1,
          default_funding_instrument: {
            id: 'fi_123',
            type: FundingInstrumentType.CREDIT_CARD,
            currency: 'USD',
            credit_remaining: 1000000000,
          },
        });
      });

      it('should handle summary with no default funding instrument', async () => {
        const mockNoDefaultResponse = {
          ...mockActiveFundingInstruments,
          data: mockActiveFundingInstruments.data.map((fi) => ({ ...fi, is_default: false })),
        };
        vi.mocked(httpClient.request).mockResolvedValue(mockNoDefaultResponse);

        const result = await fundingInstrument.getFundingInstrumentsSummary('account_123');

        expect(result).toEqual({
          total_count: 2,
          active_count: 2,
          paused_count: 0,
          cancelled_count: 0,
          credit_card_count: 1,
          insertion_order_count: 1,
          default_funding_instrument: undefined,
        });
      });
    });
  });

  describe('Branch Coverage Tests', () => {
    describe('getFundingInstruments with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: FundingInstrumentResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          funding_instrument_ids: ['fi_1'],
          count: 5,
        };

        await fundingInstrument.getFundingInstruments('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/funding_instruments',
          params: {
            custom_param: 'custom_value',
            funding_instrument_ids: 'fi_1',
            count: '5',
          },
        });
      });
    });

    describe('Conditional branches in convenience methods', () => {
      it('should handle undefined credit_remaining_local_micro in hasAvailableCredit', async () => {
        const mockResponse: FundingInstrumentResponse = {
          data: [
            {
              id: 'fi_123',
              type: FundingInstrumentType.CREDIT_CARD,
              entity_status: FundingInstrumentEntityStatus.ACTIVE,
              currency: 'USD',
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
              // credit_remaining_local_micro is undefined
            },
          ],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const result = await fundingInstrument.hasAvailableCredit('account_123');

        expect(result).toEqual({
          has_credit: false,
          total_available_credit: 0,
          funding_instruments_with_credit: 0,
        });
      });

      it('should handle zero credit_remaining_local_micro in hasAvailableCredit', async () => {
        const mockResponse: FundingInstrumentResponse = {
          data: [
            {
              id: 'fi_123',
              type: FundingInstrumentType.CREDIT_CARD,
              entity_status: FundingInstrumentEntityStatus.ACTIVE,
              currency: 'USD',
              credit_remaining_local_micro: 0,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
          ],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const result = await fundingInstrument.hasAvailableCredit('account_123');

        expect(result).toEqual({
          has_credit: false,
          total_available_credit: 0,
          funding_instruments_with_credit: 0,
        });
      });
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP client errors', async () => {
      const error = new Error('Network error') as unknown as { captureStackTrace?: unknown };
      vi.mocked(httpClient.request).mockRejectedValue(error);

      await expect(fundingInstrument.getFundingInstruments('account_123')).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle empty response', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(null);

      const result = await fundingInstrument.getFundingInstruments('account_123');
      expect(result).toBeNull();
    });
  });
});
