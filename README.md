# tincheck

A simple tool to run a TIN Check through [tincheck.com](https://tincheck.com/).

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
const result = await tinCheck.validate("123456789" "ACME Corp")
console.log(result);
```

## API Reference



Check out the [tincheck API documentation](https://www.tincheck.com/pages/developer) for more information.

This repository also provides detailed tests which you can use to [see various examples](./tests/constructor.test.ts) of how to use the API.

> Getting an error code?
>
> rror codes go here: https://www.tincheck.com/pages/developer click ValidateTinNameAddressListMatch  fro example, yours is 10	Login denied: Invalid User Login and/or Password

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


## TODO

- network error test
- update readme
- wreno sponsorship note
- publish