import * as fs from 'node:fs';
import * as path from 'node:path';

const scripts_dir = 'scripts';

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
    fs.readdirSync(scripts_dir).forEach(file => {
        const file_path = path.join(scripts_dir, file);
        if (!fs.statSync(file_path).isDirectory()) {
            console.log(`    ${path.parse(file).name}`);
        }
    });
    process.exit(1);
}
