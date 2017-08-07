import { CovenContainer } from './injector/container';
import { ICliApplication } from '../common/index';

export declare class CovenCliApplication implements ICliApplication {
    private readonly container;
    private readonly config;
    private readonly logger;
    private isInitialized;

    constructor(container: CovenContainer);
    setup(cliProgramInstance): void;
    init(): void;
    run(callback?: () => void): any;
}
