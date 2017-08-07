import { CLICommand, OptionalArg, CommandOptionArg, ProgramOptionArg } from '../../../../common';
import { SetupModeOption } from '../../options/example/setup-mode.option'


@CLICommand({
    verb: 'setup',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['env'],       //this equals [env] meaning optional flag argument
    commandDescription: 'run setup commands for all envs',  //this sets the command's help description text
    options: [SetupModeOption],   //your command option classes that modify the command
    //includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class SetupCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @OptionalArg parameter decorator to access optional arguments listed in 'optionalArgs' metadata property
        use @CommandOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your command class, in this case its the 'setup_mode' defined above
        use @ProgramOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your program class, in this case its the 'config' set in the program class of this command

    */
    execute(@OptionalArg('env') env, @CommandOptionArg('setup_mode') mode, @ProgramOptionArg('config') config){
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode and config %s', env, mode, config);
    }

    onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy setup normal');
        output.writeLine('   $ deploy setup priviledged');
    }
}
