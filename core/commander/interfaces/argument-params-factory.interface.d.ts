import { ArgumentParamTypes } from '../../../common/enums/argument-paramtypes.enum';

export interface IArgumentParamsFactory {
    exchangeKeyForValue(argParamsKey: ArgumentParamTypes, argNameKey: any, {requiredArgs, optionalArgs, variadicArg}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
    }): any;
}
