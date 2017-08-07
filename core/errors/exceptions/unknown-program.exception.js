"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;

class UnknownCliProgramException extends RuntimeException {
    constructor() {
        super("Invalid class passed into CovenFactory.CreateCLI");
    }
}
exports.UnknownCliProgramException = UnknownCliProgramException;
