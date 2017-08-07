"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_constants = require("../common/constants");
const DuplicateCliProgramException = require("./errors/exceptions/duplicate-program.exception").DuplicateCliProgramException;

class DependenciesScanner {
    constructor(container) {
        this.container = container;
    }
    scan(cliProgram) {
        this.scanForCliProgram(cliProgram);
        this.scanCliProgramForDependencies();
    }
    scanForCliProgram(cliProgram, scope = []) {
        this.storeCliProgram(cliProgram, scope, true);
    }
    storeCliProgram(cliProgram, scope, main = false) {
        this.container.addCliProgram(cliProgram, scope, main);
    }
    scanCliProgramForDependencies() {
        const cliPrograms = this.container.getCliPrograms();
        cliPrograms.forEach(({ metatype }, token) => {
            this.reflectExceptionTraps(metatype, token);
            this.reflectComponents(metatype, token);
            this.reflectCommands(metatype, token);
            this.reflectArguments(metatype, token);
            this.reflectOptions(metatype, token);
        });
    }
    reflectComponents(cliProgram, token) {
        const components = this.reflectMetadata(cliProgram, common_constants.metadata.COMPONENTS);
        components.map((component) => {
            this.storeComponent(component, token);
        });
    }
    reflectCommands(cliProgram, token) {
        const commands = this.reflectMetadata(cliProgram, common_constants.metadata.COMMANDS);
        commands.map((command) => {
            this.storeCommand(command, token);
            this.reflectExceptionTraps(command, token);
            this.reflectOptions(command, token);
        });
    }
    reflectArguments(cliProgram, token) {
        const arg = this.reflectSingleMetadata(cliProgram, common_constants.metadata.ARGUMENT);
        if(arg){
            this.storeArgument(arg, token);
            this.reflectExceptionTraps(arg, token);
        }
    }
    reflectOptions(instance, token) {
        const options = this.reflectMetadata(instance, common_constants.metadata.OPTIONS);
        options.map((option) => {
            this.storeOption(option, token);
            this.reflectExceptionTraps(option, token);
        });
    }
    reflectExceptionTraps(component, token) {
        const traps = this.reflectMetadata(component, common_constants.EXCEPTION_TRAPS_METADATA);
        traps.map((trap) => this.storeComponent(trap, token));
    }
    storeComponent(component, token) {
        this.container.addComponent(component, token);
    }
    storeCommand(command, token) {
        this.container.addCommand(command, token);
    }
    storeArgument(argument, token) {
        this.container.addArgument(argument, token);
    }
    storeOption(option, token) {
        this.container.addOption(option, token);
    }
    reflectMetadata(cliProgram, metadata) {
        return Reflect.getMetadata(metadata, cliProgram) || [];
    }
    reflectSingleMetadata(cliProgram, metadata) {
        return Reflect.getMetadata(metadata, cliProgram);
    }
}
exports.DependenciesScanner = DependenciesScanner;
