"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;
const messages = require("../messages");

class ImproperProgramException extends RuntimeException {
    constructor(primary, secondary, programName) {
        super(messages.IMPROPER_PROGRAM(primary, secondary, programName));
    }
}
exports.ImproperProgramException = ImproperProgramException;
