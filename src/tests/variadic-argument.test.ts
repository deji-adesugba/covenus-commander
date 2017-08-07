import { CLIProgram } from '../../common';
import { RMDirCommand } from './commands/variadic-argument/rmdir.command';

@CLIProgram({
    commands: [RMDirCommand], //your cli app command classes are listed under 'commands
    version: '0.1.0'          //your cli app version number will be displayed with help output
})
export class VariadicArgument{
}