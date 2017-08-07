"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterare = require("iterare");
const type_check = require("../common/utils/type-check.utils");

class MetadataScanner {
    scanFromPrototype(instance, prototype, callback) {
        return iterare.default(Object.getOwnPropertyNames(prototype))
            .filter((method) => {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
            if (descriptor.set || descriptor.get) {
                return false;
            }
            return !type_check.isConstructor(method) && type_check.isFunction(prototype[method]);
        })
            .map(callback)
            .filter((metadata) => !type_check.isNil(metadata))
            .toArray();
    }
}
exports.MetadataScanner = MetadataScanner;
