"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterare = require("iterare");
const Injector = require("./injector").Injector;
const Logger = require("../../common/index").Logger;
const messages = require("../helpers/messages");
const type_check = require("../../common/utils/type-check.utils");

class InstanceLoader {
    constructor(container) {
        this.container = container;
        this.injector = new Injector();
        this.logger = new Logger(InstanceLoader.name);
    }
    createInstancesOfDependencies() {
        const cliPrograms = this.container.getCliPrograms();
        this.createPrototypes(cliPrograms);
        this.createInstances(cliPrograms);
    }
    createPrototypes(cliPrograms) {
        cliPrograms.forEach((cliProgram) => {
            this.createPrototypesOfComponents(cliProgram);
            this.createPrototypesOfCommands(cliProgram);
            this.createPrototypesOfArguments(cliProgram);
            this.createPrototypesOfOptions(cliProgram);
        });
    }
    createInstances(cliPrograms) {
        cliPrograms.forEach((cliProgram) => {
            this.createInstancesOfComponents(cliProgram);
            this.createInstancesOfCommands(cliProgram);
            this.createInstancesOfArguments(cliProgram);
            this.createInstancesOfOptions(cliProgram);
            this.callCliProgramInitHook(cliProgram);
            const { name } = cliProgram.metatype;
            this.logger.log(messages.CliProgramInitMessage(name));
        });
    }
    createPrototypesOfComponents(cliProgram) {
        cliProgram.components.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, cliProgram.components);
        });
    }
    createInstancesOfComponents(cliProgram) {
        cliProgram.components.forEach((wrapper) => {
            this.injector.loadInstanceOfComponent(wrapper, cliProgram);
        });
    }
    createPrototypesOfCommands(cliProgram) {
        cliProgram.commands.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, cliProgram.commands);
        });
    }
    createInstancesOfCommands(cliProgram) {
        cliProgram.commands.forEach((wrapper) => {
            this.injector.loadInstanceOfCommand(wrapper, cliProgram);
        });
    }
    createPrototypesOfArguments(cliProgram) {
        cliProgram.arguments.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, cliProgram.arguments);
        });
    }
    createInstancesOfArguments(cliProgram) {
        cliProgram.arguments.forEach((wrapper) => {
            this.injector.loadInstanceOfArgument(wrapper, cliProgram);
        });
    }
    createPrototypesOfOptions(cliProgram) {
        cliProgram.options.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, cliProgram.options);
        });
    }
    createInstancesOfOptions(cliProgram) {
        cliProgram.options.forEach((wrapper) => {
            this.injector.loadInstanceOfOption(wrapper, cliProgram);
        });
    }
    callCliProgramInitHook(cliProgram) {
        const components = [...cliProgram.commands, ...cliProgram.arguments, ...cliProgram.options, ...cliProgram.components];
        iterare.default(components).map(([key, { instance }]) => instance)
            .filter((instance) => !type_check.isNil(instance))
            .filter(this.hasOnCliProgramInitHook)
            .forEach((instance) => instance.onCliProgramInit());
    }
    hasOnCliProgramInitHook(instance) {
        return !type_check.isUndefined(instance.onCliProgramInit);
    }
}
exports.InstanceLoader = InstanceLoader;
