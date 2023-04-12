import * as fs from 'node:fs';
import * as path from 'node:path';
import { argv, $yarn } from './utils.js';

const [name, ...args] = argv;

if (name) {
    await $yarn`--silent run:ts scripts/${name}.ts ${args}`;
} else {
    console.log('Available scripts:');
    fs.readdirSync('scripts').forEach(file => {
        console.log(`    ${path.parse(file).name}`);
    });
    process.exit(1);
}
