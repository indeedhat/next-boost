"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const helpMessage = `
  Description
    Starts next.js application with stale-while-validate style cache.
    The application should be compiled with \`next build\` first.

  Usage
    $ next-boost <dir> -p <port>

  <dir> represents the directory of the Next.js application.
  If no directory is provided, the current directory will be used.

  Options
    --port, -p      A port number on which to start the application
    --hostname, -H  Hostname on which to start the application
    --help, -h      Displays this message
    --quiet, -q     No log output
`;
function help(argv) {
    console.log(helpMessage);
    if (argv) {
        throw new Error(`Failed to parse arguments ${argv.join(' ')}`);
    }
}
const types = {
    '--help': Boolean,
    '--quiet': Boolean,
    '--port': Number,
    '--hostname': String,
};
const alias = {
    '-h': '--help',
    '-q': '--quiet',
    '-p': '--port',
    '-H': '--hostname',
};
function parse(raw) {
    raw = raw.slice(2);
    const argv = {};
    for (let i = 0; i < raw.length; i++) {
        let arg = raw[i];
        if (arg in alias)
            arg = alias[arg];
        const type = types[arg];
        if (!type) {
            if (!argv['dir']) {
                argv['dir'] = arg;
                continue;
            }
            else {
                return help(raw);
            }
        }
        if (type === Boolean) {
            argv[arg] = true;
            continue;
        }
        if (++i >= raw.length)
            return help(raw);
        const v = raw[i];
        if (type === Number)
            argv[arg] = parseInt(v, 10);
        else
            argv[arg] = v;
    }
    if (argv['--help'])
        return help();
    return argv;
}
exports.parse = parse;
