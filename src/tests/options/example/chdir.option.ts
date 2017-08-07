import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'C',           //this can be set to '-C' also
    fullFlag: 'chdir',   //this can also be set to '--chdir'
    flagArg: 'path',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <path>, not optional
    description: 'change the working directory',  //the description that is output as its generated help info
})
export class ChDirOption{
   
}