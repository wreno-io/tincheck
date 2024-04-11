import { describe, expect, test, vi } from "vitest";
import TinCheck from "../src/index.js";

describe("TinCheck getServiceStatus Method Tests", () => {
  const tinCheck = new TinCheck({
    username: "username",
    password: "password",
  });
  test("Method is callable", async () => {
    vi.spyOn(tinCheck, "send").mockReturnValue(
      Promise.resolve({
        requestStatus: 1,
      }),
    );
    expect(tinCheck.getServiceStatus).toBeDefined();
    const response = await tinCheck.getServiceStatus();
    expect(response.requestStatus).toBe(1);
    expect(tinCheck.send).toBeCalled();
  });
});
