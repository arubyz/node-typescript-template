import { $, script } from './lib/utils.js';

const files = ['src/**/*.ts', 'scripts/**/*.ts'];

export default script(async ([cmd]) => {
    switch (cmd) {
        case 'check':
            await $`yarn --silent run prettier --check ${files}`;
            break;
        case 'fix':
            await $`yarn --silent run prettier --write ${files}`;
            break;
        default:
            throw new Error('Must specify either "check" or "fix"');
    }
});
