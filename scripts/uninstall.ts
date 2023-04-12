import * as fs from "fs-extra";

console.log('Removing ./node_modules ...');
await fs.remove("./node_modules");
