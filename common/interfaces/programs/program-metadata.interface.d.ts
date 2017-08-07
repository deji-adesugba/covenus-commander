import { CliProgram } from './cli-program.interface';
import { Command } from '../commands/command.interface';
import { Option } from '../options/option.interface';
import { Argument } from '../arguments/argument.interface';

export interface ProgramMetadata {
    version: string;
    usage?: string;
    argument?: any;
    options?: Option[] | any[];
    commands?: any[];
    showHelpByDefault?: boolean;
    components?: any[];
}
