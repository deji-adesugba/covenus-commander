import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'c',           //this can be set to '-c' also
    fullFlag: 'config',   //this can also be set to '--config'
    flagArg: 'path',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <path>, not optional
    description: 'set config path. defaults to ./deploy.conf',  //the description that is output as its generated help info
})
export class ConfigOption{
   
}