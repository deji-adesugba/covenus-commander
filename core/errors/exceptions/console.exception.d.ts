export declare class Error {
    name: string;
    message: string;
    constructor(message?: string);
}
export declare class ConsoleException extends Error {
    private msg;
    constructor(msg?: string);
    what(): string;
}