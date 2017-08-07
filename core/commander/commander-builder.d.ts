import { CliProgram } from '../injector/program';
import { CommanderBase } from './commander-base';
import { Builder } from './interfaces/builder.interface';
import { CommanderExceptionTraps } from './commander-exception-traps';
import * as program from "commander";
type ProgramCommander = program.CommanderStatic;

export declare class CommanderBuilder extends CommanderBase{
    constructor(program: CliProgram, commanderExceptionTraps: CommanderExceptionTraps);
    getOptionsBuilder(): Builder;
    getArgumentBuilder(): Builder;
    getCommandsBuilder(): Builder;
    getCommander(): ProgramCommander;
    registerBuildHelpProvider(callback: ()=>void): void;
}