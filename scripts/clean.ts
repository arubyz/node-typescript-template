import * as fs from 'fs-extra';

console.log('Removing ./out ...');
await fs.remove('./out');
