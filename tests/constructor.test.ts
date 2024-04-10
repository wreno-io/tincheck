import { describe, expect, test } from "vitest";
import TinCheck from "../src/tincheck.js";

describe("TinCheck Constructor Tests", () => {
  test("TinCheck constructor should not throw when set correctly", () => {
    expect(() => {
      new TinCheck({
        username: "username",
        password: "password",
      });
    }).not.toThrow();
  });

  test("TinCheck constructor should throw error if username and password is not provided", () => {
    expect(() => {
      // @ts-expect-error this is for testing purposes
      new TinCheck({});
    }).toThrow("username and password is required");
  });

  test("TinCheck constructor should throw error if username is empty", () => {
    expect(() => {
      new TinCheck({
        username: "",
        password: "password",
      });
    }).toThrow("username and password is required");
  });
});
