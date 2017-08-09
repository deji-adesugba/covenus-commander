# Covenus-Commander
Modern, powerful command-line application framework for Node.js using typescript or ES6, inspired by commander, nestjs and angular

 [![NPM Version](http://img.shields.io/npm/v/covenus-commander.svg?style=flat)](https://www.npmjs.org/package/covenus-commander)
[![NPM Downloads](https://img.shields.io/npm/dm/covenus-commander.svg?style=flat)](https://www.npmjs.org/package/covenus-commander)

## Description

Covenus-commander is a modern command-line application framework for [Node.js](http://nodejs.org) which helps you simplify building command-line interfaces using modern JavaScript, is built with [TypeScript](http://www.typescriptlang.org), combining class-based modularity with the annotation syntax of decorators, to build a command-line interface application out of a set of loosely-coupled reusable components.

Covenus-commander is built with the awesome, popular, well-known library—[Commander](https://github.com/tj/commander.js). And models it's application programming interface after [Angular](https://github.com/angular/angular) and [Nest](https://github.com/kamilmysliwiec/nest).


## Installation

    $ npm install covenus-commander --save

## Option parsing

 Options with covenus-commander are defined with the `@CLIOption` decorator, passing in metadata arguments that serve to define the details and documentation for the options. The example below mimics the option parsing example on the [Commander](https://github.com/tj/commander.js) github page. Equally parsing the args and options from `process.argv` to match.

 ```js
 import { CLIOption } from 'covenus-commander';

 @CLIOption({
    shortFlag: 'p',        //this can be set to '-p' also
    fullFlag: 'peppers',   //this can also be set to '--peppers'
    description: 'Add peppers'  //the description that is output as its generated help info
})
export class PeppersOption{}

@CLIOption({
    shortFlag: 'P',         //this can be set to '-P' also
    fullFlag: 'pineapple',  //this can also be set to '--pineapple'
    description: 'Add pineapple'  //the description that is output as its generated help info
})
export class PineappleOption{}

@CLIOption({
    shortFlag: 'b',         //this can be set to '-b' also
    fullFlag: 'bbq-sauce',  //this can also be set to '--bbq-sauce'
    description: 'Add bbq sauce'  //the description that is output as its generated help info
})
export class BBQSauceOption{}

@CLIOption({
    shortFlag: 'c',            //this can be set to '-c' also
    fullFlag: 'cheese',        //this can also be set to '--cheese'
    flagArg: 'type',           //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: false,  //'false' equals [type] meaning optional flag argument
    description: 'Add the specified type of cheese [marble]', //the description that is output as its generated help info
    defaultValue: 'marble'     //this value will be passed as 'argDefault' to the 'coercion' class function
})
export class CheeseOption{}
```
Now that the options have been defined by their standalone classes annoted with the `@CLIOption` decorator, the main command-line program class can now be declared and annoted with its own `@CLIProgram` decorator. Passing in its own metadata arguments tying  together the earlier options for the applications execution.

```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    options: [PeppersOption, PineappleOption, BBQSauceOption, CheeseOption],  //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class OptionParsing{
    run(options){
        console.log('You ordered a pizza with: ');
        console.log(' ');
        if(options.peppers){console.log(` - peppers`)}
        if(options.pineapple){console.log(` - pineapple`)}
        if(options.bbqSauce){console.log(` - bbq-sauce`)}
        if(options.cheese){console.log(' - %s cheese', options.cheese)}
    }
}

const app = CovenFactory.createCLI(OptionParsing);
app.run();

```
Remember that [Covenus-commander]() is built on the popular [Commander](https://github.com/tj/commander.js), so its underlying framework benefits translate over. So the short flags of the individual options may be passed as a single arg, for example `-abc` is equivalent to `-a -b -c`. And multi-word options such as "--bbq-sauce" are camel-cased, becoming `options.bbqSauce` when checking if the option flag was set etc.

## Automated --help

 The help information is auto-generated based on the information you've afforded covenus-commander already through the metadata annotations (e.g. `@CLIOption`, `@CLICommand`, `@CLIArgument`) it provides by default, so the following help info is generated for free by the underlying framework once you pass the `--help` flag on the command-line console:

```  
 $ ./examples/pizza --help

   Usage: pizza [options]

   An application for pizzas ordering

   Options:

     -h, --help           output usage information
     -V, --version        output the version number
     -p, --peppers        Add peppers
     -P, --pineapple      Add pineapple
     -b, --bbq            Add bbq sauce
     -c, --cheese <type>  Add the specified type of cheese [marble]
     -C, --no-cheese      You do not want any cheese

```

## Coercion

```js

import { CLIOption, isInt } from 'covenus-commander';

@CLIOption({
    shortFlag: 'c',             //this can also be set to '-c'
    fullFlag: 'collect',        //this can also be set to '--collect'
    flagArg: 'value',           //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: false,   //'false' equals [value] meaning optional flag argument
    description: 'A repeatable value',
    defaultValue: []            //this value will be passed as 'argDefault' to the 'coercion' class function
})
export class CollectOption{
   /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       argDefault.push(argValue);
       return argDefault;
   }
}

@CLIOption({
    shortFlag: 'f',           //this can be set to '-f' also
    fullFlag: 'float',        //this can also be set to '--float'
    flagArg: 'n',             //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <n> meaning required flag argument
    description: 'An float argument'
})
export class FloatOption{
  /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       var val = parseFloat(argValue);
       if(!isNaN(val)){
          return val;
       }

       return 'Not a Number';
   }
}

@CLIOption({
    shortFlag: 'i',           //this can be set to '-i' also
    fullFlag: 'integer',      //this can also be set to '--integer'
    flagArg: 'n',             //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <n> meaning required flag argument
    description: 'An integer argument'
})
export class IntegerOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       if(isInt(argValue)){
          return parseInt(argValue);
       }
   }
}

@CLIOption({
    shortFlag: 'l',           //this can be set to '-l' also
    fullFlag: 'list',         //this can also be set to '--list'
    flagArg: 'items',         //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <items> meaning required flag argument
    description: 'A list'
})
export class ListOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       return argValue.split(',');
   }
}

@CLIOption({
    shortFlag: 'o',            //this can be set to '-o' also
    fullFlag: 'optional',      //this can also be set to '--optional'
    flagArg: 'value',          //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: false,  //'false' equals [value] meaning optional flag argument
    description: 'An optional value'
})
export class OptionalOption{}

@CLIOption({
    shortFlag: 'r',           //this can be set to '-r' also
    fullFlag: 'range',        //this can also be set to '--range'
    flagArg: '<a>..<b>',      //must add this 'flagArg' field to receive the value for this option
    isFlagArgRequired: true,  //'true' equals <a>..<b> meaning required flag argument
    description: 'A range'
})
export class RangeOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
       return argValue.split('..').map(Number);
   }
}

@CLIOption({
    shortFlag: 'v',       //this can be set to '-v' also
    fullFlag: 'verbose',  //this can also be set to '--verbose'
    description: 'A value that can be increased',
    defaultValue: 10      //this value will be passed as 'argDefault' to the 'coercion' class function
})
export class VerboseOption{
    /*
        The coercion method is invoked when the option's value is being evaluated, giving you a chance to validate or do
        your own custom evaluation before the resulting value is referenced in a command's 'execute' or program's 'run' method

        argValue is the value passed in on the command line for the option
        argDefault is the optional defualt value you set in the option metadata's 'defaultValue' property

        Always return a value for coercion, it is the return value that gets passed to a command's 'execute' or program's 'run' method 
    */
   coercion(argValue: any, argDefault?: any) : any
   {
      return argDefault  + 1;
   }
}

```

```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

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

const app = CovenFactory.createCLI(Coercion);
app.run();


```

## Regular Expression
```js

import { CLIOption } from 'covenus-commander';

@CLIOption({
    shortFlag: 'd',           //this can be set to '-d' also
    fullFlag: 'drink',        //this can also be set to '--drink'
    flagArg: 'drink',         //must add 'flagArg' field when using 'flagArgValueRegExp' for regular expression validation
    flagArgValueRegExp: /^(coke|pepsi|isse)$/i,  //regular expression to match the argument against(always include 'flagArg')
    flagArgValueHintForRegExp: 'accepted values are coke, pepsi or isse', //this hint will be displayed when an invalid value is passed as an argument
    description: 'Drink'
})
export class DrinkOption{}

@CLIOption({
    shortFlag: 's',          //this can be set to '-s' also
    fullFlag: 'size',        //this can also be set to '--size'
    flagArg: 'size',         //must add 'flagArg' field when using 'flagArgValueRegExp' for regular expression validation
    flagArgValueRegExp: /^(large|medium|small)$/i,  //regular expression to match the argument against(always include 'flagArg')
    flagArgValueHintForRegExp: 'accepted values are large, medium or small',  //this hint will be displayed when an invalid value is passed as an argument
    description: 'Pizza size'
})
export class SizeOption{}
```

```js


#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

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

const app = CovenFactory.createCLI(RegularExpression);
app.run();

```

## Variadic arguments

Commands can be defined by their own `@CLICommand` decorator, that defines its own metadata argument to support the underlying [Commander](https://github.com/tj/commander.js) features. One of which is the last variadic argument support for a command.  Here is an example:

```js

import { CLICommand, VariadicArg, RequiredArg } from 'covenus-commander';


@CLICommand({
    verb: 'rmdir',               //this is the command verb that triggers this command from the cli
    requiredArgs: ['dir'],       //this equals <dir> meaning required flag argument
    variadicLastArg: 'otherDirs' //this equals [otherDirs...] meaning the last argument of the command is variadic
})
export class RMDirCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @VariadicArg parameter decorator to access the last variadic argument set in the 'variadicLastArg' metadata property

        By default, if a required argument is not passed in from the command-line, 
        the coven runtime will respond with a message demanding the argument be passed
        subsequently, so no need to test the 'dir' parameter if its set
        While, a variadic argument needs to be tested before use, if(otherDirs){}
    */
    execute(@RequiredArg('dir') dir, @VariadicArg('otherDirs') otherDirs){
        console.log('----- Variadic Argument Example -----');
        console.log(' ');
        console.log('rmdir %s', dir);
        if (otherDirs) {
            otherDirs.forEach(function (oDir) {
                console.log('rmdir %s', oDir);
            });
        }
    }
}

```

The `otherDirs` second parameter argument of the command class's `execute` method represents the variadic argument, and an `Array` is used for the value of a variadic argument. This is the parameter argument all the extra command-line arguments will be passed to.

```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    commands: [RMDirCommand], //your cli app command classes are listed under 'commands
    version: '0.1.0'          //your cli app version number will be displayed with help output
})
export class VariadicArgument{
}

const app = CovenFactory.createCLI(VariadicArgument);
app.run();

```

## Specify the argument syntax

The argument-based approach can also be defined by its own `@CLIArgument` decorator, that defines its own metadata to support the underlying [Commander](https://github.com/tj/commander.js) argument syntax feature.  Here is an example:

```js

import { CLIArgument, OptionalArg, RequiredArg } from 'covenus-commander';

@CLIArgument({
    requiredArgs: ['cmd'],   //this equals <cmd> meaning required flag argument
    optionalArgs: ['env']   //this equals [env] meaning optional flag argument
})
export class CMDArgument
{
    /*
        The execute method is invoked when the arguments matching this class are detected in the command line arguments parsed by the framework
        
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @OptionalArg parameter decorator to access optional arguments listed in 'optionalArgs' metadata property

        By default, if a required argument is not passed in from the command-line, 
        the coven runtime will respond with a message demanding the argument be passed
        subsequently, so no need to test the 'cmdValue' parameter if its set
        While, an optional argument needs to be tested before use, if(envValue){}
    */
    execute(@RequiredArg('cmd') cmdValue, @OptionalArg('env') envValue){
        console.log('----- Argument Syntax Example -----');
        console.log(' ');
        console.log('command:', cmdValue);
        console.log('environment:', envValue || "no environment given");
    }

     onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ run cmd env');
        output.writeLine('   $ run drop table');
    }
}

```
The required input arguments are the ones indicated within the `requiredArgs` metadata property of the `@CLIArgument`, while the optional input arguments are the ones indicated within the `optionalArgs` metadata property.

```js
#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    argument: CMDArgument,  //your cli app argument class that executes based on your command line required & optional arguments
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class ArgumentSyntax{
}


const app = CovenFactory.createCLI(ArgumentSyntax);
app.run();

```

 ## Git-style sub-commands

```js
// file: ./examples/pm

import { CLICommand } from 'covenus-commander';

@CLICommand({
    verb: 'install',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['name'],       //this equals [name] meaning optional flag argument
    verbDescription: 'install one or more packages', //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
    includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class InstallCommand{}

@CLICommand({
    verb: 'list',               //this is the command verb that triggers this command from the cli
    verbDescription: 'list packages installed', //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
    verbOption: { isDefault: true},  //verbOption can contain both 'isDefault' and 'noHelp', 'isDefault' makes it the default command if none is specified on the commandline, while 'noHelp' will remove it from the generated help output
})
export class ListCommand{}

@CLICommand({
    verb: 'search',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['query'],       //this equals [query] meaning optional flag argument
    verbDescription: 'search with optional query' //setting 'verbDescription' makes this command a git-style sub-command, so no 'execute' method will be run
})
export class SearchCommand{}

```

```js
#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    commands: [InstallCommand, SearchCommand, ListCommand],  //your cli app command classes are listed under 'commands
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class GitStyle{
}


const app = CovenFactory.createCLI(GitStyle);
app.run();

```

When a command class defined with `@CLICommand` is intended to be used as a sub-command, it must have its `verbDescription` metadata property defined. this indicates to the covenus-commander framework that this command does not intend to have an `execute` method invoked within it, but rather it should trigger the search for matching sub-command separate executables, much like `git(1)` and other popular tools. So no `execute` should be defined within the command class to handle its execution.  
Covenus-commander will fallback to [Commander](https://github.com/tj/commander.js), who will try to search the executables in the directory of the entry script (like `./examples/pm`) with the name `program-command`, like `pm-install`, `pm-search`.

Specifying `true` for the `isDefault` property on the `verbOption` metadata property will run the subcommand by default if no subcommand is specified as a command-line argument on the console.

If the command-line program is designed to be installed globally, make sure the executables have proper file-access modes, like `755`.

## Custom help

 You can display your own  arbitrary extra help information
 by implementing the `onExtraHelpInfo` method in your command-line program class. So in addition to the default help text generated for your program's options(`@CLIOption`), commands(`@CLICommand`) or argument(`@CLIArgument`) classes, you can include your own custom help text in the help output generated when
 `--help` is used on the console.

```js
import { CLIOption } from 'covenus-commander';

@CLIOption({
    shortFlag: 'b',   //this can be set to '-b' also
    fullFlag: 'bar',  //this can also be set to '--bar'
    description: 'enable some bar'
})
export class BarOption{}

@CLIOption({
    shortFlag: 'B',   //this can be set to '-B' also
    fullFlag: 'baz',  //this can also be set to '--baz'
    description: 'enable some baz'
})
export class BazOption{}

@CLIOption({
    shortFlag: 'f',   //this can be set to '-f' also
    fullFlag: 'foo',  //this can also be set to '--foo'
    description: 'enable some foo'
})
export class FooOption{}
```

```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    options: [FooOption, BarOption, BazOption],   //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
})
export class CustomHelp{
    /*
        adding the 'onExtraHelpInfo' function to your cli program class allows you
        to output additional help info alongside the the generated help output when your
        app is called with '-h' or '--help' flag
    */
    onExtraHelpInfo(output){
        output.writeLine('');
        output.writeLine('');
        output.writeLine('----- Custom Help Example -----');
        output.writeLine('');
        output.writeLine('    $ custom-help --help');
        output.writeLine('    $ custom-help -h');
        output.writeLine('');
    }
}


const app = CovenFactory.createCLI(CustomHelp);
app.run();

```

Yields the following help output when `node script-name.js -h` or `node script-name.js --help` are run:

```

Usage: custom-help [options]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -f, --foo      enable some foo
  -b, --bar      enable some bar
  -B, --baz      enable some baz

----- Custom Help Example -----

  $ custom-help --help
  $ custom-help -h

```
## .displayHelp(method)

To output the application's help information without explicitly passing the `--help` flag on the command-line. The implictly defined `displayHelp()` method of your `@CLIProgram` decorated program class can be invoked to output your program's help information. Also, there is an optional method `onCustomizeHelpBeforeDisplay(helpText)` you can implement within your program class to allow post-processing of help text before it is displayed.

If you want your program to display it's help information by default (e.g. if no command or arguments are supplied on the command-line), you just include the `showHelpByDefault: true` metadata property in your program class `@CLIProgram` decorator's supplied metadata object:

```js

import { CLIOption } from 'covenus-commander';

@CLIOption({
    shortFlag: 'm',         //this can be set to '-m' also
    fullFlag: 'message',  //this can also be set to '--message'
    description: 'message to display as help'
})
export class MessageOption{}

```

```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    options: [MessageOption],  //your cli app option classes that modify the behaviour of your app commands or argument
    version: '0.1.0'   //your cli app version number will be displayed with help output
    //showHelpByDefault: true //your cli app will always first output its help info by default when it launches regardless of whatever command or argument is actually invoked
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


const app = CovenFactory.createCLI(OutputHelp);
app.run();


```

## Examples

```js
import { CLIOption, CLICommand } from 'covenus-commander';

@CLIOption({
    shortFlag: 'C',           //this can be set to '-C' also
    fullFlag: 'chdir',   //this can also be set to '--chdir'
    flagArg: 'path',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <path>, not optional
    description: 'change the working directory',  //the description that is output as its generated help info
})
export class ChDirOption{}

@CLIOption({
    shortFlag: 'c',           //this can be set to '-c' also
    fullFlag: 'config',   //this can also be set to '--config'
    flagArg: 'path',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <path>, not optional
    description: 'set config path. defaults to ./deploy.conf',  //the description that is output as its generated help info
})
export class ConfigOption{}

@CLIOption({
    shortFlag: 'e',           //this can be set to '-e' also
    fullFlag: 'exec_mode',   //this can also be set to '--exec_mode'
    flagArg: 'mode',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: true, //the flag argument is required <mode>, not optional
    description: 'Which exec mode to use',  //the description that is output as its generated help info
})
export class ExecModeOption{}

@CLIOption({
    shortFlag: 's',           //this can be set to '-s' also
    fullFlag: 'setup_mode',   //this can also be set to '--setup_mode'
    flagArg: 'mode',          //this signifies this option is more than a flag, there is an argument needed for it
    isFlagArgRequired: false, //the flag argument is optional [mode], not required
    description: 'Which setup mode to use',  //the description that is output as its generated help info
    defaultValue: 'normal'    //if you want to have a default value, incase no argument is passed in for the option
})
export class SetupModeOption{}

@CLIOption({
    shortFlag: 'T',           //this can be set to '-T' also
    fullFlag: 'no-tests',   //this can also be set to '--no-tests'
    description: 'ignore test hook',  //the description that is output as its generated help info
})
export class NoTestsOption{}

@CLICommand({
    verb: 'setup',               //this is the command verb that triggers this command from the cli
    optionalArgs: ['env'],       //this equals [env] meaning optional flag argument
    commandDescription: 'run setup commands for all envs',  //this sets the command's help description text
    options: [SetupModeOption],   //your command option classes that modify the command
    //includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class SetupCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @OptionalArg parameter decorator to access optional arguments listed in 'optionalArgs' metadata property
        use @CommandOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your command class, in this case its the 'setup_mode' defined above
        use @ProgramOptionArg parameter decorator to access the value of the options set in the 'options' metadata property of your program class, in this case its the 'config' set in the program class of this command

    */
    execute(@OptionalArg('env') env, @CommandOptionArg('setup_mode') mode, @ProgramOptionArg('config') config){
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode and config %s', env, mode, config);
    }

    onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy setup normal');
        output.writeLine('   $ deploy setup priviledged');
    }
}

@CLICommand({
    verb: 'exec',               //this is the command verb that triggers this command from the cli
    requiredArgs: ['cmd'],       //this equals <cmd> meaning required flag argument
    commandDescription: 'execute the given remote cmd',  //this sets the command's help description text
    options: [ExecModeOption],   //your command option classes that modify the command
    alias: 'ex',                  //an alias can be used to trigger the command along with its verb
    //includeInHelpByDefault: false //this command's options details will not be displayed with default generated help text
})
export class ExecCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
        use @RequiredArg parameter decorator to access required arguments listed in 'requiredArgs' metadata property
        use @CommandOptionArg parameter decorator to access the value of the options set in the 'options' metadata property
        
    */
    execute(@RequiredArg('cmd') cmd, @CommandOptionArg('exec_mode') mode){

        console.log('exec "%s" using %s mode', cmd, mode);
    }

    onHelp(output){
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy exec sequential');
        output.writeLine('   $ deploy exec async');
        output.writeLine('');
    }
}

@CLICommand({
    verb: '*',   //this wildcard command verb is the default command executed when unknown command verbs are passed in but the framework handles unknown commands for you, reporting them as such by default when encountered
})
export class DefaultCommand{
    /*
        The execute method is invoked when the command verb is detected in the command line arguments parsed by the framework
    */
    execute(){
        console.log('deploying with default configuration');
    }
}


```
```js

#!/usr/bin/env node

import { CLIProgram, CovenFactory } from 'covenus-commander';

@CLIProgram({
    options: [ChDirOption, ConfigOption, NoTestsOption],
    commands: [SetupCommand, ExecCommand, DefaultCommand], //your cli app command classes are listed under 'commands
    version: '0.1.0'          //your cli app version number will be displayed with help output
})
export class Example{
     /*
        adding the 'onExtraHelpInfo' function to your cli program class allows you
        to output additional help info alongside the the generated help output when your
        app is called with '-h' or '--help' flag
    */
    onExtraHelpInfo(output){
        output.writeLine('');
        output.writeLine('');
    }
}


const app = CovenFactory.createCLI(Example);
app.run();


```

## Dependency Injection

Covenus-commander ships with its own dependency injection system to facilitate the building of self-contained and self-managed command-line applications. It adds the notion of component classes that are defined and then associated with your command-line program through its `@CLIProgram` decorator. Then instances of these components can be automatically injected into the program's command(`@CLICommand`), argument(`@CLIArgument`) and option(`@CLIOption`) class constructors by the covenus-commander's DI framework. 

## Custom Components

To add a component to your command-line program(`@CLIProgram`), first define the component class with a component decorator of its own:

```js

@Component()
export class UserService{
    ...
}

```
Then associate the component's class with your program's decorator through its `components` metadata property.

```js
@CLIProgram({
    options: [...],
    commands: [...],
    version: '...',
    components: [UserService]   //your cli app components used by your commands, arguments or options must be listed here, so they can be resolved and injected
    
})
export class UsersProgram{}
```

And like [Angular](https://github.com/angular/angular) and [Nest](https://github.com/kamilmysliwiec/nest), you can also inject your components using other mechanisms.Such as:

## By Value:
Sometimes what component you have to inject isn't class-based, simply just a javascript value or object type. In such cases you can use:

```js
const val = {}

@CLIProgram({
    options: [...],
    commands: [...],
    version: '...',
    components: [{provide: 'UserService', useValue: val}]
})

```
Now the DI framework will associate the `val` object with the string-based metatype `'UserService'`. This is also useful when you need test doubles(unit testing). E.g when your class-based metatype isn't ready, you can use a value based metatype instead then substitute it out once ready.

## By Class:
Sometimes when using a class-based metatype for your component you may want to use a derived sub-class or a class with a different implentation of the original class type used as the component's metatype

```js
@Component()
class CustomUserService{}

@CLIProgram({
    options: [...],
    commands: [...],
    version: '...',
    components: [{provide: UserService, useClass: CustomUserService}]
})

```

## By Factory:
Sometimes when you want to use a component that depends on some other component or package or asyncronously retrieved value(`Observable` or `Promise`) itself during its instantiation, you will use the factory method to associate it with your program

```js
@Component()
class GroupService{}


@CLIProgram({
    options: [...],
    commands: [...],
    version: '...',
    components: [{provide: UserService, 
    useFactory: (groupService) => {
        return groupService.getUserServiceByGroup('admin');},
    inject: [ GroupService ]}]
})

```
When using factory-based method, to use a fellow component as one of its dependencies you must include that component used in the `inject` property of its metadata, so the DI framework knows to inject it into your factory callback.

## By Custom Providers:
Sometimes you want to inject a custom value(or even class or factory based) into a component, command, argument, or option by yourself. In such cases, you'll use a custom provider.

```js
@CLIProgram({
    options: [...],
    commands: [...],
    version: '...',
    components: [{provide: 'isLinuxEnvironment', useValue: false}]
})

```
Now to inject this component defined with this custom provider metatype key `isLinuxEnvironment`, just use the `@Inject` parameter decorator in the component, command, argument or option's class constructor.

```js

import { Inject } from 'covenus-commander';

@Component()
class EnvironmentService{
    constructor(@Inject('isLinuxEnvironment') isLinuxEnvironment: boolean)
    {
        console.log(isLinuxEnvironment);
    }
    
}

```

More Demos can be found in the [tests](https://github.com/deji-adesugba/covenus-commander/tree/master/src/tests) directory.

## License

MIT

