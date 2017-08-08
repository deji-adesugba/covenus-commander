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