import { RuntimeException } from './exceptions/runtime.exception';
import { ConsoleException } from './exceptions/console.exception';
import { CLIException } from '../exceptions/commandline-exception';
export declare class ExceptionHandler {
    private readonly logger;
    handle(exception: RuntimeException | ConsoleException | CLIException | Error): boolean;
}
