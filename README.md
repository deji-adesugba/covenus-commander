# covenus-commander
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