"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommanderProxy = require("./commander-proxy").CommanderProxy;
const Logger = require("../../common/services/logger.service").Logger;
const ControllerMappingMessage = require("../helpers/messages").ControllerMappingMessage;
const CommanderExceptionTraps = require("./commander-exception-traps").CommanderExceptionTraps;
const MetadataScanner = require("../metadata-scanner").MetadataScanner;
const CommanderExecutor = require("./commander-executor").CommanderExecutor;

class CommanderResolver {
    constructor(container, globalExceptionTrapper) {
        this.container = container;
        this.logger = new Logger(CommanderResolver.name);
        this.commanderProxy = new CommanderProxy();
        this.commanderExceptionsTrap = globalExceptionTrapper;
        this.commanderExecutor = new CommanderExecutor(this.container.getMainCliProgram(), this.commanderExceptionsTrap);
    }
    resolve() {
        this.commanderExecutor.resolveProgramExecutionType();
    }
    execute() {
        this.commanderExecutor.executeProgram();
    }


    
}
exports.CommanderResolver = CommanderResolver;
