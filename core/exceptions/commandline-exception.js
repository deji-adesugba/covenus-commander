"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class CLIException {
    constructor(message) {
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    
}
exports.CLIException = CLIException;
