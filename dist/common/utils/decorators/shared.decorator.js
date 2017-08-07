"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
exports.Shared = (token = 'global') => {
    return (target) => {
        const Type = class extends target {
            constructor(...args) {
                super(...args);
            }
        };
        Reflect.defineMetadata(global_constants.SHARED_PROGRAM_METADATA, token, Type);
        Object.defineProperty(Type, 'name', { value: target.name });
        return Type;
    };
};
//# sourceMappingURL=shared.decorator.js.map