import { OpaqueToken } from './program';

export declare abstract class CliProgramRef {
    abstract get<T>(type: OpaqueToken): T;
}
