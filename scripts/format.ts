import { $, script } from './lib/utils.js';

const src_dir = "./src";

export default script(async ([cmd]) => {
    if (cmd !== 'check' && cmd !== 'fix') {
        throw new Error('Must specify either "check" or "write"');
    }

    if (cmd === 'check') {
        await $`yarn --silent run prettier --check ${src_dir}/**/*.ts`;
    } else {
        await $`yarn --silent run prettier --write ${src_dir}/**/*.ts`;
    }
});
