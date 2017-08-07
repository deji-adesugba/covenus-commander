import { CLICommand } from '../../../../common';

@CLICommand({
    verb: 'install',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['name'],       //this equals [name] meaning optional flag argument
    verbDescription: 'install one or more packages', //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
    includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class InstallCommand{
    
}
