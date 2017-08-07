import { CommandParamTypes } from '../../../common/enums/command-paramtypes.enum';

export interface ICommandParamsFactory {
    exchangeKeyForValue(key: CommandParamTypes, cmdKeyName: any, {requiredArgs, optionalArgs, variadicArg, options}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
        options: any;
    }): any;
}
