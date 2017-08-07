import { CLIProgram } from '../../common';
import { FooOption, BarOption, BazOption } from './options/custom-help';

@CLIProgram({
    options: [FooOption, BarOption, BazOption],   //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class CustomHelp{
    /*
        adding the 'onExtraHelpInfo' function to your cli program class allows you
        to output additional help info alongside the the generated help output when your
        app is called with '-h' or '--help' flag
    */
    onExtraHelpInfo(output){
        output.writeLine('');
        output.writeLine('');
        output.writeLine('----- Custom Help Example -----');
        output.writeLine('');
        output.writeLine('    $ custom-help --help');
        output.writeLine('    $ custom-help -h');
        output.writeLine('');
    }
}