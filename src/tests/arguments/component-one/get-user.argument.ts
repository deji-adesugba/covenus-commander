import { CLIArgument, RequiredArg, UseTraps } from '../../../../common';
import { UserTrap } from '../../traps/component-one/user-not-found.trap';
import { UserService } from '../../components/component-one/user-service.component';

/*

*/
@CLIArgument({
    requiredArgs: ['user-id'],   //this equals <user-id> meaning required flag argument
})
@UseTraps(UserTrap)
export class GetUserArgument
{
    constructor(private userService: UserService){}
    
    /*
        The execute method is invoked when the arguments matching this class are detected in the command line arguments parsed by the framework
        
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        
        By default, if a required argument is not passed in from the command-line, 
        the coven runtime will respond with a message demanding the argument be passed
        subsequently, so no need to test the 'cmdValue' parameter if its set
        While, an optional argument needs to be tested before use, if(envValue){}
    */
    execute(@RequiredArg('user-id') userId){
      this.userService.getUser(userId).then((user) => console.log(`Found user: ${user.name}`));
    }
}