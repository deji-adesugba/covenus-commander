import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'l',           //this can be set to '-l' also
    fullFlag: 'list',         //this can also be set to '--list'
    flagArg: 'items',         //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <items> meaning required flag argument
    description: 'A list'
})
export class ListOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       return argValue.split(',');
   }
}