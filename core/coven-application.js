"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const CommanderExceptionTraps = require("./commander/commander-exception-traps").CommanderExceptionTraps;
const CommanderResolver = require("./commander/commander-resolver").CommanderResolver;
const Logger = require("../common/services/logger.service").Logger;
const core_constants = require("./exceptions/error-message.constants");
const ApplicationConfig = require("./application-config").ApplicationConfig;
const type_check = require("../common/utils/type-check.utils");
const ExceptionsZone = require("./errors/exceptions-zone").ExceptionsZone;
const CommanderOutputWriter = require("./commander/commander-output-writer").CommanderOutputWriter;
const RuntimeException = require("./errors/exceptions/runtime.exception").RuntimeException;

class CovenCliApplication {
    constructor(container) {
        this.container = container;
        this.config = new ApplicationConfig();
        this.logger = new Logger(CovenCliApplication.name);
        this.isInitialized = false;
        this.globalExceptionsTrapper = new CommanderExceptionTraps(container);
        this.commanderResolver = new CommanderResolver(container, this.globalExceptionsTrapper);
    }
    setup(){
        this.setupGlobalResolver();
        this.setupGlobalTrap();
        this.init();
    }

    setupGlobalTrap(){
        this.globalExceptionsTrapper.setupGlobalHandler();
    }

    setupGlobalResolver(){
        this.commanderResolver.resolve();
    }

    execute(){
        this.commanderResolver.execute();
    }

    init() {
        this.logger.log(core_constants.messages.CLI_APP_READY);
        this.isInitialized = true;
    }
    
    run(callback) {
        if(this.isInitialized){
            this.execute();
        }
        
    }
}
exports.CovenCliApplication = CovenCliApplication;
