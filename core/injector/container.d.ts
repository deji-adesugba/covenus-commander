import 'reflect-metadata';
import { Command, Argument, Option, Injectable } from '../../common/interfaces';
import { CliProgramMetatype } from '../../common/interfaces/programs/program-metatype.interface';
import { Metatype } from '../../common/interfaces/metatype.interface';
import { CliProgram } from './program';

export declare class CovenContainer {
    private readonly programs;
    private readonly programTokenFactory;
    addCliProgram(metatype: CliProgramMetatype, scope: CliProgramMetatype[]): void;
    getCliPrograms(): Map<string, CliProgram>;
    getMainCliProgram(): CliProgram;
    verifyExistsAndReturnCliProgram(token: string): CliProgram;
    addComponent(component: Metatype<Injectable>, token: string): void;
    addCommand(command: Metatype<Command>, token: string): void;
    addArgument(command: Metatype<Argument>, token: string): void;
    addOption(command: Metatype<Option>, token: string): void;
    clear(): void;
}
export interface InstanceWrapper<T> {
    name: any;
    metatype: Metatype<T>;
    instance: T;
    isResolved: boolean;
    inject?: Metatype<any>[];
    isNotMetatype?: boolean;
}
