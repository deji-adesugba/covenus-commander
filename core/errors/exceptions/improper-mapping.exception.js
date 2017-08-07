"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuntimeException = require("./runtime.exception").RuntimeException;
const messages = require("../messages");

class ImproperMappingException extends RuntimeException {
    constructor(name, decorator, type) {
        super(messages.IMPROPER_MAPPING(name, decorator, type));
    }
}
exports.ImproperMappingException = ImproperMappingException;
