"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleException = require("./console.exception").ConsoleException;

class ConsoleMessageException extends ConsoleException {
    constructor(message) {
        super(message);
    }
}
exports.ConsoleMessageException = ConsoleMessageException;
