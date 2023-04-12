import { argv, $yarn } from './lib/utils.js';

const src_dir = "./src";

const [cmd] = argv;

if (cmd !== 'check' && cmd !== 'write') {
    throw new Error('ERROR: Must specify either "check" or "write"');
}

// Check ts files
if (cmd === 'check') {
    await $yarn`--silent run prettier --check ${src_dir}/**/*.ts`;
} else {
    await $yarn`--silent run prettier --write ${src_dir}/**/*.ts`;
}
