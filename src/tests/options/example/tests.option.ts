import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'T',           //this can be set to '-T' also
    fullFlag: 'no-tests',   //this can also be set to '--no-tests'
    description: 'ignore test hook',  //the description that is output as its generated help info
})
export class NoTestsOption{
   
}