"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.InvalidDecoratorConfigMessage = (property, decorator) => `Invalid property '${property}' in '${decorator} decorator.`;
exports.NoMetadataDecoratorMessage = (decorator) => `No metadata object was passed into the '${decorator} decorator.`;
