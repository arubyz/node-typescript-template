import { argv, $yarn, $tsc } from './lib/utils.js';

const [cmd] = argv;

if (cmd?.length && cmd !== 'full') {
    throw new Error('Optional argument must be "full"');
}

if (cmd === 'full') {
    await $yarn`--silent run:script clean`;
    await $tsc`--build --force --pretty`;
    await $yarn`--silent run:script format check`;
} else {
    await $tsc`--incremental --pretty`;
}
