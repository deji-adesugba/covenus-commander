import { InstanceWrapper } from './container';
import { Command, Argument, Option, Injectable, CliProgram } from '../../common/interfaces';
import { CliProgramMetatype } from '../../common/interfaces/programs/program-metatype.interface';
import { Metatype } from '../../common/interfaces/metatype.interface';

export interface CustomComponent {
    provide: any;
    name: string;
}
export declare type OpaqueToken = string | symbol | object | Metatype<any>;
export declare type CustomClass = CustomComponent & {
    useClass: Metatype<any>;
};
export declare type CustomFactory = CustomComponent & {
    useFactory: (...args) => any;
    inject?: Metatype<any>[];
};
export declare type CustomValue = CustomComponent & {
    useValue: any;
};
export declare type ComponentMetatype = Metatype<Injectable> | CustomFactory | CustomValue | CustomClass;

export declare class CliProgram {
    private _metatype;
    private _scope;
    private _relatedCliPrograms;
    private _components;
    private _commands;
    private _arguments;
    private _options;
    private _reflectedTargetOptions;
    private _usage;
    private _version;
    private _showHelpByDefault;
    private _exports;

    constructor(_metatype: CliProgramMetatype, _scope: CliProgramMetatype[]);
    readonly scope: CliProgramMetatype[];
    readonly relatedCliPrograms: Set<CliProgram>;
    readonly components: Map<string, InstanceWrapper<Injectable>>;
    readonly commands: Map<string, InstanceWrapper<Command>>;
    readonly arguments: Map<string, InstanceWrapper<Argument>>;
    readonly options: Map<string, InstanceWrapper<Option>>;
    readonly exports: Set<string>;
    readonly usage: string;
    readonly version: string;
    readonly showHelpByDefault: boolean;
    readonly instance: CliProgram;
    readonly metatype: CliProgramMetatype;
    addReflectedOptionPropertiesForTarget(target: Metatype<any>, reflectedOptionProperties: any[]): void;
    getReflectedOptionProperties(target: Metatype<any>): any[];
    addReflectedCommandProperties(target: Metatype<any>, reflectedCommandProperties: any[]): void;
    getReflectedCommandProperties(target: Metatype<any>): any[];
    addReflectedArgPropertiesForTarget(target: Metatype<any>, type: string, reflectedArgProperties: any[]): void;
    addReflectedArgProperties(target: Metatype<any>, type: string): any[];
    getArgument(): Metatype<Argument>;
    addCliProgramRef(): void;
    addCliProgramAsComponent(): void;
    addComponent(component: ComponentMetatype): void;
    isCustomComponent(component: ComponentMetatype): component is CustomClass | CustomFactory | CustomValue;
    addCustomComponent(component: CustomFactory | CustomValue | CustomClass): void;
    isCustomClass(component: any): component is CustomClass;
    isCustomValue(component: any): component is CustomValue;
    isCustomFactory(component: any): component is CustomFactory;
    addCustomClass(component: CustomClass): void;
    addCustomValue(component: CustomValue): void;
    addCustomFactory(component: CustomFactory): void;
    addExportedComponent(exportedComponent: ComponentMetatype): void;
    addCustomExportedComponent(exportedComponent: CustomFactory | CustomValue | CustomClass): void;
    addCommand(command: Metatype<Command>): void;
    addArgument(argument: Metatype<Argument>): void;
    addOption(option: Metatype<Option>): void;
    addRelatedCliProgram(relatedCliProgram: any): void;
    private getCliProgramRefMetatype(components);
}
