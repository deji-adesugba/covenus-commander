import { CliProgram } from '../injector/program';

export declare class CommanderBase{
    private readonly program;
    constructor(program: CliProgram);
    reflectMetadata(key: string, type?: any): any;
    getProgram(): CliProgram;
}