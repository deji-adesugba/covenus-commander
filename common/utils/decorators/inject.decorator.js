"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
const isFunction = require("../type-check.utils").isFunction;

exports.Inject = (param) => {
    return (target, key, index) => {
        const args = Reflect.getMetadata(global_constants.SELF_DECLARED_DEPS_METADATA, target) || [];
        const type = isFunction(param) ? param.name : param;
        args.push({ index, param: type });
        Reflect.defineMetadata(global_constants.SELF_DECLARED_DEPS_METADATA, args, target);
    };
};
