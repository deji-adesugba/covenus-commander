import { CLIProgram } from '../../common';
import { GetUserCommand } from './commands/component-one/get-user.command';
import { GetUserArgument } from './arguments/component-one/get-user.argument';
import { UserIdOption } from './options/component-one/user-id.option';
import { UserService } from './components/component-one/user-service.component';
import { CustomUserService } from './components/component-one/custom-user-service.component';
import { UserNotFoundException } from './traps/exceptions';

const users = [{ id: 1, name: "User X" }];
const val = {
    getAllUsers: ()=>{return Promise.resolve(users)},
    getUser: (id)=> {if(+id == 1){return Promise.resolve(users[0])}
                throw new UserNotFoundException();
    },
    addUser: (user)=>{users.push(user);return Promise.resolve();}
}

@CLIProgram({
    options: [UserIdOption],
    //argument: GetUserArgument, //your cli app argument class that executes based on your command line required & optional arguments
    commands: [GetUserCommand],  //your cli app command classes are listed under 'commands
    components: [{provide: 'user', useValue: val}],
    //components: [{provide: UserService, useClass: CustomUserService}],
    //components: [{provide: UserService, useValue: val}],
    //components: [UserService],   //your cli app components used by your commands, arguments or options must be listed here, so they can be resolved and injected
    version: '0.1.0'             //your cli app version number will be displayed with help output
})
export class ComponentOne{
    constructor(){
    }
}