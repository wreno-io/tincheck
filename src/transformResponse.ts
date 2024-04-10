import camelCase from "camelcase";

interface TransformResponseOptions {
  keyOverrides?: Record<string, string>;
}

export default function transformResponse(
  data: unknown,
  options?: TransformResponseOptions
) {
  if (typeof data !== "object" || !data) {
    throw new Error("Data must be an object");
  }
  // TODO: add ability to transform values
  return recursivelyTransformKeys(data, options);
}

/**
 * Small wrapper around camelCase to change the key to camelCase,
 * keeping separate incase special handling is needed in the future.
 */
function changeCase(
  key: string,
  keyOverrides: TransformResponseOptions["keyOverrides"] = {}
): string {
  if (keyOverrides[key]) {
    return keyOverrides[key];
  }
  return camelCase(key);
}

function recursivelyTransformKeys(
  origObj: object,
  options?: TransformResponseOptions
) {
  return Object.entries(origObj).reduce<Record<string, string | object>>(
    (acc, [key, val]) => {
      let newVal =
        val && typeof val === "object"
          ? recursivelyTransformKeys(val, options)
          : val;
      acc[changeCase(key, options?.keyOverrides)] = newVal;
      return acc;
    },
    {}
  );
}
