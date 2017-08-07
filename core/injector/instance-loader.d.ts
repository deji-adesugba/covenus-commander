import { CovenContainer } from './container';
export declare class InstanceLoader {
    private container;
    private readonly injector;
    private readonly logger;
    constructor(container: CovenContainer);
    createInstancesOfDependencies(): void;
    private createPrototypes(cliPrograms);
    private createInstances(cliPrograms);
    private createPrototypesOfComponents(cliProgram);
    private createInstancesOfComponents(cliProgram);
    private createPrototypesOfCommands(cliProgram);
    private createInstancesOfCommands(cliProgram);
    private createPrototypesOfArguments(cliProgram);
    private createInstancesOfArguments(cliProgram);
    private createPrototypesOfOptions(cliProgram);
    private createInstancesOfOptions(cliProgram);
    private callCliProgramInitHook(cliProgram);
    private hasOnCliProgramInitHook(instance);
}
