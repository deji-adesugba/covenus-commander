import { ArgumentParamTypes } from '../../common/enums/argument-paramtypes.enum';
import { IArgumentParamsFactory } from './interfaces/argument-params-factory.interface';

export declare class ArgumentParamsFactory implements IArgumentParamsFactory {
    exchangeKeyForValue(argParamsKey: ArgumentParamTypes, argNameKey: any, {requiredArgs, optionalArgs, variadicArg}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
    }): any;
}
