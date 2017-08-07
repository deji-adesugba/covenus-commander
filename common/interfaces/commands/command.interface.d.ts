import { StringWriter } from "../string-writer.interface";

export declare interface Command{
    execute?: (...args: any[]) => void;
    onHelp?: (writer: StringWriter) => void;
}
