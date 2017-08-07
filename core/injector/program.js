"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CliProgramRef = require("./program-ref").CliProgramRef;
const type_check = require("../../common/utils/type-check.utils");
const RuntimeException = require("../errors/exceptions/runtime.exception").RuntimeException;

class CliProgram {
    constructor(_metatype, _scope) {
        this._metatype = _metatype;
        this._scope = _scope;
        this._components = new Map();
        this._commands = new Map();
        this._arguments = new Map();
        this._options = new Map();
        this._reflectedTargetOptions = new Map();
        this._reflectedTargetCommands = new Map();
        this._reflectedTargetArgs = new Map();
        this._version = '1.0.0';
        this._usage = null;
        this._showHelpByDefault = false;
        this.addCliProgramRef();
        this.addCliProgramAsComponent();
    }
    get scope() {
        return this._scope;
    }

    get version() {
        return this._version;
    }
    
    get showHelpByDefault() {
        return this._showHelpByDefault;
    }

    get usage() {
        return this._usage;
    }
    get components() {
        return this._components;
    }
    get commands() {
        return this._commands;
    }
    get arguments() {
        return this._arguments;
    }
    get options() {
        return this._options;
    }
    get instance() {
        if (!this._components.has(this._metatype.name)) {
            throw new RuntimeException();
        }
        const cliProgram = this._components.get(this._metatype.name);
        return cliProgram.instance;
    }
    get metatype() {
        return this._metatype;
    }

    addReflectedOptionPropertiesForTarget(target, reflectedOptionProperties){
        this._reflectedTargetOptions.set(target.name, reflectedOptionProperties);
    }

    addReflectedCommandProperties(target, reflectedCommandProperties){
        this._reflectedTargetCommands.set(target.name, reflectedCommandProperties);
    }

    getReflectedOptionProperties(target){
        return this._reflectedTargetOptions.get(target.name);
    }

    getReflectedCommandProperties(target){
        return this._reflectedTargetCommands.get(target.name);
    }

    addReflectedArgPropertiesForTarget(target, type, reflectedArgProperties){
        this._reflectedTargetArgs.set(`${target.name}.${type}`, reflectedArgProperties);
    }

    getReflectedArgProperties(target, type){
        return this._reflectedTargetArgs.get(`${target.name}.${type}`);
    }

    getArgument(name){
        if (!this._arguments.has(name)) {
            throw new RuntimeException();
        }
        const argument = this._arguments.get(name);
        return argument;
    }

    addCliProgramRef() {
        const cliProgramRef = this.getCliProgramRefMetatype(this._components);
        this._components.set(CliProgramRef.name, {
            name: CliProgramRef.name,
            metatype: CliProgramRef,
            isResolved: true,
            instance: new cliProgramRef(),
        });
    }
    addCliProgramAsComponent() {
        this._components.set(this._metatype.name, {
            name: this._metatype.name,
            metatype: this._metatype,
            isResolved: false,
            instance: null,
        });
    }
    addComponent(component) {
        if (this.isCustomComponent(component)) {
            this.addCustomComponent(component);
            return;
        }
        this._components.set(component.name, {
            name: component.name,
            metatype: component,
            instance: null,
            isResolved: false,
        });
    }
    isCustomComponent(component) {
        return !type_check.isNil(component.provide);
    }
    addCustomComponent(component) {
        const { provide } = component;
        const name = type_check.isFunction(provide) ? provide.name : provide;
        const comp = Object.assign({}, component, { name });
        if (this.isCustomClass(comp))
            this.addCustomClass(comp);
        else if (this.isCustomValue(comp))
            this.addCustomValue(comp);
        else if (this.isCustomFactory(comp))
            this.addCustomFactory(comp);
    }
    isCustomClass(component) {
        return !type_check.isUndefined(component.useClass);
    }
    isCustomValue(component) {
        return !type_check.isUndefined(component.useValue);
    }
    isCustomFactory(component) {
        return !type_check.isUndefined(component.useFactory);
    }
    addCustomClass(component) {
        const { provide, name, useClass } = component;
        this._components.set(name, {
            name,
            metatype: useClass,
            instance: null,
            isResolved: false,
        });
    }
    addCustomValue(component) {
        const { provide, name, useValue: value } = component;
        this._components.set(name, {
            name,
            metatype: null,
            instance: value,
            isResolved: true,
            isNotMetatype: true,
        });
    }
    addCustomFactory(component) {
        const { provide, name, useFactory: factory, inject } = component;
        this._components.set(name, {
            name,
            metatype: factory,
            instance: null,
            isResolved: false,
            inject: inject || [],
            isNotMetatype: true,
        });
    }
   
    addCommand(command) {
        this._commands.set(command.name, {
            name: command.name,
            metatype: command,
            instance: null,
            isResolved: false,
        });
    }
    addArgument(argument) {
        this._arguments.set(argument.name, {
            name: argument.name,
            metatype: argument,
            instance: null,
            isResolved: false,
        });
    }
    addOption(option) {
        this._options.set(option.name, {
            name: option.name,
            metatype: option,
            instance: null,
            isResolved: false,
        });
    }
    
    getCliProgramRefMetatype(components) {
        return class {
            constructor() {
                this.components = components;
            }
            get(type) {
                const name = type_check.isFunction(type) ? type.name : type;
                const exists = this.components.has(name);
                return exists ? this.components.get(name).instance : null;
            }
        };
    }
}
exports.CliProgram = CliProgram;
