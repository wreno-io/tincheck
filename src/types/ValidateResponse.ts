import type { DetailedValidateTinNameAddressListMatchResponse } from "./DetailedValidateTinResponse.js";

export type ValidateResponse = {
  success: boolean;
  data: {
    didPerformTinCheck: boolean;
    isTinCheckIssuesFound: boolean;
    errorSummary: string[];
    tinCheckItemBreakdown: {
      type: string;
      isIssueFound: boolean;
      details: string;
    }[];
  };
  detailedResponse: DetailedValidateTinNameAddressListMatchResponse["validateTinNameAddressListMatchResult"];
};
