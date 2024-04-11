import fs from "node:fs/promises";
import TinCheck from "../src/tincheck.js";

/**
 * Helper function to send a request to the TinCheck API
 * and write the response to a file.
 *
 * This is useful if we want to see the raw response from the API,
 * add a new test case for an edge case, or debug an issue.
 */
(async () => {
  const tincheck = new TinCheck({
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  });

  try {
    const tin = process.env.TEST_TIN ?? "111111111";
    const name = process.env.TEST_NAME ?? "John Doe";
    const sanitizedTin = tin.replace(/-/g, "");
    const response = await tincheck.send("ValidateTinNameAddressListMatch", {
      TinName: { TIN: sanitizedTin, LName: name },
    });
    console.log(response);
    await fs.writeFile(
      "tincheck-api-response.json",
      JSON.stringify(response, null, 2),
    );
    console.log("DONE");
  } catch (err: unknown) {
    console.log(err);
  }
})();
