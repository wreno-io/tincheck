import * as soap from "soap";

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
    return await this.send("ValidateTinNameAddressListMatch", {
      TinName: { TIN: tin, LName: name },
    });
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
}

export default TinCheck;
