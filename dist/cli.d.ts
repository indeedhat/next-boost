export declare type Argv = {
    [key: string]: boolean | number | string;
};
export declare function parse(raw: string[]): Argv | void;
