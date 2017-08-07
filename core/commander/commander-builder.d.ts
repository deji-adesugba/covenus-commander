import { CliProgram } from './injector/program';
import { CommanderBase } from './commander-base';
import { Builder } from './interfaces/builder.interface';
import { CommanderExceptionTraps } from './commander-exception-traps';
import { Commander } from 'commander';

export declare class CommanderBuilder extends CommanderBase{
    constructor(program: CliProgram, commanderExceptionTraps: CommanderExceptionTraps);
    getOptionsBuilder(): Builder;
    getArgumentBuilder(): Builder;
    getCommandsBuilder(): Builder;
    getCommander(): Commander;
    registerBuildHelpProvider(callback: ()=>void): void;
}