"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;

class DuplicateCliProgramException extends RuntimeException {
    constructor() {
        super();
    }
}
exports.DuplicateCliProgramException = DuplicateCliProgramException;
