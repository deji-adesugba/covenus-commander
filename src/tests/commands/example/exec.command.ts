import { CLICommand, RequiredArg, CommandOptionArg } from '../../../../common';
import { ExecModeOption } from '../../options/example/exec-mode.option'


@CLICommand({
    verb: 'exec',               //this is the command verb that triggers this command from the cli
    requiredArgs: ['cmd'],       //this equals <cmd> meaning required flag argument
    commandDescription: 'execute the given remote cmd',  //this sets the command's help description text
    options: [ExecModeOption],   //your command option classes that modify the command
    alias: 'ex',                  //an alias can be used to trigger the command along with its verb
    //includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class ExecCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @CommandOptionArg parameter decorator to access the value of the options set in the 'options' metadata property
        
    */
    execute(@RequiredArg('cmd') cmd, @CommandOptionArg('exec_mode') mode){

        console.log('exec "%s" using %s mode', cmd, mode);
    }

    onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy exec sequential');
        output.writeLine('   $ deploy exec async');
        output.writeLine('');
    }
}
