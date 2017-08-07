"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const constants = require("./decorator.constants");

class DecoratorConfigException extends Error {
    constructor(property, decorator) {
        super(constants.InvalidDecoratorConfigMessage(property, decorator));
    }
}
exports.DecoratorConfigException = DecoratorConfigException;
