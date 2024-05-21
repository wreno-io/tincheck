import * as soap from "soap";
import { describe, expect, test, vi } from "vitest";
import TinCheck from "../src/index.js";

describe("TinCheck send Method Tests", () => {
  test("Method exists", () => {
    const tinCheck = new TinCheck({
      username: "username",
      password: "password",
    });
    expect(tinCheck.send).toBeDefined();
  });

  test("Should properly instantiate the soap client", async () => {
    const mock = vi.spyOn(soap, "createClientAsync").mockReturnValue(
      // @ts-expect-error
      Promise.resolve({
        ValidateTinNameAddressListMatch: () => Promise.resolve({}),
      }),
    );
    new TinCheck({
      username: "username",
      password: "password",
    });
    expect(mock).toBeCalled();
    expect(mock).toBeCalledWith(
      "https://api.tincheck.com/pvsws/pvsservice.asmx",
    );
  });

  test("Should properly call a soap method", async () => {
    const TestAsyncFn = vi.fn();
    vi.spyOn(soap, "createClientAsync").mockReturnValue(
      // @ts-expect-error
      Promise.resolve({
        TestAsync: TestAsyncFn,
      }),
    );
    const tincheck = new TinCheck({
      username: "username",
      password: "password",
    });
    await expect(() => tincheck.send("Test", {})).rejects.toThrow(
      "TinCheck request failed",
    );
    expect(TestAsyncFn).toBeCalled();
  });

  test("Should return expected response from soap method", async () => {
    const mockResponse = {
      requestStatus: 1,
    };
    const mockFn = vi.fn(() => Promise.resolve([mockResponse]));
    vi.spyOn(soap, "createClientAsync").mockReturnValue(
      // @ts-expect-error
      Promise.resolve({
        TestAsync: mockFn,
      }),
    );
    const tincheck = new TinCheck({
      username: "username",
      password: "password",
    });
    const result = await tincheck.send("Test", {});
    expect(result).toBe(mockResponse);
    expect(mockFn).toBeCalled();
  });

  test("Should add additional arguments to soap method", async () => {
    const mockResponse = {
      requestStatus: 1,
    };
    const mockFn = vi.fn(() => Promise.resolve([mockResponse]));
    vi.spyOn(soap, "createClientAsync").mockReturnValue(
      // @ts-expect-error
      Promise.resolve({
        TestAsync: mockFn,
      }),
    );
    const tincheck = new TinCheck({
      username: "username",
      password: "password",
    });
    const result = await tincheck.send("Test", {
      additional: "argument",
    });
    expect(result).toBe(mockResponse);
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledWith({
      CurUser: {
        UserLogin: "username",
        UserPassword: "password",
      },
      additional: "argument",
    });
  });
});
