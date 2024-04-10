// Generated with https://transform.tools/json-to-typescript

export interface ValidateTinNameAddressListMatchResponse {
  validateTinNameAddressListMatchResult: Root;
}
export interface Root {
  requestId: number;
  requestStatus: number;
  requestDetails: string;
  tinnameResult: TinnameResult;
  listmatchResult: ListmatchResult;
  addressResult: AddressResult;
  status: Status;
}

export interface TinnameResult {
  tinnameCode: number;
  tinnameDetails: string;
  dmfCode: string;
  dmfDetails: string;
  dmfData: string;
  einCode: string;
  einDetails: string;
  einData: string;
  giinCode: string;
  giinDetails: string;
  giinData: string;
}

export interface ListmatchResult {
  listsmatchCode: string;
  listsmatchDetails: string;
  ofacResult: OfacResult;
  nvResult: NvResult;
  msResult: MsResult;
  ilResult: IlResult;
  moResult: MoResult;
  njResult: NjResult;
  results: Results;
}

export interface OfacResult {
  ofacCode: string;
  ofacDetails: string;
  ofacCount: number;
  ofacData: string;
}

export interface NvResult {
  nvCode: string;
  nvDetails: string;
  nvCount: number;
  nvData: string;
}

export interface MsResult {
  msCode: string;
  msDetails: string;
  msCount: number;
  msData: string;
}

export interface IlResult {
  ilCode: string;
  ilDetails: string;
  ilCount: number;
  ilData: string;
}

export interface MoResult {
  moCode: string;
  moDetails: string;
  moCount: number;
  moData: string;
}

export interface NjResult {
  njCode: string;
  njDetails: string;
  njCount: number;
  njData: string;
}

export interface Results {
  result: Result[];
}

export interface Result {
  type: string;
  code: string;
  details: string;
  count: number;
  data: string;
}

export interface AddressResult {
  addressCode: string;
  addressDetails: string;
}

export interface Status {
  status: string;
  callsRemaining: string;
}
