import { CliProgramMetatype } from '../common/interfaces/programs/program-metatype.interface';
import { ICliApplication } from '../common/index';
export declare class CovenFactory {
    private static container;
    private static dependenciesScanner;
    private static instanceLoader;
    private static logger;
    static createCLI(cliProgram: CliProgramMetatype): ICliApplication;
    private static createCovenInstance<T>(instance);
    private static initialize(module);
    private static createProxy(target);
    private static createExceptionProxy();
    public static switchToDevelopmentMode();
    public static switchBackToTestMode();
}
