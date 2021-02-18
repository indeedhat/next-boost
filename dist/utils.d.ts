/// <reference types="node" />
import { ServerResponse } from 'http';
import { HandlerConfig } from './handler';
import { RenderResult } from './renderer';
declare function isZipped(headers: {
    [key: string]: any;
}): boolean;
declare function log(start: [number, number], status: string, msg?: string): void;
declare function serve(res: ServerResponse, rv: RenderResult): void;
declare function mergeConfig(c?: HandlerConfig): HandlerConfig;
export declare type ParamFilter = (param: string) => boolean;
declare function filterUrl(url: string, filter?: ParamFilter): string;
declare function sleep(ms: number): Promise<void>;
export { isZipped, log, mergeConfig, sleep, serve, filterUrl };
