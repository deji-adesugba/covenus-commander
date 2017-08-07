import { CLIProgram } from '../../common';
import { PeppersOption, PineappleOption, BBQSauceOption, CheeseOption } from './options/option-parsing';

@CLIProgram({
    options: [PeppersOption, PineappleOption, BBQSauceOption, CheeseOption],  //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class OptionParsing{
    run(options){
        console.log('----- Option Parsing Example -----');
        console.log(' ');
        if(options.peppers){console.log(` - ${options.peppers} pepper`)}
        if(options.pineapple){console.log(` - ${options.pineapple} pineapple`)}
        if(options.bbqSauce){console.log(` - ${options.bbqSauce} bbq-sauce`)}
        if(options.cheese){console.log(` - ${options.cheese} cheese`)}
    }
}