# tincheck

A simple tool to run a TIN Check through [tin-checker.com](https://tin-checker.com/).

## Installation

```bash
yarn add tincheck
```

## Usage

```javascript
import TinCheck from "tincheck";

const tinCheck = new TinCheck();

tinCheck
  .check("123456789", "123456789", "123456789")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

## TODO

- Setup builds
- improve docs
- add tests
- add more features
- add more examples
- add more error handling
- add more types
- add more comments
