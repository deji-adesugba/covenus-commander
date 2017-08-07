import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 's',           //this can be set to '-s' also
    fullFlag: 'setup_mode',   //this can also be set to '--setup_mode'
    flagArg: 'mode',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: false, //the flag argument is optional [mode], not required
    description: 'Which setup mode to use',  //the description that is output as its generated help info
    defaultValue: 'normal'    //if you want to have a default value, incase no argument is passed in for the option
})
export class SetupModeOption{
   
}