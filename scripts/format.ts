import { $, script } from './lib/utils.js';

const files = ['src/**/*.ts', 'scripts/**/*.ts'];

export default script(async ([cmd]) => {
    if (cmd !== 'check' && cmd !== 'fix') {
        throw new Error('Must specify either "check" or "write"');
    }

    if (cmd === 'check') {
        await $`yarn --silent run prettier --check ${files}`;
    } else {
        await $`yarn --silent run prettier --write ${files}`;
    }
});
