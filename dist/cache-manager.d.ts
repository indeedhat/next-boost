/// <reference types="node" />
import { ServerResponse } from 'http';
import Cache from 'hybrid-disk-cache';
declare type ServeResult = {
    status: ReturnType<Cache['has']> | 'force' | 'error';
    stop: boolean;
};
export declare function initPurgeTimer(cache: Cache): void;
export declare function stopPurgeTimer(): void;
export declare function serveCache(cache: Cache, lock: Set<string>, key: string, forced: boolean, res: ServerResponse): Promise<ServeResult>;
export {};
