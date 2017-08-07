"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_constants = require("../../common/constants");
const commander_check = require("../../common/utils/commander.utils");
const type_check = require("../../common/utils/type-check.utils");

class CommanderExecutionContext {
    constructor(argParamsFactory, cmdParamsFactory, optParamsFactory) {
        this.argParamsFactory = argParamsFactory;
        this.cmdParamsFactory = cmdParamsFactory;
        this.optParamsFactory = optParamsFactory;
        this.camelCaser = commander_check.camelCaseParameter;
    }
    createCommand(instanceWrapper, metatype, executeCallback) {
        const metadata = this.reflectCallbackMetadataForCommand(instanceWrapper.instance, executeCallback);
        if (type_check.isUndefined(metadata)) {
            return executeCallback.bind(instanceWrapper.instance);
        }
        const executeCmdParamKeys = Object.keys(metadata);
        const argsLength = this.getArgumentsLength(executeCmdParamKeys, metadata);
        const args = this.createNullArray(argsLength);
        return (requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions) => {
            const indexValuePairs = this.exchangeCommandKeysForValues(executeCmdParamKeys, metadata, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions});
            indexValuePairs.forEach(pair => args[pair.index] = pair.value);
            return executeCallback.apply(instanceWrapper.instance, args);
        };
    }
    createArgument(instanceWrapper, metatype, executeCallback) {
        const metadata = this.reflectCallbackMetadataForArgument(instanceWrapper.instance, executeCallback);
        if(type_check.isUndefined(metadata)) {
            return executeCallback.bind(instanceWrapper.instance);
        }
        const executeArgParamKeys = Object.keys(metadata);
        const argsLength = this.getArgumentsLength(executeArgParamKeys, metadata);
        const args = this.createNullArray(argsLength);
        return (requiredArgs, optionalArgs, variadicArgs) => {
            const indexValuePairs = this.exchangeArgumentKeysForValues(executeArgParamKeys, metadata, {requiredArgs, optionalArgs, variadicArgs});
            indexValuePairs.forEach(pair => args[pair.index] = pair.value);
            return executeCallback.apply(instanceWrapper.instance, args);
        };
    }
    createOption(instanceWrapper, metatype, coercionCallback) {
        const metadata = this.reflectCallbackMetadataForOption(metatype, coercionCallback);
        if (type_check.isUndefined(metadata)) {
            return coercionCallback.bind(instanceWrapper.instance);
        }
        const executeOptParamKeys = Object.keys(metadata);
        const argsLength = this.getArgumentsLength(executeOptParamKeys, metadata);
        const args = this.createNullArray(argsLength);
        return (optionValue, optionDefault) => {
            const indexValuePairs = this.exchangeOptionKeysForValues(executeOptParamKeys, metadata, {optionValue, optionDefault});
            indexValuePairs.forEach(pair => args[pair.index] = pair.value);
            return coercionCallback.apply(instanceWrapper.instance, args);
        };
    }
    mapParamType(key) {
        const keyPair = key.split(':');
        return Number(keyPair[0]);
    }
    reflectCallbackMetadataForCommand(instance, executeCallback) {
        return Reflect.getMetadata(common_constants.CMDARG_ARGS_METADATA, instance, executeCallback.name);
    }
    reflectCallbackMetadataForArgument(instance, executeCallback) {
        return Reflect.getMetadata(common_constants.CMDARG_ARGS_METADATA, instance, executeCallback.name);
    }
    reflectCallbackMetadataForOption(instance, coercionCallback) {
        return Reflect.getMetadata(common_constants.OPT_ARGS_METADATA, instance, coercionCallback.name);
    }
    getArgumentsLength(keys, metadata) {
        return Math.max(...keys.map(key => metadata[key].index)) + 1;
    }
    createNullArray(length) {
        return Array.apply(null, { length }).fill(null);
    }
    exchangeCommandKeysForValues(keys, metadata, {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}) {
        return keys.map(key => ({
            index: metadata[key].index,
            value: this.cmdParamsFactory.exchangeKeyForValue(this.mapParamType(key), this.camelCaser(metadata[key].data), {requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions}),
        }));
    }
    exchangeArgumentKeysForValues(keys, metadata, {requiredArgs, optionalArgs, variadicArgs}) {
        return keys.map(key => ({
            index: metadata[key].index,
            value: this.argParamsFactory.exchangeKeyForValue(this.mapParamType(key), this.camelCaser(metadata[key].data), {requiredArgs, optionalArgs, variadicArgs}),
        }));
    }
    exchangeOptionKeysForValues(keys, metadata, { optionValue, optionDefault }) {
        return keys.map(key => ({
            index: metadata[key].index,
            value: this.optParamsFactory.exchangeKeyForValue(this.mapParamType(key), this.camelCaser(metadata[key].data), { optionValue, optionDefault }),
        }));
    }
}
exports.CommanderExecutionContext = CommanderExecutionContext;
