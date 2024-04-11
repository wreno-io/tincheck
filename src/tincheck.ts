import * as soap from "soap";
import keyOverrides from "./transformResponse/keyOverrides.js";
import transformResponse from "./transformResponse/transformResponse.js";
import valueMappers from "./transformResponse/valueMappers.js";
import type { DetailedValidateTinNameAddressListMatchResponse } from "./types/DetailedValidateTinResponse.js";
import type { ValidateResponse } from "./types/ValidateResponse.js";
import normalizeTinCheckResponse from "./normalizers/normalizeTinCheckResponse.js";

interface ConstructorArgs {
  username: string;
  password: string;
}

const config = {
  url: "https://www.tincheck.com/pvsws/pvsservice.asmx?wsdl",
};

class TinCheck {
  private username: string;
  private password: string;
  private client: Promise<soap.Client>;

  constructor(args: ConstructorArgs) {
    if (!args.username || !args.password) {
      throw new Error("username and password is required");
    }
    this.username = args.username;
    this.password = args.password;
    this.client = soap.createClientAsync(config.url);
  }

  async getServiceStatus() {
    return await this.send("ServiceStatus");
  }

  async validate(tin: string, name: string): Promise<ValidateResponse> {
    // remove dashes from tin
    const sanitizedTin = tin.replace(/-/g, "");
    const response = await this.send("ValidateTinNameAddressListMatch", {
      TinName: { TIN: sanitizedTin, LName: name },
    });
    const transformed = this.transformResponse(
      response,
      // TODO: We may want to add validation to the response before continuing
    ) as DetailedValidateTinNameAddressListMatchResponse;

    // If the response is not what we expect, throw an error
    if (!transformed.validateTinNameAddressListMatchResult) {
      throw new Error("Incorrect Response from Service");
    }
    // If the request status is not 1, throw an error
    // 1 is the expected value for a successful request
    const result = transformed.validateTinNameAddressListMatchResult;
    if (result.requestStatus !== 1) {
      throw new Error(
        `Request Turned incorrect REQUEST_STATUS code ${result.requestStatus}`,
      );
    }
    // At this point, we know the request is successful,
    // there is however a chance that the TIN is not found
    // or other issues are found. We will no longer throw an error
    // but we will return the result
    return normalizeTinCheckResponse(result);
  }

  async send(func: string, args?: Record<string, any>) {
    const client = await this.client;
    const endpoint = client[`${func}Async`];
    const response = await endpoint({
      CurUser: {
        UserLogin: this.username,
        UserPassword: this.password,
      },
      ...(args || {}),
    });
    return response[0];
  }

  private transformResponse(data: unknown) {
    return transformResponse(data, {
      keyOverrides,
      valueMappers,
    });
  }
}

export default TinCheck;
