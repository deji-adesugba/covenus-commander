import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'u',           //this can be set to '-u' also
    fullFlag: 'user-id',      //this can also be set to '--user-id'
    flagArg: 'id',             //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <id> meaning required flag argument, if 'false' meaning optional make sure you have a default value set too 
    description: "the user's id"
})
export class UserIdOption{}