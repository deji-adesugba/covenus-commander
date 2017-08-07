import { CovenEnvironment } from '../enums/coven-environment.enum';

export declare class Logger {
    private context;
    private static mode;
    private readonly warningColor;
    private readonly errorColor;
    private readonly noticeColor;
    constructor(context: string);
    static setMode(mode: CovenEnvironment): void;
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    private logMessage(message);
    private printStackTrace(trace);
}
