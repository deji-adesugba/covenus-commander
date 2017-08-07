"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const type_check = require("./type-check.utils");

exports.firstLetterCapitalize = (str) => {
    if(type_check.isString(str) && str.length > 1)
        return str[0].toUpperCase() + str.slice(1);

    return str;
}