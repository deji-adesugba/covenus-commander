"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentParamTypes = require("../../common/enums/argument-paramtypes.enum").ArgumentParamTypes;

class ArgumentParamsFactory {
    exchangeKeyForValue(argParamsKey, argNameKey, {requiredArgs, optionalArgs, variadicArgs}) {
        switch (argParamsKey) {
            case ArgumentParamTypes.REQUIRED: return argNameKey ? requiredArgs[argNameKey] : requiredArgs;
            case ArgumentParamTypes.OPTIONAL: return argNameKey ? optionalArgs[argNameKey] : optionalArgs;
            case ArgumentParamTypes.VARIADIC: return argNameKey ? variadicArgs[argNameKey] : variadicArgs;
            default: return null;
        }
    }
}
exports.ArgumentParamsFactory = ArgumentParamsFactory;
