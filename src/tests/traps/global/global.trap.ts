import { Trap, CLIExceptionTrap } from '../../../../common';
import { BombNotFoundException, DudBombException, BombOptionNotFoundException} from '../exceptions';

@Trap(BombNotFoundException, DudBombException, BombOptionNotFoundException)
class GlobalTrap implements CLIExceptionTrap{
    trap(exception, output){
        if(exception instanceof BombNotFoundException){
            output.writeLine('bomb also not found by global squad');
        }
        if(exception instanceof BombOptionNotFoundException){
            output.writeLine("option couldn't be located by global squad");
        }
        if(exception instanceof DudBombException){
            output.writeLine('The bomb found on site was difused by global squad');
        }
        output.writeLine(`error: ${exception}`);
    }
}

export { GlobalTrap, BombNotFoundException, DudBombException, BombOptionNotFoundException }
