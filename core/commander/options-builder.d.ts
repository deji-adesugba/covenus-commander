import { CliProgram } from './injector/program';
import { CommanderBuilder } from './commander-builder';
import { OptionProperties } from './commander-reflector';

export declare class OptionsBuilder{
    constructor(commandBuilder: CommanderBuilder, runOptionAsSubordinate: boolean);
    build(options: OptionProperties[]);
    surbordinateOptionPreExecute();
    execute();
}

export declare class OptionsBuilderHelper{
    constructor(commandBuilder: CommanderBuilder, options: OptionProperties[]);
    build();
}