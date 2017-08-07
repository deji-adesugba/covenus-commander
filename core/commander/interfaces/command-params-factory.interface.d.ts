import { CommandParamTypes } from '../../../common/enums/command-paramtypes.enum';

export interface ICommandParamsFactory {
    exchangeKeyForValue(cmdParamsKey: CommandParamTypes, cmdNameKey: any, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
        cmdOptions: any;
        prgOptions: any;
    }): any;
}
