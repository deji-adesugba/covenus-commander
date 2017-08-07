import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'm',         //this can be set to '-m' also
    fullFlag: 'message',  //this can also be set to '--message'
    description: 'message to display as help'
})
export class MessageOption{
    
}