import 'reflect-metadata';
import { Command, Argument, Option } from '../../common/interfaces';
import { ExceptionsHandler } from '../exceptions/exceptions-handler';
import { Metatype } from '../../common';
import { ExceptionTrapMetadata } from '../../common';
import { CovenContainer } from '../injector/container';
import { ExceptionTrap } from '../../common';

export declare class CommanderExceptionTraps {
    private container;
    constructor(container: CovenContainer);
    create(instance: Metatype<Command | Argument | Option>): ExceptionsHandler;
    reflectExceptionTraps(instance: Metatype<Command | Argument | Option>): Metatype<any>[];
    resolveTrapsMetatypes(filters: Metatype<any>[], cliProgramName: string): CLIExceptionTrapMetadata[];
    findExceptionsTrapInstance(metatype: Metatype<any>, cliProgramName: string): CLIExceptionTrap;
    reflectTrapExceptions(metatype: Metatype<Command | Argument | Option>): Metatype<any>[];
}
