"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const CliProgram = require("./program").CliProgram;
const UnknownCliProgramException = require("../errors/exceptions/unknown-program.exception").UnknownCliProgramException;
const CliProgramTokenFactory = require("./program-token-factory").CliProgramTokenFactory;

class CovenContainer {
    constructor() {
        this.programs = new Map();
        this.programTokenFactory = new CliProgramTokenFactory();
        this.mainProgram = null;
    }
    addCliProgram(metatype, scope, main = false) {
        const token = this.programTokenFactory.create(metatype, scope);
        if (this.programs.has(token)) {
            return;
        }
        const instance= new CliProgram(metatype, scope);
        this.programs.set(token, instance);

        if(main){
            this.mainProgram = instance;
        }
    }

    getMainCliProgram() {
        return this.mainProgram;
    }

    getCliPrograms() {
        return this.programs;
    }

    addComponent(component, token) {
        const program = this.verifyExistsAndReturnCliProgram(token);
        program.addComponent(component);
    }
    addCommand(command, token) {
        const program = this.verifyExistsAndReturnCliProgram(token);
        program.addCommand(command);
    }
    addArgument(argument, token) {
        const program = this.verifyExistsAndReturnCliProgram(token);
        program.addArgument(argument);
    }
    addOption(option, token) {
        const program = this.verifyExistsAndReturnCliProgram(token);
        program.addOption(option);
    }
    verifyExistsAndReturnCliProgram(token)
    {
        if (!this.programs.has(token)) {
            throw new UnknownCliProgramException();
        }
        return this.programs.get(token);
    }

    clear() {
        this.programs.clear();
    }
}
exports.CovenContainer = CovenContainer;
