import { BaseClient } from '../client/base-client';
import type {
  AccountListResponse,
  AdsAccount,
  BaseResponse,
  FundingInstrument,
  FundingInstrumentListResponse,
} from '../types';
import { validateRequired } from '../utils/validation';

export class AccountsClient extends BaseClient {
  public async list(): Promise<AccountListResponse> {
    return this.getList<AdsAccount>('/accounts');
  }

  public async getAccount(accountId: string): Promise<BaseResponse<AdsAccount>> {
    validateRequired({ accountId }, ['accountId']);
    return this.get<AdsAccount>(`/accounts/${accountId}`);
  }
}

export class FundingInstrumentsClient extends BaseClient {
  public async list(accountId: string): Promise<FundingInstrumentListResponse> {
    validateRequired({ accountId }, ['accountId']);
    return this.getList<FundingInstrument>(`/accounts/${accountId}/funding_instruments`);
  }

  public async getFundingInstrument(
    accountId: string,
    fundingInstrumentId: string
  ): Promise<BaseResponse<FundingInstrument>> {
    validateRequired({ accountId, fundingInstrumentId }, ['accountId', 'fundingInstrumentId']);
    return this.get<FundingInstrument>(
      `/accounts/${accountId}/funding_instruments/${fundingInstrumentId}`
    );
  }
}
