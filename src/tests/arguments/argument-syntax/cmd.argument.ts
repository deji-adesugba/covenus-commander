import { CLIArgument, OptionalArg, RequiredArg } from '../../../../common';

/*

*/
@CLIArgument({
    requiredArgs: ['cmd'],   //this equals <cmd> meaning required flag argument
    optionalArgs: ['env']   //this equals [env] meaning optional flag argument
})
export class CMDArgument
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
    execute(@RequiredArg('cmd') cmdValue, @OptionalArg('env') envValue){
        console.log('----- Argument Syntax Example -----');
        console.log(' ');
        console.log('command:', cmdValue);
        console.log('environment:', envValue || "no environment given");
    }

     onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ run cmd env');
        output.writeLine('   $ run drop table');
    }
}