import { CLIExceptionTrap } from './exception-trap.interface';
import { Metatype } from '../metatype.interface';
export interface CLIExceptionTrapMetadata {
    func: CLIExceptionTrap['trap'];
    exceptionMetatypes: Metatype<any>[];
}
