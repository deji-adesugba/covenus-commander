import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'B',   //this can be set to '-B' also
    fullFlag: 'baz',  //this can also be set to '--baz'
    description: 'enable some baz'
})
export class BazOption{
    
}