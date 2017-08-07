import { CLIArgument, OptionalArg, RequiredArg, UseTraps } from '../../../../common';
import { BombNotFoundException, DudBombException } from '../../traps/exceptions/bomb.exception';
import { BombCommandTrap } from '../../traps/bomb-squad/bomb.trap';

/*

*/
@CLIArgument({
    requiredArgs: ['bomb-type'],   //this equals <bomb> meaning required flag argument
})
@UseTraps(BombCommandTrap)
export class BombArgument
{
    /*
        The execute method is invoked when the arguments matching this class are detected in the command line arguments parsed by the framework

        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @OptionalArg parameter decorator to access optional arguments listed in 'optionalArgs' metadata property

        By default, if a required argument is not passed in from the command-line, 
        the coven runtime will respond with a message demanding the argument be passed
        subsequently, so no need to test the 'cmdValue' parameter if its set
        While, an optional argument needs to be tested before use, if(envValue){}
    */
    execute(@RequiredArg('bomb-type') bombType){
         bombType = bombType;
        if(bombType == 'c4' || bombType == 'hydrogen'){
            throw new DudBombException();
        }else{
            throw new BombNotFoundException();
        }
    }
}