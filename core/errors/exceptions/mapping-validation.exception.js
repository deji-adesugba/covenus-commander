"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;

class MappingValidationException extends RuntimeException {
    constructor(message) {
        super(message);
    }
}
exports.MappingValidationException = MappingValidationException;
