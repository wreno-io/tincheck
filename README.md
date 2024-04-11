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

## Typescript

This package is written in Typescript and includes type definitions for the responses. 

## TODO

- network error test
- update readme
- wreno sponsorship note
- publish