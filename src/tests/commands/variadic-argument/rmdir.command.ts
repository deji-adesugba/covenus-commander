import { CLICommand, VariadicArg, RequiredArg } from '../../../../common';

@CLICommand({
    verb: 'rmdir',               //this is the command verb that triggers this command from the cli
    requiredArgs: ['dir'],       //this equals <dir> meaning required flag argument
    variadicLastArg: 'otherDirs' //this equals [otherDirs...] meaning the last argument of the command is variadic
})
export class RMDirCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @VariadicArg parameter decorator to access the last variadic argument set in the 'variadicLastArg' metadata property

        By default, if a required argument is not passed in from the command-line, 
        the coven runtime will respond with a message demanding the argument be passed
        subsequently, so no need to test the 'cmdValue' parameter if its set
        While, a variadic argument needs to be tested before use, if(otherDirs){}
    */
    execute(@RequiredArg('dir') dir, @VariadicArg('otherDirs') otherDirs){
        console.log('----- Variadic Argument Example -----');
        console.log(' ');
        console.log('rmdir %s', dir);
        if (otherDirs) {
            otherDirs.forEach(function (oDir) {
                console.log('rmdir %s', oDir);
            });
        }
    }
}
