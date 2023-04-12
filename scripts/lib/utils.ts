import chalk from "chalk";
import { $ } from "execa";

// Expose the arguments passed to the root script.  The process.argv array is laid
// out as follows:
//     argv[0]: the path to the node binary
//     argv[1]: the path to the root script
//     argv[2]: the first argument to the root script
//     argv[3]: the second argument to the root script
//     ...
export const argv = process.argv.slice(2);

// Exaca doesn't export this type, but we need it to define a function which wraps
// the $ tagged template function.  We can however extract the type from the second
// parameter of the non-overloaded 'sync' method.
type TemplateExpression = Parameters<(typeof $)['sync']>[1];

// There is no direct and type-safe way to construct a literal value that conforms to
// the TemplateStringsArray type, since it is an array with an extra named field.  The
// next best option is to create a subclass of Array<string>.
class SyntheticTemplateStringsArray
    extends Array<string>
    implements TemplateStringsArray
{
    constructor(public raw: string[], escaped: string[]) {
        super(...escaped);
    }
}

// Default execa settings for script commands
const $default = $({ stdio: 'inherit', verbose: true });

// Creates a JS function shortcut for a command called by a script
function make_command(command: string) {
    return async (
        strings: TemplateStringsArray,
        ...values: TemplateExpression[]
    ) => {
        const new_strings = new SyntheticTemplateStringsArray(
            [`${command} ${strings.raw[0]}`, ...strings.raw.slice(1)],
            [`${command} ${strings[0]}`, ...strings.slice(1)]
        );
        try {
            return await $default(new_strings, ...values);
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
    };
}

// List of command called by scripts
export const $yarn = make_command('yarn');
export const $tsc = make_command('tsc');
