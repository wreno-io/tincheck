import { ValueMappers } from "./transformResponse.js";

function toNumber(val: unknown) {
  return Number(val);
}

const valueMappers: ValueMappers = {
  REQUESTID: toNumber,
  REQUEST_STATUS: toNumber,
};

export default valueMappers;
