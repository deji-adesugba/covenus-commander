import { CLIProgram } from '../../common';
import { MessageOption } from './options/output-help/message.option';

@CLIProgram({
    options: [MessageOption],  //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class OutputHelp{
    run(options){
        console.log('----- Output Help Example -----');
        console.log(' ');
        if(options.message){
            /*
               the 'displayHelp' function is automatically injected into your @CliProgram class
               use it to trigger the output of the app's generated help output to the command line
               without exiting or using the '-h' or '--help' flag.
            */
            this.displayHelp(); 
        }else{
            console.log(' No message passed in');
        }
    }

    /*
        the 'onCustomizeHelpBeforeDisplay' function if present in your @CliProgram class 
        is automatically used by the 'displayHelp' to enable you customize the help output
        before it is sent to the command line
        Perhaps change the color of the text or do some manipulation of the text
    */
    onCustomizeHelpBeforeDisplay(helpText){
        var myCustomMessage = "\n  My Custom Message  \n\n\n";
        return helpText.concat(myCustomMessage);
    }
}