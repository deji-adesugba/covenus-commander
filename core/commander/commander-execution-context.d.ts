import 'reflect-metadata';
import { CommandParamTypes } from '../../common/enums/command-paramtypes.enum';
import { ArgumentParamTypes } from '../../common/enums/argument-paramtypes.enum';
import { OptionParamTypes } from '../../common/enums/option-paramtypes.enum';
import { Command, Argument, Option } from '../../common/interfaces';
import { Metatype } from '../../common/interfaces';
import { CommanderParamsMetadata } from '../../common/utils';
import { IArgumentParamsFactory } from './interfaces/argument-params-factory.interface';
import { ICommandParamsFactory } from './interfaces/command-params-factory.interface';
import { IOptionParamsFactory } from './interfaces/option-params-factory.interface';

export interface IndexValuePair {
    index: number;
    value: any;
}
export declare class CommanderExecutionContext {
    private argParamsFactory;
    private cmdParamsFactory;
    private optParamsFactory;
    constructor(argParamsFactory: IArgumentParamsFactory, cmdParamsFactory: ICommandParamsFactory, optParamsFactory: IOptionParamsFactory);
    createCommand(instance: Command, executeCallback: (...args) => any): any;
    createArgument(instance: Argument, executeCallback: (...args) => any): any;
    createOption(instance: Option, metatype: Metatype<Option>, coercionCallback: (...args) => any): any;
    mapParamType(key: string): CommandParamTypes | ArgumentParamTypes | OptionParamTypes;
    reflectCallbackMetadataForCommand(instance: Command, executeCallback: (...args) => any): CommanderParamsMetadata;
    reflectCallbackMetadataForArgument(instance: Argument, executeCallback: (...args) => any): CommanderParamsMetadata;
    reflectCallbackMetadataForOption(instance: Option, coercionCallback: (...args) => any): CommanderParamsMetadata;
    getArgumentsLength(keys: string[], metadata: CommanderParamsMetadata): number;
    createNullArray(length: number): any[];
    exchangeCommandKeysForValues(keys: string[], metadata: CommanderParamsMetadata, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
        cmdOptions: any;
        prgOptions: any;
    }): IndexValuePair[];
    exchangeArgumentKeysForValues(keys: string[], metadata: CommanderParamsMetadata, {requiredArgs, optionalArgs, variadicArg, options}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
        options: any;
    }): IndexValuePair[];
    exchangeOptionKeysForValues(keys: string[], metadata: CommanderParamsMetadata, {optionValue, optionDefault}: {
        optionValue: any;
        optionDefault: any;
    }): IndexValuePair[];
}
