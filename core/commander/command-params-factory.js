"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandParamTypes = require("../../common/enums/command-paramtypes.enum").CommandParamTypes;

class CommandParamsFactory {
    exchangeKeyForValue(cmdParamsKey, cmdNameKey, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}) {
        switch (cmdParamsKey) {
            case CommandParamTypes.REQUIRED: return cmdNameKey ? requiredArgs[cmdNameKey] : requiredArgs;
            case CommandParamTypes.OPTIONAL: return cmdNameKey ? optionalArgs[cmdNameKey] : optionalArgs;
            case CommandParamTypes.VARIADIC: return cmdNameKey ? variadicArg[cmdNameKey] : variadicArg;
            case CommandParamTypes.COMMANDOPTION: return cmdNameKey ? cmdOptions[cmdNameKey] : cmdOptions;
            case CommandParamTypes.PROGRAMOPTION: return cmdNameKey ? prgOptions[cmdNameKey] : prgOptions;
            default: return null;
        }
    }
}
exports.CommandParamsFactory = CommandParamsFactory;
