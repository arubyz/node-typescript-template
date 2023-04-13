import fs from 'fs-extra';
import { script } from './lib/utils.js';

export default script(async _ => {
    console.log('Removing ./node_modules ...');
    await fs.remove('./node_modules');
});
