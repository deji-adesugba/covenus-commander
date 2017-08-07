import { ExceptionsHandler } from '../exceptions/exceptions-handler';

import * as program from "commander";
type ProgramCommander = program.CommanderStatic;

export declare type CommandProxyCallback = (requiredArgs?, optionalArgs?, variadicArg?, options?) => void;
export declare type ArgumentProxyCallback = (requiredArgs?, optionalArgs?, variadicArg?) => void;
export declare type OptionProxyCallback = (optionValue?, optionDefault?) => void;

export declare class CommanderProxy {
    createCommandProxy(targetCallback: CommandProxyCallback, exceptionsHandler: ExceptionsHandler): (requiredArgs: any, optionalArgs: any, variadicArg: any, options: any) => void;
    createArgumentProxy(targetCallback: ArgumentProxyCallback, exceptionsHandler: ExceptionsHandler): (requiredArgs: any, optionalArgs: any, variadicArg: any) => void;
    createOptionProxy(targetCallback: OptionProxyCallback, exceptionsHandler: ExceptionsHandler): (optionValue: any, optionDefault: any) => void;
    runPreExecuteOptionsProxy(program: ProgramCommander, cliProgramInstance: any): void;
    runPreExecuteCommandOptionsProxy(program: ProgramCommander, options: any[]): void;
}
