import { CliProgram } from './injector/program';
import { Reflector } from './interfaces/reflector.interface';
import { CommanderProxy, CommandProxyCallback, ArgumentProxyCallback, OptionProxyCallback } from './commander-proxy';
import { CommanderValidator } from './commander-validator';
import { CommanderBase } from './commander-base';

export declare class CommanderReflector extends CommanderBase implements Reflector {
    private readonly validator;
    constructor(program: CliProgram, validator: CommanderValidator);
    reflectCommandsMetadata(): CommandProperties[];
    reflectOptionsMetadata(forTarget): OptionProperties[];
    reflectArgumentMetadata(): ArgumentResults;
}

export interface CommandProperties {
    verb: string;
    verbDescription?: string;
    verbOption?: CommandOption;
    options?: OptionProperties[];
    requiredArgs?: ArgumentProperties[];
    optionalArgs?: ArgumentProperties[];
    variadicLastArg?: ArgumentProperties;
    alias?: string;
    allowUnknownOption?: boolean;
}

export interface CommandOption{
    noHelp?: boolean;
    isDefault?: boolean;
}

export interface OptionProperties {
    shortFlag: string;
    shortFlagRaw: string;
    fullFlag: string;
    fullFlagRaw: string;
    fullFlagCamelCased: string;
    flagArg: string;
    flagArgRaw: string;
    isFlagArgRequired: boolean;
    flagArgValueRegExp: RegExp;
    flagArgValueHintForRegExp: string;
    description: string;
    defaultValue: string;
    instanceWrapper: any;
}

export interface ArgumentProperties {
    arg: string;
    markedArg: string;
    instanceOwner: any;
}

export interface ArgumentResults {
    requiredArguments: ArgumentProperties[];
    optionalArguments: ArgumentProperties[];
    lastVariadicArgument: ArgumentProperties;
    argument: any;
}
