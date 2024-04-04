import { describe, expect, test } from "vitest";
import TinCheck from "../src";

describe("TinCheck Constructor Tests", () => {
  test("TinCheck constructor should not throw when set correctly", () => {
    expect(() => {
      new TinCheck({
        apiKey: "aaa",
      });
    }).not.toThrow();
  });
  test("TinCheck constructor should throw error if apiKey is not provided", () => {
    expect(() => {
      // @ts-expect-error this is for testing purposes
      new TinCheck({});
    }).toThrow("apiKey is required");
  });
});
