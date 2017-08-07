"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UnknownDependenciesException = require("../errors/exceptions/unknown-dependencies.exception").UnknownDependenciesException;
const RuntimeException = require("../errors/exceptions/runtime.exception").RuntimeException;
const type_check = require("../../common/utils/type-check.utils");
const global_constants = require("../../common/constants");

class Injector {
    loadInstanceOfCommand(wrapper, cliProgram) {
        const commands = cliProgram.commands;
        this.loadInstance(wrapper, commands, cliProgram);
    }
    loadInstanceOfArgument(wrapper, cliProgram) {
        const args = cliProgram.arguments;
        this.loadInstance(wrapper, args, cliProgram);
    }
    loadInstanceOfOption(wrapper, cliProgram) {
        const options = cliProgram.options;
        this.loadInstance(wrapper, options, cliProgram);
    }
    loadPrototypeOfInstance({ metatype, name }, collection) {
        if (!collection)
            return;

        const target = collection.get(name);
        if (target.isResolved || !type_check.isNil(target.inject))
            return;
        collection.set(name, Object.assign({}, collection.get(name), { instance: Object.create(metatype.prototype) }));
    }
    loadInstanceOfComponent(wrapper, cliProgram, context = []) {
        const components = cliProgram.components;
        this.loadInstance(wrapper, components, cliProgram, context);
    }
    loadInstance(wrapper, collection, cliProgram, context = []) {
        const { metatype, name, inject } = wrapper;
        const currentMetatype = collection.get(name);
        if (type_check.isUndefined(currentMetatype)) {
            throw new RuntimeException(`Coven could not resolve type '${name}`);
        }
        if (currentMetatype.isResolved)
            return;

        this.resolveConstructorParams(wrapper, cliProgram, inject, context, (instances) => {
            if (type_check.isNil(inject)) {
                currentMetatype.instance = Object.assign(currentMetatype.instance, new metatype(...instances));
            }
            else {
                currentMetatype.instance = currentMetatype.metatype(...instances);
            }
            currentMetatype.isResolved = true;
        });
    }
    resolveConstructorParams(wrapper, cliProgram, inject, context, callback) {
        let isResolved = true;
        const args = type_check.isNil(inject) ? this.reflectConstructorParams(wrapper.metatype) : inject;
        const instances = args.map((param) => {
            const paramWrapper = this.resolveSingleParam(wrapper, param, cliProgram, context);
            if (paramWrapper.isExported && !paramWrapper.isResolved) {
                isResolved = false;
            }
            return paramWrapper.instance;
        });
        isResolved && callback(instances);
    }
    reflectConstructorParams(type) {
        const paramtypes = Reflect.getMetadata(global_constants.PARAMTYPES_METADATA, type) || [];
        const selfParams = this.reflectSelfParams(type);
        selfParams.forEach(({ index, param }) => {
            paramtypes[index] = param
        });
        return paramtypes;
    }
    reflectSelfParams(type) {
        return Reflect.getMetadata(global_constants.SELF_DECLARED_DEPS_METADATA, type) || [];
    }
    resolveSingleParam(wrapper, param, cliProgram, context) {
        if (type_check.isUndefined(param)) {
            throw new RuntimeException();
        }
        return this.resolveComponentInstance(cliProgram, type_check.isFunction(param) ? param.name : param, wrapper, context);
    }
    resolveComponentInstance(cliProgram, name, wrapper, context) {
        const components = cliProgram.components;
        const instanceWrapper = this.scanForComponent(components, name, cliProgram, wrapper, context);
        if (!instanceWrapper.isResolved && !instanceWrapper.isExported) {
            this.loadInstanceOfComponent(components.get(name), cliProgram);
        }
        return instanceWrapper;
    }
    scanForComponent(components, name, cliProgram, { metatype }, context = []) {
        const component = this.scanForComponentInScopes(context, name, metatype);
        if (component) {
            return component;
        }
        
        if(components.has(name)){ return components.get(name)}else{
            throw new UnknownDependenciesException(metatype.name)
        }
    }
    
    scanForComponentInScopes(context, name, metatype) {
        context = context || [];
        for (const ctx of context) {
            const component = this.scanForComponentInScope(ctx, name, metatype);
            if (component)
                return component;
        }
        return null;
    }
    scanForComponentInScope(context, name, metatype) {
        try {
            const component = this.scanForComponent(context.components, name, context, { metatype }, null);
            if (!component.isResolved) {
                this.loadInstanceOfComponent(component, context);
            }
            return component;
        }
        catch (e) {
            return null;
        }
    }
    
}
exports.Injector = Injector;
