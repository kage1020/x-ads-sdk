import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://ads-api-sandbox.twitter.com/12/accounts', () => {
    return HttpResponse.json({
      data: [
        {
          id: '18ce54d4x5t',
          name: 'Test Account',
          timezone: 'America/New_York',
          timezone_switch_at: '2023-01-01T00:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: {
        params: {},
      },
    });
  }),

  http.get('https://ads-api-sandbox.twitter.com/12/accounts/:accountId', ({ params }) => {
    if (params.accountId === 'non-existent-account') {
      return new HttpResponse(
        JSON.stringify({
          errors: [
            {
              code: 'NOT_FOUND',
              message: 'The requested account could not be found',
            },
          ],
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return HttpResponse.json({
      data: {
        id: params.accountId,
        name: 'Test Account',
        timezone: 'America/New_York',
        timezone_switch_at: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
      },
    });
  }),

  http.post('https://ads-api-sandbox.twitter.com/12/accounts/:accountId/campaigns', () => {
    return HttpResponse.json({
      data: {
        id: 'campaign123',
        name: 'Test Campaign',
        account_id: '18ce54d4x5t',
        funding_instrument_id: 'funding123',
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
        budget_optimization: false,
        currency: 'USD',
        daily_budget_amount_local_micro: 100000000,
        standard_delivery: true,
        paused: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
      },
    });
  }),

  http.get('https://ads-api-sandbox.twitter.com/12/accounts/:accountId/campaigns', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'campaign123',
          name: 'Test Campaign',
          account_id: '18ce54d4x5t',
          funding_instrument_id: 'funding123',
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2023-01-08T00:00:00Z',
          budget_optimization: false,
          currency: 'USD',
          daily_budget_amount_local_micro: 100000000,
          standard_delivery: true,
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: {
        params: {},
      },
    });
  }),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/campaigns/:campaignId',
    ({ params }) => {
      if (params.campaignId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested resource could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.campaignId,
          name: 'Test Campaign',
          account_id: params.accountId,
          funding_instrument_id: 'funding123',
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2023-01-08T00:00:00Z',
          budget_optimization: false,
          currency: 'USD',
          daily_budget_amount_local_micro: 100000000,
          standard_delivery: true,
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  http.post(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/line_items',
    async ({ request }) => {
      const body = (await request.json()) as unknown;

      // Check for invalid objective to simulate validation
      if (
        typeof body === 'object' &&
        body !== null &&
        'objective' in body &&
        body.objective === 'INVALID_OBJECTIVE'
      ) {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'INVALID_PARAMETER',
                message: 'Invalid objective value',
              },
            ],
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: 'lineitem123',
          name: 'Test Line Item',
          account_id: '18ce54d4x5t',
          campaign_id: 'campaign123',
          objective: 'ENGAGEMENT',
          product_type: 'PROMOTED_TWEETS',
          bid_unit: 'ENGAGEMENT',
          bid_type: 'AUTO',
          automatically_select_bid: true,
          start_time: '2023-01-01T00:00:00Z',
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  http.get('https://ads-api-sandbox.twitter.com/12/accounts/:accountId/line_items', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'lineitem123',
          name: 'Test Line Item',
          account_id: '18ce54d4x5t',
          campaign_id: 'campaign123',
          objective: 'ENGAGEMENT',
          product_type: 'PROMOTED_TWEETS',
          bid_unit: 'ENGAGEMENT',
          bid_type: 'AUTO',
          automatically_select_bid: true,
          start_time: '2023-01-01T00:00:00Z',
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: {
        params: {},
      },
    });
  }),

  http.get('https://ads-api-sandbox.twitter.com/12/stats/accounts/:accountId', ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    return HttpResponse.json({
      data: [
        {
          id: params.entity_ids || 'campaign123',
          id_data: [
            {
              metrics: {
                impressions: [1000],
                clicks: [50],
                spend_micro: [5000000],
                engagements: [75],
                engagement_rate: [0.075],
              },
            },
          ],
        },
      ],
      time_series_length: 1,
      request: {
        entity: params.entity,
        entity_ids: params.entity_ids ? [params.entity_ids] : ['campaign123'],
        start_time: params.start_time,
        end_time: params.end_time,
        granularity: params.granularity,
        placement: params.placement,
        metrics: params.metrics ? params.metrics.split(',') : ['impressions'],
        segmentation_type: params.segmentation_type,
      },
    });
  }),

  // Individual line item endpoint
  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/line_items/:lineItemId',
    ({ params }) => {
      return HttpResponse.json({
        data: {
          id: params.lineItemId,
          name: 'Test Line Item',
          account_id: params.accountId,
          campaign_id: 'campaign123',
          objective: 'ENGAGEMENT',
          product_type: 'PROMOTED_TWEETS',
          bid_unit: 'ENGAGEMENT',
          bid_type: 'AUTO',
          automatically_select_bid: true,
          start_time: '2023-01-01T00:00:00Z',
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  // Campaign update endpoint
  http.put(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/campaigns/:campaignId',
    ({ params }) => {
      return HttpResponse.json({
        data: {
          id: params.campaignId,
          name: 'Updated Campaign Name',
          account_id: params.accountId,
          funding_instrument_id: 'funding123',
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2023-01-08T00:00:00Z',
          budget_optimization: false,
          currency: 'USD',
          daily_budget_amount_local_micro: 200000000,
          standard_delivery: true,
          paused: false,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  // Campaign delete endpoint
  http.delete(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/campaigns/:campaignId',
    ({ params }) => {
      if (params.campaignId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested resource could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.campaignId,
          name: 'Test Campaign',
          account_id: params.accountId,
          funding_instrument_id: 'funding123',
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2023-01-08T00:00:00Z',
          budget_optimization: false,
          currency: 'USD',
          daily_budget_amount_local_micro: 100000000,
          standard_delivery: true,
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: true,
        },
      });
    }
  ),

  // Line item update endpoint
  http.put(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/line_items/:lineItemId',
    ({ params }) => {
      return HttpResponse.json({
        data: {
          id: params.lineItemId,
          name: 'Updated Line Item Name',
          account_id: params.accountId,
          campaign_id: 'campaign123',
          objective: 'ENGAGEMENT',
          product_type: 'PROMOTED_TWEETS',
          bid_unit: 'ENGAGEMENT',
          bid_type: 'AUTO',
          automatically_select_bid: false,
          bid_amount_local_micro: 50000000,
          start_time: '2023-01-01T00:00:00Z',
          paused: false,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  // Line item delete endpoint
  http.delete(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/line_items/:lineItemId',
    ({ params }) => {
      return HttpResponse.json({
        data: {
          id: params.lineItemId,
          name: 'Test Line Item',
          account_id: params.accountId,
          campaign_id: 'campaign123',
          objective: 'ENGAGEMENT',
          product_type: 'PROMOTED_TWEETS',
          bid_unit: 'ENGAGEMENT',
          bid_type: 'AUTO',
          automatically_select_bid: true,
          start_time: '2023-01-01T00:00:00Z',
          paused: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: true,
        },
      });
    }
  ),

  // Analytics job endpoints
  http.post('https://ads-api-sandbox.twitter.com/12/stats/jobs/accounts/:accountId', () => {
    return HttpResponse.json({
      data: {
        job_id: 'job123',
        status: 'QUEUED',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      },
    });
  }),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/stats/jobs/accounts/:accountId/:jobId',
    ({ params }) => {
      if (params.jobId === 'non-existent-job') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested resource could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      const isCompleted = params.jobId === 'completed-job123';
      return HttpResponse.json({
        data: {
          job_id: params.jobId,
          status: isCompleted ? 'SUCCESS' : 'PROCESSING',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          url: isCompleted ? 'https://ads-api-sandbox.twitter.com/downloads/job123.csv' : undefined,
          expires_at: isCompleted ? '2023-01-02T00:00:00Z' : undefined,
        },
      });
    }
  ),

  http.get('https://ads-api-sandbox.twitter.com/12/stats/jobs/accounts/:accountId', () => {
    return HttpResponse.json({
      data: [
        {
          job_id: 'job123',
          status: 'SUCCESS',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ],
      request: {
        params: {},
      },
    });
  }),

  // Media library endpoints
  http.post(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/media_library',
    async ({ request, params }) => {
      try {
        const formData = await request.formData();
        const file = formData.get('media') as File;
        const mediaCategory = formData.get('media_category') as string;
        const name = formData.get('name') as string;

        // Simulate file validation
        if (!file) {
          return new HttpResponse(
            JSON.stringify({
              errors: [
                {
                  code: 'INVALID_PARAMETER',
                  message: 'Media file is required',
                },
              ],
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }

        return HttpResponse.json({
          data: {
            id: 'media123',
            name: name || 'Test Media',
            account_id: params.accountId,
            media_category: mediaCategory,
            file_name: file.name,
            file_size: file.size,
            media_url: 'https://pbs.twimg.com/media/test123.jpg',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        });
      } catch (_error) {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'INVALID_PARAMETER',
                message: 'Invalid media upload request',
              },
            ],
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }
  ),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/media_library',
    ({ request, params }) => {
      const url = new URL(request.url);
      const mediaCategory = url.searchParams.get('media_category');

      return HttpResponse.json({
        data: [
          {
            id: 'media123',
            name: 'Test Media',
            account_id: params.accountId,
            media_category: mediaCategory || 'PROMOTED_VIDEO',
            file_name: 'test-video.mp4',
            file_size: 1024000,
            media_url: 'https://pbs.twimg.com/media/test123.mp4',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
          {
            id: 'media124',
            name: 'Test Image',
            account_id: params.accountId,
            media_category: 'TWEET_IMAGE',
            file_name: 'test-image.jpg',
            file_size: 512000,
            media_url: 'https://pbs.twimg.com/media/test124.jpg',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: {
          params: Object.fromEntries(url.searchParams),
        },
      });
    }
  ),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/media_library/:mediaId',
    ({ params }) => {
      if (params.mediaId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested media could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.mediaId,
          name: 'Test Media',
          account_id: params.accountId,
          media_category: 'PROMOTED_VIDEO',
          file_name: 'test-video.mp4',
          file_size: 1024000,
          media_url: 'https://pbs.twimg.com/media/test123.mp4',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      });
    }
  ),

  http.delete(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/media_library/:mediaId',
    ({ params }) => {
      if (params.mediaId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested media could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.mediaId,
          name: 'Test Media',
          account_id: params.accountId,
          media_category: 'PROMOTED_VIDEO',
          file_name: 'test-video.mp4',
          file_size: 1024000,
          media_url: 'https://pbs.twimg.com/media/test123.mp4',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: true,
        },
      });
    }
  ),

  // Targeting criteria endpoints
  http.post(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/targeting_criteria',
    async ({ request, params }) => {
      const body = (await request.json()) as {
        line_item_id?: string;
        targeting_type?: string;
        targeting_value?: string;
        name?: string;
      };

      // Validate required fields
      if (!body.line_item_id || !body.targeting_type || !body.targeting_value) {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'INVALID_PARAMETER',
                message: 'Missing required targeting criteria fields',
              },
            ],
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: 'targeting123',
          name: body.name || 'Test Targeting Criteria',
          account_id: params.accountId,
          line_item_id: body.line_item_id,
          targeting_type: body.targeting_type,
          targeting_value: body.targeting_value,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/targeting_criteria',
    ({ request, params }) => {
      const url = new URL(request.url);
      const lineItemId = url.searchParams.get('line_item_id');

      return HttpResponse.json({
        data: [
          {
            id: 'targeting123',
            name: 'Test Targeting Criteria',
            account_id: params.accountId,
            line_item_id: lineItemId || 'lineitem123',
            targeting_type: 'LOCATION',
            targeting_value: 'US',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          {
            id: 'targeting124',
            name: 'Age Targeting',
            account_id: params.accountId,
            line_item_id: lineItemId || 'lineitem123',
            targeting_type: 'AGE',
            targeting_value: '25-34',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
        ],
        request: {
          params: Object.fromEntries(url.searchParams),
        },
      });
    }
  ),

  http.delete(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/targeting_criteria/:criteriaId',
    ({ params }) => {
      if (params.criteriaId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested targeting criteria could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.criteriaId,
          name: 'Test Targeting Criteria',
          account_id: params.accountId,
          line_item_id: 'lineitem123',
          targeting_type: 'LOCATION',
          targeting_value: 'US',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: true,
        },
      });
    }
  ),

  http.get('https://ads-api-sandbox.twitter.com/12/targeting_criteria/locations', () => {
    return HttpResponse.json({
      data: [
        {
          id: 'US',
          name: 'United States',
          country_code: 'US',
          location_type: 'COUNTRY',
        },
        {
          id: 'CA',
          name: 'Canada',
          country_code: 'CA',
          location_type: 'COUNTRY',
        },
        {
          id: 'GB',
          name: 'United Kingdom',
          country_code: 'GB',
          location_type: 'COUNTRY',
        },
      ],
    });
  }),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/tailored_audiences',
    ({ params }) => {
      return HttpResponse.json({
        data: [
          {
            id: 'audience123',
            name: 'Test Tailored Audience',
            account_id: params.accountId,
            audience_type: 'CUSTOM',
            audience_size: 10000,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          {
            id: 'audience124',
            name: 'Website Visitors',
            account_id: params.accountId,
            audience_type: 'WEBSITE',
            audience_size: 5000,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
        ],
        request: {
          params: {},
        },
      });
    }
  ),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/tailored_audiences/:audienceId',
    ({ params }) => {
      if (params.audienceId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested tailored audience could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.audienceId,
          name: 'Test Tailored Audience',
          account_id: params.accountId,
          audience_type: 'CUSTOM',
          audience_size: 10000,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),

  // Funding instruments endpoints
  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/funding_instruments',
    ({ params }) => {
      return HttpResponse.json({
        data: [
          {
            id: 'funding123',
            name: 'Test Credit Card',
            account_id: params.accountId,
            type: 'CREDIT_CARD',
            currency: 'USD',
            credit_limit_local_micro: 1000000000000,
            credit_remaining_local_micro: 500000000000,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          {
            id: 'funding124',
            name: 'Test Invoice',
            account_id: params.accountId,
            type: 'INVOICE',
            currency: 'USD',
            credit_limit_local_micro: 2000000000000,
            credit_remaining_local_micro: 1500000000000,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
        ],
        request: {
          params: {},
        },
      });
    }
  ),

  http.get(
    'https://ads-api-sandbox.twitter.com/12/accounts/:accountId/funding_instruments/:fundingId',
    ({ params }) => {
      if (params.fundingId === 'non-existent') {
        return new HttpResponse(
          JSON.stringify({
            errors: [
              {
                code: 'NOT_FOUND',
                message: 'The requested funding instrument could not be found',
              },
            ],
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return HttpResponse.json({
        data: {
          id: params.fundingId,
          name: 'Test Credit Card',
          account_id: params.accountId,
          type: 'CREDIT_CARD',
          currency: 'USD',
          credit_limit_local_micro: 1000000000000,
          credit_remaining_local_micro: 500000000000,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      });
    }
  ),
];
