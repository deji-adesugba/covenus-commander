"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
exports.UseTraps = (...traps) => {
    return (target) => {
        Reflect.defineMetadata(global_constants.EXCEPTION_TRAPS_METADATA, traps, target);
    };
};
