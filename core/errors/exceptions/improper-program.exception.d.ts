import { RuntimeException } from './runtime.exception';
export declare class ImproperProgramException extends RuntimeException {
    constructor(primaryType: string, secondaryType: string, programName: string);
}
