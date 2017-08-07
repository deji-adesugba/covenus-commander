"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const isFunction = require("./type-check.utils").isFunction;

const validator = (decoratorInstanceKeys, decoratorMetadataKeys, validatorExceptionHandler) => {
    
    const isKeyValid = (key) => decoratorMetadataKeys.findIndex(k => k === key) < 0;
    const validateKey = (key) => {
        if (isKeyValid(key)) {
            if(isFunction(validatorExceptionHandler))
            {
                validatorExceptionHandler(key);
            }
        }
    };
    decoratorInstanceKeys.forEach(validateKey);
};

exports.validateDecorator = validator;