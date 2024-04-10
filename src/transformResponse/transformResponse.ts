import camelCase from "camelcase";

export type KeyOverrides = Record<string, string>;

export type ValueMappers = Record<string, (val: unknown) => unknown>;

interface TransformResponseOptions {
  keyOverrides?: KeyOverrides;
  valueMappers?: ValueMappers;
}

/**
 * Recursively transforms the keys of an object to camelCase,
 * and optionally remaps keys and values based on the options provided
 */
export default function transformResponse<T>(
  data: unknown,
  options?: TransformResponseOptions
): T {
  if (typeof data !== "object" || !data) {
    throw new Error("Data must be an object");
  }
  return Object.entries(data).reduce<Record<string, unknown>>(
    (acc, [key, val]) => {
      let newVal =
        val && typeof val === "object"
          ? transformResponse(val, options)
          : transformValue(key, val, options?.valueMappers);
      acc[changeCase(key, options?.keyOverrides)] = newVal;
      return acc;
    },
    {}
  );
}

/**
 * Small wrapper around camelCase to change the key to camelCase,
 * Can be overridden by the keyOverrides map
 */
function changeCase(key: string, keyOverrides: KeyOverrides = {}): string {
  if (keyOverrides[key]) {
    return keyOverrides[key];
  }
  return camelCase(key);
}

/**
 * If a value mapper is provided for the key, it will be called with the value
 * for example, you could convert a value to a number or a boolean before returning it
 * If no value mapper is provided, the value will be returned as is
 */
function transformValue(
  originalKey: string,
  value: unknown,
  valueMappers: ValueMappers = {}
) {
  if (valueMappers[originalKey]) {
    return valueMappers[originalKey](value);
  }
  return value;
}
