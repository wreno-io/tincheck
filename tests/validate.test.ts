import unknownError from "./__mocks__/unknownError.json";
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
        TIN: "111111111",
      },
    });
  });
});
