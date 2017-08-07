export declare class CLIException {
    private readonly message;

    constructor(message: string | object);
    getMessage(): string | object;
}
