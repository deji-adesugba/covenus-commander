import { CLIProgram } from '../../common';
import { SetupCommand, ExecCommand, DefaultCommand } from './commands/example';
import { ChDirOption, ConfigOption, NoTestsOption } from './options/example'

@CLIProgram({
    options: [ChDirOption, ConfigOption, NoTestsOption],
    commands: [SetupCommand, ExecCommand, DefaultCommand], //your cli app command classes are listed under 'commands
    version: '0.1.0'          //your cli app version number will be displayed with help output
})
export class Example{
     /*
        adding the 'onExtraHelpInfo' function to your cli program class allows you
        to output additional help info alongside the the generated help output when your
        app is called with '-h' or '--help' flag
    */
    onExtraHelpInfo(output){
        output.writeLine('');
        output.writeLine('');
    }
}