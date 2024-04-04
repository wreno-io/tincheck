import TinCheck from "../src/index";
import fs from "fs/promises";

(async () => {
  const tincheck = new TinCheck({
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  });

  try {
    const id = "";
    const name = "";
    const check = await tincheck.validate(id, name);
    console.log("tin check response", check);
    await fs.writeFile(`tincheck-${name}.json`, JSON.stringify(check, null, 2));
  } catch (err) {
    console.log(err.message);
  }
})();
