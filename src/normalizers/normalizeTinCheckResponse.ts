import type { DetailedValidateTinNameAddressListMatchResponse } from "../types/DetailedValidateTinResponse.js";
import type { ValidateResponse } from "../types/ValidateResponse.js";

// code details can be found here: https://www.tincheck.com/pages/developer
const VALID_TINNAME_CODES = [1, 6, 7, 8];
const VALID_LISTMATCH_CODE = 0;
const ISSUES_FOUND_LISTMATCH_CODE = 1;

export default function normalizeTinCheckResponse(
  request: DetailedValidateTinNameAddressListMatchResponse["validateTinNameAddressListMatchResult"],
): ValidateResponse {
  const didPerformTinCheck = VALID_TINNAME_CODES.includes(
    request.tinnameResult.tinnameCode,
  );

  if (!didPerformTinCheck) {
    return {
      success: true,
      data: {
        didPerformTinCheck,
        isTinCheckIssuesFound: true,
        errorSummary: [request.tinnameResult.tinnameDetails],
        tinCheckItemBreakdown: [],
      },
      detailedResponse: request,
    };
  }

  // if there was an error processing lists, we return success false.
  if (
    request.listmatchResult.listsmatchCode !== ISSUES_FOUND_LISTMATCH_CODE &&
    request.listmatchResult.listsmatchCode !== VALID_LISTMATCH_CODE
  ) {
    throw new Error(
      `Request returned incorrect LISTSMATCH_CODE ${request.listmatchResult.listsmatchCode}. Message: "${request.listmatchResult.listsmatchDetails}"`,
    );
  }

  const isTinCheckIssuesFound =
    request.listmatchResult.listsmatchCode !== VALID_LISTMATCH_CODE;
  const tinCheckItemBreakdown = getTinCheckItemBreakdown(request);
  return {
    success: true,
    data: {
      didPerformTinCheck,
      isTinCheckIssuesFound,
      errorSummary: tinCheckItemBreakdown
        .filter((i) => i.isIssueFound)
        .map((i) => i.details),
      tinCheckItemBreakdown,
    },
    detailedResponse: request,
  };
}

function getTinCheckItemBreakdown(
  request: DetailedValidateTinNameAddressListMatchResponse["validateTinNameAddressListMatchResult"],
) {
  return (
    request.listmatchResult.results?.result?.map((item) => {
      return {
        type: item.type,
        isIssueFound: item.count > 0,
        details: item.details,
      };
    }) || []
  );
}
