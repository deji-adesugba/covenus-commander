import { CliProgram } from './injector/program';
import { CommanderBuilder } from './commander-builder';
import { ArgumentResults } from './commander-reflector';

export declare class ArgumentBuilder{
    constructor(commandBuilder: CommanderBuilder);
    build(argument: ArgumentResults);
    execute();
}