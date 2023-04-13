import * as fs from 'fs-extra';
import { script } from './lib/utils.js';

export default script(async _ => {
    console.log('Removing ./out ...');
    await fs.remove('./out');
});
