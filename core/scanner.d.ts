import 'reflect-metadata';
import { CovenContainer } from './injector/container';
import { CliProgramMetatype } from '../common/interfaces/programs/program-metatype.interface';
export declare class DependenciesScanner {
    private container;
    constructor(container: CovenContainer);
    scan(cliProgram: CliProgramMetatype): void;
    private scanForCliPrograms(cliProgram, scope?);
    private storeCliProgram(cliProgram, scope);
    private scanCliProgramsForDependencies();
    private reflectComponents(cliProgram, token);
    private reflectCommands(cliProgram, token);
    private reflectArguments(cliProgram, token);
    private reflectOptions(instance, token);
    private reflectExceptionTraps(component, token);
    private storeComponent(component, token);
    private storeCommand(command, token);
    private storeArgument(argument, token);
    private storeOption(option, token);
    private reflectMetadata(cliProgram, metadata);
}
