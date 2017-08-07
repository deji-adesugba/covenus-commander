import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 's',          //this can be set to '-s' also
    fullFlag: 'size',        //this can also be set to '--size'
    flagArg: 'size',         //must add 'flagArg' field when using 'flagArgValueRegExp' for regular expression validation
    flagArgValueRegExp: /^(large|medium|small)$/i,  //regular expression to match the argument against(always include 'flagArg')
    flagArgValueHintForRegExp: 'accepted values are large, medium or small',  //this hint will be displayed when an invalid value is passed as an argument
    description: 'Pizza size'
})
export class SizeOption{
  
}