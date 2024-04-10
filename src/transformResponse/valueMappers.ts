import type { ValueMappers } from "./transformResponse.js";

function toNumber(val: unknown) {
  return Number(val);
}

const valueMappers: ValueMappers = {
  REQUESTID: toNumber,
  REQUEST_STATUS: toNumber,
  TINNAME_CODE: toNumber,
};

export default valueMappers;
