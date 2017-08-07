import { CovenContainer, InstanceWrapper } from '../injector/container';
import { Command, Argument, Option } from '../../common/interfaces';
import { Resolver } from './interfaces/resolver.interface';
import { CommanderExceptionTraps } from './commander-exception-traps';

export declare class CommanderResolver implements Resolver {
    private container;
    private readonly logger;
    private readonly commanderProxy;
    private readonly commanderExceptionsTrap;
    private readonly commanderExecutor;
    constructor(container: CovenContainer);
    resolve(): void;
    execute(): void;
}
