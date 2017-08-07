import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'b',   //this can be set to '-b' also
    fullFlag: 'bar',  //this can also be set to '--bar'
    description: 'enable some bar'
})
export class BarOption{
    
}