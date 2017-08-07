import { CLIOption } from '../../../../common';

@CLIOption({
    shortFlag: 'd',           //this can be set to '-d' also
    fullFlag: 'drink',        //this can also be set to '--drink'
    flagArg: 'drink',         //must add 'flagArg' field when using 'flagArgValueRegExp' for regular expression validation
    flagArgValueRegExp: /^(coke|pepsi|isse)$/i,  //regular expression to match the argument against(always include 'flagArg')
    flagArgValueHintForRegExp: 'accepted values are coke, pepsi or isse', //this hint will be displayed when an invalid value is passed as an argument
    description: 'Drink'
})
export class DrinkOption{
  
}