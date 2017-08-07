"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
exports.UseTraps = (...filters) => {
    return (target) => {
        Reflect.defineMetadata(global_constants.EXCEPTION_FILTERS_METADATA, filters, target);
    };
};
//# sourceMappingURL=exception-filters.decorator.js.map