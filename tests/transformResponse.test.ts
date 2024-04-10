import { describe, expect, test } from "vitest";
import transformResponse from "../src/transformResponse/transformResponse.js";

describe("Transform Response Utility", () => {
  test("Should convert object keys to camelCase", () => {
    const data = {
      HELLO_WORLD: "Hello World",
      HELLO: {
        WORLD: "Hello World",
      },
    };
    const transformed = transformResponse(data);
    expect(transformed).toEqual({
      helloWorld: "Hello World",
      hello: {
        world: "Hello World",
      },
    });
  });

  test("Should throw error if data is not an object", () => {
    expect(() => {
      transformResponse("hello");
    }).toThrow("Data must be an object");
  });

  test("Should return empty object if data is empty", () => {
    const transformed = transformResponse({
      HELLO_WORLD: "Hello World",
      HELLO: {
        WORLD: {},
      },
    });
    expect(transformed).toEqual({
      helloWorld: "Hello World",
      hello: {
        world: {},
      },
    });
  });

  test("Should remap keys if it is inside the overrides map", () => {
    const data = {
      REQUESTID: "123",
      SUBREQUESTID: {
        REQUESTID: "123",
      },
    };
    const transformed = transformResponse(data, {
      keyOverrides: {
        REQUESTID: "requestId",
        SUBREQUESTID: "subRequestId",
      },
    });
    expect(transformed).toEqual({
      requestId: "123",
      subRequestId: {
        requestId: "123",
      },
    });
  });

  test("Should call remap value function if provided", () => {
    const data = {
      REQUESTID: "123",
      SUBREQUESTID: {
        REQUESTID: "123",
      },
    };
    const transformed = transformResponse(data, {
      keyOverrides: {
        REQUESTID: "requestId",
        SUBREQUESTID: "subRequestId",
      },
      valueMappers: {
        REQUESTID: (val: unknown) => Number(val),
      },
    });
    expect(transformed).toEqual({
      requestId: 123,
      subRequestId: {
        requestId: 123,
      },
    });
  });
});
