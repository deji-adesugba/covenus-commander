"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
exports.Trap = (...exceptions) => {
    return (target) => {
        Reflect.defineMetadata(global_constants.FILTER_CATCH_EXCEPTIONS, exceptions, target);
    };
};
//# sourceMappingURL=catch.decorator.js.map