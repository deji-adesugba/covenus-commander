import { CLIException } from './commandline-exception';
import { CLIExceptionTrapMetadata } from '../../common/interfaces/exceptions/exception-trap-metadata.interface';
export declare class ExceptionsHandler {
    private readonly logger;
    private filters;
    next(exception: Error | CLIException | any, response: any): void;
    setCustomTraps(filters: CLIExceptionTrapMetadata[]): void;
    invokeCustomTraps(exception: any, response: any): boolean;
}
