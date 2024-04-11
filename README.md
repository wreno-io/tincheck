# tincheck

A simple tool to run a TIN Check through [tincheck.com](https://tincheck.com/).

## Features

- 🚀 Easy to use
- 🧐 Validate an EIN/SSN with a name through [tincheck.com](https://tincheck.com/)
- ℹ️ Get detailed information about the validation result
- 🎹 Written in Typescript
- ✅ Includes mock data for testing
- 🌡️ 100% test coverage

## Prerequisites

- A valid account on [tincheck.com](https://tincheck.com/)
- Enough credits to run checks
- A valid EIN/SSN to check along with their respective name

## Installation

```bash
yarn add tincheck
```

## Usage

```javascript
import TinCheck from "tincheck";

const tinCheck = new TinCheck({
  username: "your-username",
  password: "your-password",
});
const result = await tinCheck.validate("123456789", "ACME Corp");
// Result will contain a normalized overview of the results,
// as well as a detailed response from the API
console.log(result);
```

## API Reference

This repository also provides detailed tests which you can use to [see various examples](./tests/constructor.test.ts) of how to use the API.

### validate 

The TinCheck library exposes several methods. The primary method is `validate`, which takes an EIN/SSN and a name as arguments. This method returns a promise that resolves to an object containing the validation result.

```typescript
type ValidateResponse = {
  success: true;
  data: {
    didPerformTinCheck: boolean;
    isTinCheckIssuesFound: boolean;
    errorSummary: string[];
    tinCheckItemBreakdown: {
      type: string;
      isIssueFound: boolean;
      details: string;
    }[];
  };
  detailedResponse: DetailedValidateTinNameAddressListMatchResponse["validateTinNameAddressListMatchResult"];
};
```

See [./src/types/ValidateResponse.ts](./src/types/ValidateResponse.ts) for more information.

Additionally, this method will throw an error if the API request fails. The error will contain the response from the API.

It's important to note that the `validate` method will return a successful response even if the EIN/SSN is invalid. The `success` property in the response object indicates that the request was successful, not that the EIN/SSN is valid. To determine if the EIN/SSN is valid, you should check the `isTinCheckIssuesFound` and `didPerformTinCheck` properties in the response object.

### Error Codes

The TinCheck API may return an error code if the request fails. The error code is included in the response object under the `errorSummary` property. The error code will be a string that describes the error that occurred.

You may also get back a `REQUEST_STATUS` error code or other error codes. These error codes are not specific to our code, but rather the API response. To get details on the error you receive, [go here](https://www.tincheck.com/pages/developer), click `ValidateTinNameAddressListMatch` (or respective method), and view the error code tables. For example, `REQUEST_STATUS` error code 10 is: `Login denied: Invalid User Login and/or Password`

### Additional Information

Check out the [tincheck API documentation](https://www.tincheck.com/pages/developer) for more information.


## Typescript

This package is written in Typescript and includes type definitions for the responses. 

## Mock Data

This package includes mock data for the API responses. You can use this data to test your application without making actual API requests.

To use the mock data, you can import mocks from the following path:

```js
import validEINNoIssues from "tincheck/mockResponses/ValidEIN-NoIssues.json";
```

See the `public/mockResponses` folder for more examples of scenarios you can test.

## I found an issue, how can I help fix it?

If you find an issue with the TinCheck package, please open an issue on the [GitHub repository](https://github.com/wreno-io/tincheck). If you would like to contribute a fix, please fork the repository and submit a pull request.

We suggest fixing the issue in the following steps if it involves an API response:

1. Capture the raw response by running `yarn debug`. You will need to create a `.env` file and specify your username and password in order to run this command.
2. Create a new file in the `tests/__mocks__` folder with the name of the response you captured. Be sure to remove any sensitive information from the response.
3. Update the `tests/validate.test.ts` file (or applicable file) to use the new response file as a mock, adding a new test for the case.
4. Run `yarn test` to ensure the new test passes.
5. Submit a pull request with the new test and response file.

## Sponsored by

This package is sponsored by [Wreno](https://wreno.io/), a platform for complete vendor sourcing and management. Wreno is a platform that helps you find, vet, and manage vendors for your business. It also performs TIN checks on your behalf, so you can focus on growing your business. 😉 
