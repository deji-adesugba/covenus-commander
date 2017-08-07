import { CLIOutputWriter } from "../cli-output-writer.interface";

export interface CLIExceptionTrap {
    trap(exception: any, output: CLIOutputWriter): any;
}

