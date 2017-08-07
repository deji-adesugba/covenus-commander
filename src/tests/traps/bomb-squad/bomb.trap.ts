import { Trap, CLIExceptionTrap } from '../../../../common';
import { BombNotFoundException, DudBombException, BombOptionNotFoundException} from '../exceptions';

@Trap(BombNotFoundException, DudBombException)
export class BombCommandTrap implements CLIExceptionTrap{
    trap(exception, output){
        if(exception instanceof BombNotFoundException){
            output.writeLine('A bomb of that type was not found on site');
        }
        if(exception instanceof DudBombException){
            output.writeLine('The bomb found on site was already difused');
        }
    }
}

@Trap(BombOptionNotFoundException)
export class BombOptionTrap implements CLIExceptionTrap{
    trap(exception, output){
        if(exception instanceof BombOptionNotFoundException){
            output.writeLine('The bomb option supplied is not available in stock');
        }
    }
}