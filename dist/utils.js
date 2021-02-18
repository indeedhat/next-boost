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
exports.filterUrl = exports.serve = exports.sleep = exports.mergeConfig = exports.log = exports.isZipped = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function isZipped(headers) {
    const field = headers['content-encoding'];
    return typeof field === 'string' && field.includes('gzip');
}
exports.isZipped = isZipped;
function log(start, status, msg) {
    const [secs, ns] = process.hrtime(start);
    const ms = ns / 1000000;
    const timeS = `${secs > 0 ? secs + 's' : ''}`;
    const timeMs = `${secs === 0 ? ms.toFixed(1) : ms.toFixed(0)}ms`;
    const time = timeS + (secs > 1 ? '' : timeMs);
    console.log('%s | %s: %s', time.padStart(7), status.padEnd(6), msg);
}
exports.log = log;
function serve(res, rv) {
    for (const k in rv.headers)
        res.setHeader(k, rv.headers[k]);
    res.statusCode = rv.statusCode;
    res.end(Buffer.from(rv.body));
}
exports.serve = serve;
function mergeConfig(c = {}) {
    const conf = {
        cache: { ttl: 60, tbd: 3600 },
        rules: [{ regex: '.*', ttl: 3600 }],
    };
    if (!c.filename)
        c.filename = '.next-boost.js';
    const configFile = path_1.default.resolve(c.filename);
    if (fs_1.default.existsSync(configFile)) {
        try {
            const f = require(configFile);
            c.cache = Object.assign(f.cache || {}, c.cache || {});
            c.quiet = c.quiet || f.quiet;
            c = Object.assign(f, c);
            console.log('  Loaded next-boost config from %s', c.filename);
        }
        catch (error) {
            throw new Error(`Failed to load ${c.filename}`);
        }
    }
    // deep merge cache and remove it
    Object.assign(conf.cache, c.cache);
    delete c.cache;
    Object.assign(conf, c);
    return conf;
}
exports.mergeConfig = mergeConfig;
function filterUrl(url, filter) {
    if (!filter)
        return url;
    const [p0, p1] = url.split('?', 2);
    const params = new URLSearchParams(p1);
    const keysToDelete = [...params.keys()].filter(k => !filter(k));
    for (const k of keysToDelete)
        params.delete(k);
    const qs = params.toString();
    return qs ? p0 + '?' + qs : p0;
}
exports.filterUrl = filterUrl;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.sleep = sleep;
