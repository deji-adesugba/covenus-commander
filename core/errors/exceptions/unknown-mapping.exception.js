"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;
const messages = require("../messages");

class UnknownMappingException extends RuntimeException {
    constructor(name, decorator, type) {
        super(messages.UNKNOWN_MAPPING(name, decorator, type));
    }
}
exports.UnknownMappingException = UnknownMappingException;
