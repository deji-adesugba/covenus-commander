import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'p',        //this can be set to '-p' also
    fullFlag: 'peppers',   //this can also be set to '--peppers'
    description: 'Add peppers'
})
export class PeppersOption{
    
}