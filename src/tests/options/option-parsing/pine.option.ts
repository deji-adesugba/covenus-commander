import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'P',         //this can be set to '-P' also
    fullFlag: 'pineapple',  //this can also be set to '--pineapple'
    description: 'Add pineapple'
})
export class PineappleOption{
    
}