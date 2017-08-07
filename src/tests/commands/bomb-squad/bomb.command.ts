import { CLICommand, ProgramOptionArg, UseTraps } from '../../../../common';
import { BombCommandTrap } from '../../traps/bomb-squad/bomb.trap';
import { BombNotFoundException, DudBombException } from '../../traps/exceptions';

@CLICommand({
    verb: 'bomb',               //this is the command verb that triggers this command from the cli
    commandDescription: 'blow things up',  //this sets the command's help description text
})
//@UseTraps(BombCommandTrap)
export class BombCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @ProgramOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your program class, in this case its the 'config' set in the program class of this command
    */
    execute(@ProgramOptionArg('bomb-type') type){
        if(type == 'c10' || type == 'hydrogen'){
            throw new DudBombException();
        }else{
            throw new BombNotFoundException();
        }
        
    }
}
