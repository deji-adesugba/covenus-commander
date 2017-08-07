"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const RuntimeException = require("./exceptions/runtime.exception").RuntimeException;
const ConsoleException = require("./exceptions/console.exception").ConsoleException;
const CLIException = require("../exceptions/commandline-exception").CLIException;
const Logger = require("../../common/services/logger.service").Logger;

class ExceptionHandler {
    constructor() {
        this.logger = new Logger(ExceptionHandler.name);
    }
    handle(exception) {
        if (exception instanceof RuntimeException) {
            this.logger.error(exception.message, exception.stack);
            return false;
        }
        if (exception instanceof ConsoleException) {
            console.log(exception.message);
            return true;
        }

         if (exception instanceof CLIException) {
            console.log(exception.message);
            return true;
        }

        this.logger.error(exception.message, exception.stack);
        return false;
    }
}
exports.ExceptionHandler = ExceptionHandler;
