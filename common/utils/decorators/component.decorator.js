"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const type_check = require("../type-check.utils");
const constants = require("../../constants");

exports.Component = () => {
    return (target) => { 
        const args = Reflect.getMetadata(constants.COMPONENT_METADATA, target) || [];
        Reflect.defineMetadata(constants.COMPONENT_METADATA, args.push(target), target);
    };
};
