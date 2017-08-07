import * as program from "commander";
import { StringWriter } from "../string-writer.interface";

type ProgramCommander = program.CommanderStatic;

export interface CliProgram {
    configure?: (commander: ProgramCommander) => ProgramCommander | void;
    onExtraHelpInfo?: (writer: StringWriter) => void;
    run?: (options: any) => void;
    displayHelp?:() => void;
    onCustomizeHelpBeforeDisplay?: (helpText: string) => string;
}