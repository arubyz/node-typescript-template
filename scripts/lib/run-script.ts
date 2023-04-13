import fs from 'node:fs';
import path from 'node:path';

// The process.argv array is laid out as follows:
//     argv[0]: the path to the node binary
//     argv[1]: the path to the root script
//     argv[2]: the first argument to the root script
//     argv[3]: the second argument to the root script
//     ...
const [script, ...args] = process.argv.slice(2);

if (script) {
    const { default: run } = await import(`../${script}.js`);
    await run(...args);
} else {
    console.log('Available scripts:');
    fs.readdirSync('scripts', { withFileTypes: true }).forEach(file => {
        if (!file.isDirectory()) {
            console.log(`    ${path.parse(file.name).name}`);
        }
    });
    process.exit(1);
}
