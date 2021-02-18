#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cli_1 = require("../cli");
const handler_1 = __importDefault(require("../handler"));
const serve = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    const port = argv['--port'] || 3000;
    // no host binding by default, the same as `next start`
    const hostname = argv['--hostname'];
    const quiet = argv['--quiet'];
    const dir = argv['dir'] || '.';
    const script = require.resolve('./init');
    const rendererArgs = { script, args: { dir, dev: false } };
    const cached = yield handler_1.default(rendererArgs, { quiet });
    const server = new http_1.default.Server(cached.handler);
    server.listen(port, hostname, () => {
        console.log(`> Serving on http://${hostname || 'localhost'}:${port}`);
    });
    process.on('SIGTERM', () => {
        console.log('> Shutting down...');
        cached.close();
        server.close();
    });
});
if (require.main === module) {
    const argv = cli_1.parse(process.argv);
    if (argv)
        serve(argv);
}
