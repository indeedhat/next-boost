/// <reference types="node" />
import { IncomingMessage, RequestListener } from 'http';
import Cache from 'hybrid-disk-cache';
import { InitArgs } from './renderer';
import { ParamFilter } from './utils';
interface URLCacheRule {
    regex: string;
    ttl: number;
}
export declare type CacheKeyBuilder = (req: IncomingMessage) => string;
export interface HandlerConfig {
    filename?: string;
    quiet?: boolean;
    cache?: {
        ttl?: number;
        tbd?: number;
        path?: string;
    };
    rules?: Array<URLCacheRule>;
    paramFilter?: ParamFilter;
    cacheKey?: CacheKeyBuilder;
}
export default function CachedHandler(args: InitArgs, options?: HandlerConfig): Promise<{
    handler: RequestListener;
    cache: Cache;
    close: () => void;
}>;
export {};
