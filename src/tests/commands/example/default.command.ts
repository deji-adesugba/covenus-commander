import { CLICommand } from '../../../../common';

@CLICommand({
    verb: '*',   //this wildcard command verb is the default command executed when unknown command verbs are passed in
})
export class DefaultCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
    */
    execute(){
        console.log('deploying with default configuration');
    }
}
