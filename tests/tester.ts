import fs from "node:fs/promises";
import TinCheck from "../src/tincheck.js";

(async () => {
  const tincheck = new TinCheck({
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  });

  try {
    const id = "83-33334454430";
    const name = "wreno";
    const check = await tincheck.validate(id, name);
    console.log(check);
    await fs.writeFile(`tincheck-${name}.json`, JSON.stringify(check, null, 2));
  } catch (err: unknown) {
    console.log(err);
  }
})();
