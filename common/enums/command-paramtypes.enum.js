"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandParamTypes;
(function (CommandParamTypes) {
    CommandParamTypes[CommandParamTypes["REQUIRED"] = 0] = "REQUIRED";
    CommandParamTypes[CommandParamTypes["OPTIONAL"] = 1] = "OPTIONAL";
    CommandParamTypes[CommandParamTypes["VARIADIC"] = 2] = "VARIADIC";
    CommandParamTypes[CommandParamTypes["COMMANDOPTION"] = 3] = "COMMANDOPTION";
    CommandParamTypes[CommandParamTypes["PROGRAMOPTION"] = 4] = "PROGRAMOPTION";
})(CommandParamTypes = exports.CommandParamTypes || (exports.CommandParamTypes = {}));
