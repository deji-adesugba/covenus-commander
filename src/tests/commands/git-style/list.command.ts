import { CLICommand } from '../../../../common';

@CLICommand({
    verb: 'list',               //this is the command verb that triggers this command from the cli
    verbDescription: 'list packages installed', //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
    verbOption: { isDefault: true},  //verbOption can contain both 'isDefault' and 'noHelp', 'isDefault' makes it the default command if none is specified on the commandline, while 'noHelp' will remove it from the generated help output
})
export class ListCommand{
    
}
