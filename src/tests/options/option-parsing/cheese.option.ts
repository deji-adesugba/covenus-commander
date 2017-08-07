import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'c',            //this can be set to '-c' also
    fullFlag: 'cheese',        //this can also be set to '--cheese'
    flagArg: 'type',           //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: false,  //'false' equals [type] meaning optional flag argument
    description: 'Add the specified type of cheese [marble]',
    defaultValue: 'marble'     //this value will be passed as 'argDefault' to the 'coercion' class function
})
export class CheeseOption{
    
}