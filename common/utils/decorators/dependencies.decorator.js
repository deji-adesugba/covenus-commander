"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const global_constants = require("../../constants");
const flatten = (arr) => {
    const flat = [].concat(...arr);
    return flat.some(Array.isArray) ? flatten(flat) : flat;
};
exports.Dependencies = (...metadata) => {
    const flattenDeps = flatten(metadata);
    return (target) => {
        Reflect.defineMetadata(global_constants.PARAMTYPES_METADATA, flattenDeps, target);
    };
};
