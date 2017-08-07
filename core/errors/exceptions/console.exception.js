"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleException extends Error {
    constructor(msg = ``) {
        super(msg);
        this.msg = msg;
    }
    what() {
        return this.msg;
    }
}
exports.ConsoleException = ConsoleException;
