import { RuntimeException } from './runtime.exception';
export declare class UnknownMappingException extends RuntimeException {
    constructor(name: string, decorator: string, type: string);
}
