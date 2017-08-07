"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const isNil = require("../type-check.utils").isNil;
const validateDecorator = require("../decorator.utils").validateDecorator;
const DecoratorConfigException = require("../../exceptions/decorator-config.exception").DecoratorConfigException;
const DecoratorNoMetadataException = require("../../exceptions/decorator-nometadata.exception").DecoratorNoMetadataException;
const constants = require("./program.metadata.constants");
const decoratorMetadataKeys = [
    constants.metadata.COMMANDS,
    constants.metadata.OPTIONS,
    constants.metadata.ARGUMENT,
    constants.metadata.VERSION,
    constants.metadata.USAGE,
    constants.metadata.SHOWHELPBYDEFAULT,
    constants.metadata.COMPONENTS,
];


exports.CLIProgram = (metadataObject) => {

    if(isNil(metadataObject)){
        throw new DecoratorNoMetadataException('@CLIProgram');
    }

    const metadataObjPropKeys = Object.keys(metadataObject);
    validateDecorator(metadataObjPropKeys, decoratorMetadataKeys, (metadataObjPropKey) => {
        throw new DecoratorConfigException(metadataObjPropKey, '@CLIProgram')
    });

    return (decoratorTarget) => {
        for (const property in metadataObject) {
            if (metadataObject.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadataObject[property], decoratorTarget);
            }
        }
    };
};