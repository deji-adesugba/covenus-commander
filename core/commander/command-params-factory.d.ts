import { CommandParamTypes } from '../../common/enums/command-paramtypes.enum';
import { ICommandParamsFactory } from './interfaces/command-params-factory.interface';

export declare class CommandParamsFactory implements ICommandParamsFactory {
    exchangeKeyForValue(cmdParamsKey: CommandParamTypes, cmdNameKey: any, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}: {
        requiredArgs: any;
        optionalArgs: any;
        variadicArg: any;
        cmdOptions: any;
        prgOptions: any;
    }): any;
}
