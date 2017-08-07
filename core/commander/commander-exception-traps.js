"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const iterare = require("iterare");
const ExceptionsHandler = require("../exceptions/exception-handler").ExceptionsHandler;
const common_constants = require("../../common/constants");
const type_check = require("../../common/utils/type-check.utils");
const UnknownCliProgramException = require("../errors/exceptions/unknown-program.exception").UnknownCliProgramException;

class CommanderExceptionTraps {
    constructor(container) {
        this.container = container;
        this.globalHandler = null;
    }

    setupGlobalHandler(){
        if(this.globalHandler)
            return;

        const program = this.container.getMainCliProgram();
        this.globalHandler = this.create(program.metatype);
    }

    create(metatype) {
        const exceptionHandler = new ExceptionsHandler(this.globalHandler);
        const traps = this.reflectExceptionTraps(metatype);
        var trap = traps[0];
        if (type_check.isEmpty(traps)) {
            return exceptionHandler;
        }
        const trapHooks = this.resolveTrapsMetatypes(traps);
        exceptionHandler.setCustomTraps(trapHooks);
        return exceptionHandler;
    }
    reflectExceptionTraps(metatype) {
        return Reflect.getMetadata(common_constants.EXCEPTION_TRAPS_METADATA, metatype) || [];
    }
    resolveTrapsMetatypes(traps) {
        return iterare.default(traps).filter(metatype => type_check.isFunction(metatype))
            .map(metatype => ({
            instance: this.findExceptionsTrapInstance(metatype),
            metatype: metatype,
        }))
            .filter(({ instance }) => instance.trap && type_check.isFunction(instance.trap))
            .map(({ instance, metatype }) => ({
            func: instance.trap.bind(instance),
            exceptionMetatypes: this.reflectTrapExceptions(metatype),
        }))
        .toArray();
    }
    findExceptionsTrapInstance(metatype) {
        const cliProgram = this.container.getMainCliProgram();
        if (!cliProgram) {
            throw new UnknownCliProgramException();
        }
        
        const component = cliProgram.components.get(metatype.name);
        const { instance } = component;
        return instance;
    }
    reflectTrapExceptions(metatype) {
        return Reflect.getMetadata(common_constants.FILTER_TRAP_EXCEPTIONS, metatype) || [];
    }
}
exports.CommanderExceptionTraps = CommanderExceptionTraps;
