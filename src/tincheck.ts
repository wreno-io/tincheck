import * as soap from "soap";
import fs from "fs/promises";
import transformResponse from "./transformResponse/transformResponse.js";
import keyOverrides from "./transformResponse/keyOverrides.js";
import valueMappers from "./transformResponse/valueMappers.js";
import { transform } from "esbuild";
import { ValidateTinNameAddressListMatchResponse } from "./types/ValidateTinResponse.js";

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

  async validate(tin: string, name: string) {
    // remove dashes from tin
    tin = tin.replace(/-/g, "");
    const response = await this.send("ValidateTinNameAddressListMatch", {
      TinName: { TIN: tin, LName: name },
    });
    // const data = await fs.readFile(`tincheck-wreno.json`, "utf-8");
    // const response = JSON.parse(data);
    const transformed = this.transformResponse(
      response
      // TODO: We may want to validate this response before continuing
    ) as ValidateTinNameAddressListMatchResponse;

    if (!transformed["validateTinNameAddressListMatchResult"]) {
      throw new Error("Incorrect Response from Service");
    }
    const result = transformed["validateTinNameAddressListMatchResult"];
    if (result["requestStatus"] !== 1) {
      throw new Error(
        `Request Turned incorrect REQUEST_STATUS code ${result.requestStatus}`
      );
    }
    return result;
  }

  async send(func: string, args?: Record<string, any>) {
    const client = await this.client;
    const endpoint = client[func + "Async"];
    const response = await endpoint({
      CurUser: {
        UserLogin: this.username,
        UserPassword: this.password,
      },
      ...(args || {}),
    });
    // TODO: error handling
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
