import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'f',   //this can be set to '-f' also
    fullFlag: 'foo',  //this can also be set to '--foo'
    description: 'enable some foo'
})
export class FooOption{
    
}