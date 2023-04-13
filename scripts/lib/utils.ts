import chalk from "chalk";
import { $ as $original } from "execa";

// Top-level exception handler
async function catch_errors<T>(body: () => Promise<T>): Promise<T> {
    try {
        return await body();
    } catch (e) {
        if (e instanceof Error) {
            if ("exitCode" in e && typeof e.exitCode == 'number') {
                process.exit(e.exitCode);
            } else {
                console.log(chalk.red.bold(`\nERROR: ${e.message}\n`));
                process.exit(1);
            }
        } else {
            throw e;
        }
    }
}

// Used to define a script
export function script(main: (argv: string[]) => Promise<void>) {
    return function run(...argv: string[]) {
        return catch_errors(() => main(argv));
    }
}

// Default execa settings for script commands
const $default = $original({ stdio: 'inherit', verbose: true });

// Wrap the execa $ function to catch errors.  Since $ is actually an overloaded
// function (which doesnt work with the Parameters<> utility type), we use the
// equivalent parameter type of the non-overloaded 'sync' method instead.
export function $(...args: Parameters<(typeof $original)['sync']>) {
    return catch_errors(() => $default(...args));
};
