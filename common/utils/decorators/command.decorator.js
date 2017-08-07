"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const isNil = require("../type-check.utils").isNil;
const validateDecorator = require("../decorator.utils").validateDecorator;
const DecoratorConfigException = require("../../exceptions/decorator-config.exception").DecoratorConfigException;
const DecoratorNoMetadataException = require("../../exceptions/decorator-nometadata.exception").DecoratorNoMetadataException;
const constants = require("./command.metadata.constants");
const decoratorMetadataKeys = [
    constants.metadata.VERB,
    constants.metadata.VERBDESCRIPTION,
    constants.metadata.COMMANDDESCRIPTION,
    constants.metadata.DESCRIPTION,
    constants.metadata.VERBOPTION,
    constants.metadata.OPTIONS,
    constants.metadata.REQUIREDARGS,
    constants.metadata.OPTIONALARGS,
    constants.metadata.VARIADICLASTARG,
    constants.metadata.ALIAS,
    constants.metadata.ALLOWUNKNOWNOPTION,
    constants.metadata.INCLUDEINHELPBYDEFAULT
];


exports.CLICommand = (metadataObject) => {

    if(isNil(metadataObject)){
        throw new DecoratorNoMetadataException('@CLICommand');
    }

    const metadataObjPropKeys = Object.keys(metadataObject);
    validateDecorator(metadataObjPropKeys, decoratorMetadataKeys, (metadataObjPropKey) => {
        throw new DecoratorConfigException(metadataObjPropKey, '@CLICommand')
    });

    return (decoratorTarget) => {
        for (const property in metadataObject) {
            if (metadataObject.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadataObject[property], decoratorTarget);
            }
        }
    };
};