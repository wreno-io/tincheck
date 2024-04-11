import unknownError from "./__mocks__/unknownError.json";
import validEIN from "./__mocks__/validEIN-noIssues.json";
import { describe, expect, afterEach, vi, test } from "vitest";
import TinCheck from "../src/tincheck.js";

describe("TinCheck Validate Method Tests", () => {
  const tinCheck = new TinCheck({
    username: "username",
    password: "password",
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should send a proper request to the server", async () => {
    const mock = vi
      .spyOn(tinCheck, "send")
      .mockReturnValue(Promise.resolve(unknownError));
    await tinCheck.validate("111-111-111", "222");
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith("ValidateTinNameAddressListMatch", {
      TinName: {
        LName: "222",
        // note that the TIN is stripped of the dashes
        TIN: "111111111",
      },
    });
  });

  test("Should report when tin lookup failed", async () => {
    vi.spyOn(tinCheck, "send").mockReturnValue(Promise.resolve(unknownError));
    const result = await tinCheck.validate("111-111-111", "222");
    expect(result.success).toBe(true);
    expect(result.data.didPerformTinCheck).toBe(false);
    expect(result.data.isTinCheckIssuesFound).toBe(false);
    expect(result.data.errorSummary).toEqual([
      "No TIN provided. TIN lookup skipped.",
    ]);
  });

  test("should report successfully when lookup is successful", async () => {
    vi.spyOn(tinCheck, "send").mockReturnValue(Promise.resolve(validEIN));
    const response = await tinCheck.validate("111-111-111", "222");
    expect(response.data.didPerformTinCheck).toBe(true);
    expect(response.data.isTinCheckIssuesFound).toBe(false);
    expect(response.data.errorSummary).toEqual([]);
  });
});
