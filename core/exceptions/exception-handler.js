"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const CLIException = require("./commandline-exception").CLIException;
const UNKNOWN_EXCEPTION = require("./error-message.constants").messages.UNKNOWN_EXCEPTION;
const Logger = require("../../common/index").Logger;
const type_check = require("../../common/utils/type-check.utils");
const InvalidExceptionTrapException = require("../errors/exceptions/invalid-exception-trap.exception").InvalidExceptionTrapException;
const RuntimeException = require("../errors/exceptions/runtime.exception").RuntimeException;
const ConsoleException = require("../errors/exceptions/console.exception").ConsoleException;

class ExceptionsHandler {
    constructor(parent = null) {
        this.logger = new Logger(ExceptionsHandler.name);
        this.traps = [];
        this.parentHandler = (parent && parent instanceof ExceptionsHandler) ?  parent : null;

    }
    next(exception, outputWriter) {
        if (this.invokeCustomTraps(exception, outputWriter)){
            return;
        }

        if (exception instanceof CLIException ||
            exception instanceof RuntimeException ||
            exception instanceof ConsoleException){
            throw exception;
        }

        this.logger.error( UNKNOWN_EXCEPTION, type_check.isNil(exception.stack)? '':exception.stack);

    }
    setCustomTraps(traps) {
        if (!Array.isArray(traps)) {
            throw new InvalidExceptionTrapException();
        }
        this.traps = traps;
    }
    invokeCustomTraps(exception, outputWriter) {
        if(!this.invokeCustomTrapsHelper(this,exception, outputWriter)){
            if(this.parentHandler){
                this.invokeCustomTrapsHelper(this.parentHandler,exception, outputWriter)
            }else{
                return false;
            }
        }

        return true;
    }

    invokeCustomTrapsHelper(handler, exception, outputWriter){
        if (type_check.isEmpty(handler.traps)){
            return false;
        }

        const trap = handler.traps.find(({ exceptionMetatypes, func }) => {
            const hasMetatype = !!exceptionMetatypes.find(ExceptionMetatype => exception instanceof ExceptionMetatype);
            return hasMetatype;
        });
        trap && trap.func(exception, outputWriter);
        return !!trap;
    }
}
exports.ExceptionsHandler = ExceptionsHandler;
