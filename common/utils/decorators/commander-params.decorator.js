"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_check = require("../type-check.utils");
const constants = require("../../constants");
const ArgumentParamTypes = require("../../enums/argument-paramtypes.enum").ArgumentParamTypes;
const CommandParamTypes = require("../../enums/command-paramtypes.enum").CommandParamTypes;
const OptionParamTypes = require("../../enums/option-paramtypes.enum").OptionParamTypes;

const assignMetadata = (args, paramtype, index, data) => (Object.assign({}, args, { [`${paramtype}:${index}`]: {
        index,
        data,
    } }));
const createCommanderParamDecorator = (paramtype) => {
    return (data) => (target, key, index) => {
        const args = Reflect.getMetadata(constants.CMDARG_ARGS_METADATA, target, key) || {};
        Reflect.defineMetadata(constants.CMDARG_ARGS_METADATA, assignMetadata(args, paramtype, index, data), target, key);
    };
};

const createCommanderOptionParamDecorator = (paramtype) => {
    return (data) => (target, key, index) => {
        const args = Reflect.getMetadata(constants.OPT_ARGS_METADATA, target, key) || {};
        Reflect.defineMetadata(constants.OPT_ARGS_METADATA, assignMetadata(args, paramtype, index, data), target, key);
    };
};

exports.RequiredArg = createCommanderParamDecorator(ArgumentParamTypes.REQUIRED);
exports.OptionalArg = createCommanderParamDecorator(ArgumentParamTypes.OPTIONAL);
exports.VariadicArg = createCommanderParamDecorator(ArgumentParamTypes.VARIADIC);
exports.CommandOptionArg = createCommanderParamDecorator(CommandParamTypes.COMMANDOPTION);
exports.ProgramOptionArg = createCommanderParamDecorator(CommandParamTypes.PROGRAMOPTION);
exports.OptionVal = createCommanderOptionParamDecorator(OptionParamTypes.VALUE);
exports.OptionDefault = createCommanderOptionParamDecorator(OptionParamTypes.DEFAULT);
exports.ReqArg = exports.RequiredArg;
exports.OptArg = exports.OptionalArg;
exports.VarArg = exports.VariadicArg;
exports.CmdOptArg = exports.CommandOptionArg;
exports.PrgOptArg = exports.ProgramOptionArg;
exports.OptVal = exports.OptionVal;
exports.OptDef = exports.OptionDefault;
