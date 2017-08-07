import { CLICommand, ProgramOptionArg, UseTraps, Inject } from '../../../../common';
import { UserTrap } from '../../traps/component-one/user-not-found.trap';
import { UserService } from '../../components/component-one/user-service.component';

@CLICommand({
    verb: 'getuser',               //this is the command verb that triggers this command from the cli
    commandDescription: 'get user from the user catalogue',  //this sets the command's help description text
})
@UseTraps(UserTrap)
export class GetUserCommand{
    //constructor(private userService: UserService){}
    private userService = null;

    constructor(@Inject('user') userService){
        this.userService = userService;
    }
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @ProgramOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your program class, in this case its the 'config' set in the program class of this command
    */
    execute(@ProgramOptionArg('user-id') userId){
        if(!userId){
            console.log('error: user id required');
            return;
        }
        this.userService.getUser(userId).then((user) => console.log(`Found user: ${user.name}`));
    }
}
