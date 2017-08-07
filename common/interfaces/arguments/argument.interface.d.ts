import { StringWriter } from "../string-writer.interface";

export declare interface Argument{
    execute?: (...args: any[]) => void;
    onHelp?: (writer: StringWriter) => void;
}