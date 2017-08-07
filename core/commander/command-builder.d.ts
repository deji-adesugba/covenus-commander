import { CliProgram } from '../injector/program';
import { CommanderBuilder } from './commander-builder';
import { CommandProperties } from './commander-reflector';

export declare class CommandBuilder{
    constructor(commandBuilder: CommanderBuilder);
    build(command: CommandProperties);
    execute();
}