import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'e',           //this can be set to '-e' also
    fullFlag: 'exec_mode',   //this can also be set to '--exec_mode'
    flagArg: 'mode',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <mode>, not optional
    description: 'Which exec mode to use',  //the description that is output as its generated help info
})
export class ExecModeOption{
   
}