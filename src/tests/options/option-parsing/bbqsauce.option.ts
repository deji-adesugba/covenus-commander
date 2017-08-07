import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'b',         //this can be set to '-b' also
    fullFlag: 'bbq-sauce',  //this can also be set to '--bbq-sauce'
    description: 'Add bbq sauce'
})
export class BBQSauceOption{
   
}