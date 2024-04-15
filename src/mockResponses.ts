import InvalidEIN from "../public/mockResponses/InvalidEIN.json";
import InvalidFormatting from "../public/mockResponses/InvalidFormatting.json";
import UnknownError from "../public/mockResponses/UnknownError.json";
import ValidEINNoIssues from "../public/mockResponses/ValidEIN-NoIssues.json";
import ValidEINWithIssues from "../public/mockResponses/ValidEIN-WithIssues.json";
import type { ValidateResponse } from "./types/ValidateResponse.js";

const invalidEIN = InvalidEIN as ValidateResponse;
const invalidFormatting = InvalidFormatting as ValidateResponse;
const unknownError = UnknownError as ValidateResponse;
const validEINNoIssues = ValidEINNoIssues as ValidateResponse;
const validEINWithIssues = ValidEINWithIssues as ValidateResponse;

export {
  invalidEIN,
  invalidFormatting,
  unknownError,
  validEINNoIssues,
  validEINWithIssues,
};
