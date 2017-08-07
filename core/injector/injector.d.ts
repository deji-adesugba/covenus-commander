import 'reflect-metadata';
import { InstanceWrapper } from './container';
import { CliProgram } from './program';
import { Metatype } from '../../common/interfaces/metatype.interface';
import { Command } from '../../common/interfaces/commands/command.interface';
import { Argument } from '../../common/interfaces/arguments/argument.interface';
import { Option } from '../../common/interfaces/options/option.interface';
import { Injectable } from '../../common/interfaces/injectable.interface';

export declare class Injector {
    loadInstanceOfCommand(wrapper: InstanceWrapper<Command>, cliProgram: CliProgram): void;
    loadInstanceOfArgument(wrapper: InstanceWrapper<Argument>, cliProgram: CliProgram): void;
    loadInstanceOfOption(wrapper: InstanceWrapper<Option>, cliProgram: CliProgram): void;
    loadPrototypeOfInstance<T>({metatype, name}: InstanceWrapper<T>, collection: Map<string, InstanceWrapper<T>>): void;
    loadInstanceOfComponent(wrapper: InstanceWrapper<Injectable>, cliProgram: CliProgram, context?: CliProgram[]): void;
    loadInstance<T>(wrapper: InstanceWrapper<T>, collection: any, cliProgram: CliProgram, context?: CliProgram[]): void;
    resolveConstructorParams<T>(wrapper: InstanceWrapper<T>, cliProgram: CliProgram, inject: any[], context: CliProgram[], callback: (args) => void): void;
    reflectConstructorParams<T>(type: Metatype<T>): any[];
    reflectSelfParams<T>(type: Metatype<T>): any[];
    resolveSingleParam<T>(wrapper: InstanceWrapper<T>, param: Metatype<any> | string | symbol, cliProgram: CliProgram, context: CliProgram[]): any;
    resolveComponentInstance<T>(cliProgram: CliProgram, name: any, wrapper: InstanceWrapper<T>, context: CliProgram[]): any;
    scanForComponent(components: Map<string, any>, name: any, cliProgram: CliProgram, {metatype}: {
        metatype: any;
    }, context?: CliProgram[]): any;
    scanForComponentInScopes(context: CliProgram[], name: any, metatype: any): any;
    scanForComponentInScope(context: CliProgram, name: any, metatype: any): any;
}
