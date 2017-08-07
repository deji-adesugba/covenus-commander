"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const RuntimeException = require("./runtime.exception").RuntimeException;
const UnknownDependenciesMessage = require("../messages").UnknownDependenciesMessage;

class UnknownDependenciesException extends RuntimeException {
    constructor(type) {
        super(UnknownDependenciesMessage(type));
    }
}
exports.UnknownDependenciesException = UnknownDependenciesException;
