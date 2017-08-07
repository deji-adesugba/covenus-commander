import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'o',            //this can be set to '-o' also
    fullFlag: 'optional',      //this can also be set to '--optional'
    flagArg: 'value',          //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: false,  //'false' equals [value] meaning optional flag argument
    description: 'An optional value'
})
export class OptionalOption{
   
}