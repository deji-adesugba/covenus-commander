import { CLIProgram } from '../../common';
import { CMDArgument } from './arguments/argument-syntax/cmd.argument';

@CLIProgram({
    argument: CMDArgument,  //your cli app argument class that executes based on your command line required & optional arguments
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class ArgumentSyntax{
}