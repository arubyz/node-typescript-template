import { $, script } from './lib/utils.js';
import clean from './clean.js';
import format from './format.js';

export default script(async ([arg]) => {
    if (arg?.length && arg !== 'full') {
        throw new Error('Optional argument must be "full"');
    }

    if (arg === 'full') {
        await clean();
        await $`tsc --build --force --pretty`;
        await format('check');
    } else {
        await $`tsc --incremental --pretty`;
    }
});
