import { CLICommand } from '../../../../common';

@CLICommand({
    verb: 'search',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['query'],       //this equals [query] meaning optional flag argument
    verbDescription: 'search with optional query' //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
})
export class SearchCommand{
    
}
