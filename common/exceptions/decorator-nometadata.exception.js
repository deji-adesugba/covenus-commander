"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const constants = require("./decorator.constants");

class DecoratorNoMetadataException extends Error {
    constructor(decorator) {
        super(constants.NoMetadataDecoratorMessage(decorator));
    }
}
exports.DecoratorNoMetadataException = DecoratorNoMetadataException;
