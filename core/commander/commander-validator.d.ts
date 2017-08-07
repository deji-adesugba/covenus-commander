import { CommanderProgramExplorer } from './commander-explorer';
import { CliProgram } from './injector/program';
import { CommanderBase } from './commander-base';

export declare class CommanderValidator {
    constructor(program: CliProgram);
    validateOption(optionTypeName: string, optionMetatype): any;
    validateCommand(cliProgram: CliProgram, cmdTypeName: string, commandMetatype): any;
    validateArgs(arg: string, isRequiredArgs: boolean): any;
    validateVariadicArg(variadicArg: string): any;
    validateCoreCommand(command: any): any;
}