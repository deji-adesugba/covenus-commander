import { CLIProgram } from '../../common';
import { InstallCommand, SearchCommand, ListCommand } from './commands/git-style';

@CLIProgram({
    commands: [InstallCommand, SearchCommand, ListCommand],  //your cli app command classes are listed under 'commands
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class GitStyle{
}