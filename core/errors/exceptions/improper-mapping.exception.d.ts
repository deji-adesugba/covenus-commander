import { RuntimeException } from './runtime.exception';
export declare class ImproperMappingException extends RuntimeException {
    constructor(name: string, decorator: string, type: string);
}
