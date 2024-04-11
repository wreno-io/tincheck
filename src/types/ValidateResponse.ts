import type { DetailedValidateTinNameAddressListMatchResponse } from "./DetailedValidateTinResponse.js";

export type ValidateResponse = {
  success: true;
  data: {
    didPerformTinCheck: boolean;
    isTinCheckIssuesFound: boolean;
    errorSummary: string[];
    // todo: add type for this
    tinCheckItemBreakdown: [];
  };
  detailedResponse: DetailedValidateTinNameAddressListMatchResponse["validateTinNameAddressListMatchResult"];
};
