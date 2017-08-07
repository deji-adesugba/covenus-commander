import { CLIProgram } from '../../common';
import { BombCommand } from './commands/bomb-squad/bomb.command';
import { BombArgument } from './arguments/bomb-squad/bomb.argument';
import { BombTypeOption } from './options/bomb-squad/bomb-type.option';
import { UseTraps } from '../../common';
import { GlobalTrap } from './traps/global/global.trap';

@CLIProgram({
    options: [BombTypeOption],
    //argument: BombArgument,  //your cli app argument class that executes based on your command line required & optional arguments
    commands: [BombCommand], //your cli app command classes are listed under 'commands
    version: '0.1.0'          //your cli app version number will be displayed with help output
})
@UseTraps(GlobalTrap)
export class BombSquad{
    
}