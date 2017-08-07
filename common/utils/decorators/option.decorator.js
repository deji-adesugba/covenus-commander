"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const isNil = require("../type-check.utils").isNil;
const validateDecorator = require("../decorator.utils").validateDecorator;
const DecoratorConfigException = require("../../exceptions/decorator-config.exception").DecoratorConfigException;
const DecoratorNoMetadataException = require("../../exceptions/decorator-nometadata.exception").DecoratorNoMetadataException;
const constants = require("./option.metadata.constants");
const decoratorMetadataKeys = [
    constants.metadata.SHORTFLAG,
    constants.metadata.FULLFLAG,
    constants.metadata.FLAGARG,
    constants.metadata.FLAGARGVALUEREGEXP,
    constants.metadata.FLAGARGVALUEHINTFORREGEXP,
    constants.metadata.ISFLAGARGREQUIRED,
    constants.metadata.DESCRIPTION,
    constants.metadata.DEFAULTVALUE
];


exports.CLIOption = (metadataObject) => {

    if(isNil(metadataObject)){
        throw new DecoratorNoMetadataException('@CLIOption');
    }

    const metadataObjPropKeys = Object.keys(metadataObject);
    validateDecorator(metadataObjPropKeys, decoratorMetadataKeys, (metadataObjPropKey) => {
        throw new DecoratorConfigException(metadataObjPropKey, '@CLIOption')
    });

    return (decoratorTarget) => {
        for (const property in metadataObject) {
            if (metadataObject.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadataObject[property], decoratorTarget);
            }
        }
    };
};