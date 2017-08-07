import { CLIProgram } from '../../common';
import { IntegerOption, FloatOption, RangeOption, ListOption,
         OptionalOption, CollectOption, VerboseOption } from './options/coercion';

@CLIProgram({
    options: [IntegerOption, FloatOption, RangeOption, ListOption,  
              OptionalOption, VerboseOption , CollectOption],     //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0',     //your cli app version number will be displayed with help output
    usage: '[options] <file ...>'   //your cli app usage describes the order of your arguments and options to users
})
export class Coercion{
    run(options){
        console.log('----- Coercion Example -----');
        console.log(' ');
        console.log(' int: %j', options.integer);
        console.log(' float: %j', options.float);
        console.log(' optional: %j', options.optional);
        options.range = options.range || [];
        console.log(' range: %j..%j', options.range[0], options.range[1]);
        console.log(' list: %j', options.list);
        console.log(' collect: %j', options.collect);
        console.log(' verbosity: %j', options.verbose);
        console.log(' args: %j', options.args);
    }
}