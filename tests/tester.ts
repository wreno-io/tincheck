import TinCheck from "../src/index.js";
import fs from "fs/promises";
import transformResponse from "../src/transformResponse.js";

(async () => {
  const tincheck = new TinCheck({
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  });

  try {
    const id = "83-33334454430";
    const name = "Bad Name";
    // const check = await tincheck.validate(id, name);
    // console.log("tin check response", check);
    // await fs.writeFile(`tincheck-${name}.json`, JSON.stringify(check, null, 2));
    const data = await fs.readFile(`tincheck-${name}.json`, "utf-8");
    const json = JSON.parse(data);
    console.log(json);
    transformResponse(json);
  } catch (err) {
    console.log(err.message);
  }
})();
