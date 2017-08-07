import { CLIProgram } from '../../common';
import { DrinkOption, SizeOption } from './options/regexp';

@CLIProgram({
    options: [DrinkOption, SizeOption], //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'    //your cli app version number will be displayed with help output
})
export class RegularExpression{
    run(options){
        console.log('----- RegExp Example -----');
        console.log(' ');
        console.log(' size: %j', options.size);
        console.log(' drink: %j', options.drink);
    }
}