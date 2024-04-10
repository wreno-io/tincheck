import { describe, expect, test } from "vitest";
import TinCheck from "../src/index.js";

describe("TinCheck Constructor Tests", () => {
  test("TinCheck constructor should not throw when set correctly", () => {
    expect(() => {
      new TinCheck({
        username: "username",
        password: "password",
      });
    }).not.toThrow();
  });
  test("TinCheck constructor should throw error if apiKey is not provided", () => {
    expect(() => {
      // @ts-expect-error this is for testing purposes
      new TinCheck({});
    }).toThrow("username and password is required");
  });
});
