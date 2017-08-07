"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;
const INVALID_EXCEPTION_TRAP = require("../messages").INVALID_EXCEPTION_TRAP;

class InvalidExceptionTrapException extends RuntimeException {
    constructor() {
        super(INVALID_EXCEPTION_TRAP);
    }
}
exports.InvalidExceptionTrapException = InvalidExceptionTrapException;
