"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUndefined = require("../../common/utils/type-check.utils").isUndefined;
const SHARED_PROGRAM_METADATA = require("../../common/constants").SHARED_PROGRAM_METADATA;

class CliProgramTokenFactory {
    create(metatype, scope) {
        const opaqueToken = {
            program: this.getCliProgramName(metatype),
            scope: this.getScopeStack(scope),
        };
        return JSON.stringify(opaqueToken);
    }
    getCliProgramName(metatype) {
        return metatype.name;
    }
    getScopeStack(scope) {
        return scope.map((program) => program.name);
    }
}
exports.CliProgramTokenFactory = CliProgramTokenFactory;
