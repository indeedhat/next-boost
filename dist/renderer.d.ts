/// <reference types="node" />
import http from 'http';
export declare type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void> | void;
declare type RenderOptions = {
    path?: string;
    method?: string;
    headers?: {
        [key: string]: any;
    };
};
export declare type RenderResult = {
    statusCode: number;
    headers: {
        [key: string]: any;
    };
    body: any;
};
export declare type InitArgs = {
    script: string;
    args?: any;
};
declare const _default: () => {
    init: (args?: InitArgs) => void | Promise<void>;
    render: (args?: RenderOptions) => RenderResult | Promise<RenderResult>;
    kill: () => void;
};
export default _default;
