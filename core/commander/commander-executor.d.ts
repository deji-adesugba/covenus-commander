import { CliProgram } from './injector/program';
import { CommanderBase } from './commander-base';
import { CommanderExceptionTraps } from './commander-exception-traps'

export declare class CommanderExecutor extends CommanderBase{
    constructor(program: CliProgram, commanderExceptionTraps: CommanderExceptionTraps);
    executeProgram():void;
    isArgumentBasedProgram():boolean;
    isCommandBasedProgram():boolean;
    isOptionBasedProgram():boolean;
}