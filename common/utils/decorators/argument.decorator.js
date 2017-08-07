"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const isNil = require("../type-check.utils").isNil;
const validateDecorator = require("../decorator.utils").validateDecorator;
const DecoratorConfigException = require("../../exceptions/decorator-config.exception").DecoratorConfigException;
const DecoratorNoMetadataException = require("../../exceptions/decorator-nometadata.exception").DecoratorNoMetadataException;
const constants = require("./argument.metadata.constants");
const decoratorMetadataKeys = [
    constants.metadata.REQUIREDARGS,
    constants.metadata.OPTIONALARGS,
    constants.metadata.VARIADICLASTARG
];


exports.CLIArgument = (metadataObject) => {

    if(isNil(metadataObject)){
        throw new DecoratorNoMetadataException('@CLIArgument');
    }

    const metadataObjPropKeys = Object.keys(metadataObject);
    validateDecorator(metadataObjPropKeys, decoratorMetadataKeys, (metadataObjPropKey) => {
        throw new DecoratorConfigException(metadataObjPropKey, '@CLIArgument')
    });

    return (decoratorTarget) => {
        for (const property in metadataObject) {
            if (metadataObject.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadataObject[property], decoratorTarget);
            }
        }
    };
};