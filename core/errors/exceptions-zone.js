"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionHandler = require("./exception-handler").ExceptionHandler;
const UNHANDLED_RUNTIME_EXCEPTION = require("./messages").UNHANDLED_RUNTIME_EXCEPTION;
const type_check = require("../../common/utils/type-check.utils");

class ExceptionsZone {
    static run(fn, callback = null) {
        try {
             if(type_check.isFunction(callback)){
                callback();
            }
            fn();
        }
        catch (e) {
            if(!this.exceptionHandler.handle(e)){
                console.log(UNHANDLED_RUNTIME_EXCEPTION);
            }
            
        }
    }
}
ExceptionsZone.exceptionHandler = new ExceptionHandler();
exports.ExceptionsZone = ExceptionsZone;
