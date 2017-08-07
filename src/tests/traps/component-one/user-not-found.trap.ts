import { UserNotFoundException } from '../exceptions';
import { Trap, CLIExceptionTrap } from '../../../../common';

@Trap(UserNotFoundException)
export class UserTrap implements CLIExceptionTrap{
    trap(exception, output){
        if(exception instanceof UserNotFoundException){
            output.writeLine('User not found in user directory');
        }
    }
}

