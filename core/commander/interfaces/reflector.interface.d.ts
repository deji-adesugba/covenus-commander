export interface Reflector {
    reflectCommandsMetadata(target): any[];
    reflectOptionssMetadata(target): any[];
    reflectArgumentMetadata(target): any[];
}


