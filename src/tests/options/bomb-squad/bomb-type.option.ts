import { CLIOption, UseTraps } from '../../../../common';
import { BombOptionTrap } from '../../traps/bomb-squad/bomb.trap';
import { BombOptionNotFoundException, DudBombException } from '../../traps/exceptions';

@CLIOption({
    shortFlag: 't',           //this can be set to '-t' also
    fullFlag: 'bomb-type',      //this can also be set to '--bomb-type'
    flagArg: 'type',             //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <n> meaning required flag argument
    description: 'A bomb type'
})
//@UseTraps(BombOptionTrap)
export class BombTypeOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method
    */
    coercion(argValue: any, argDefault?: any) : any
    {
        if(argValue !== 'c10'){
            throw new BombOptionNotFoundException();
        }
       return argValue;
    }
}