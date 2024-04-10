// Generated with https://transform.tools/json-to-typescript

export interface ValidateTinNameAddressListMatchResponse {
  ValidateTinNameAddressListMatchResult: ValidateTinNameAddressListMatchResult;
}

export interface ValidateTinNameAddressListMatchResult {
  REQUESTID: number;
  REQUEST_STATUS: string;
  REQUEST_DETAILS: string;
  TINNAME_RESULT: TinnameResult;
  LISTMATCH_RESULT: ListmatchResult;
  ADDRESS_RESULT: AddressResult;
  STATUS: Status;
}

export interface TinnameResult {
  TINNAME_CODE: string;
  TINNAME_DETAILS: string;
  DMF_CODE: string;
  DMF_DETAILS: string;
  DMF_DATA: string;
  EIN_CODE: string;
  EIN_DETAILS: string;
  EIN_DATA: string;
  GIIN_CODE: string;
  GIIN_DETAILS: string;
  GIIN_DATA: string;
}

export interface ListmatchResult {
  LISTSMATCH_CODE: string;
  LISTSMATCH_DETAILS: string;
  OFAC_RESULT: OfacResult;
  NV_RESULT: NvResult;
  MS_RESULT: MsResult;
  IL_RESULT: IlResult;
  MO_RESULT: MoResult;
  NJ_RESULT: NjResult;
  Results: Results;
}

export interface OfacResult {
  OFAC_CODE: string;
  OFAC_DETAILS: string;
  OFAC_COUNT: number;
  OFAC_DATA: string;
}

export interface NvResult {
  NV_CODE: string;
  NV_DETAILS: string;
  NV_COUNT: number;
  NV_DATA: string;
}

export interface MsResult {
  MS_CODE: string;
  MS_DETAILS: string;
  MS_COUNT: number;
  MS_DATA: string;
}

export interface IlResult {
  IL_CODE: string;
  IL_DETAILS: string;
  IL_COUNT: number;
  IL_DATA: string;
}

export interface MoResult {
  MO_CODE: string;
  MO_DETAILS: string;
  MO_COUNT: number;
  MO_DATA: string;
}

export interface NjResult {
  NJ_CODE: string;
  NJ_DETAILS: string;
  NJ_COUNT: number;
  NJ_DATA: string;
}

export interface Results {
  Result: Result[];
}

export interface Result {
  Type: string;
  Code: string;
  Details: string;
  Count: number;
  Data: string;
}

export interface AddressResult {
  ADDRESS_CODE: string;
  ADDRESS_DETAILS: string;
}

export interface Status {
  Status: string;
  CallsRemaining: string;
}
