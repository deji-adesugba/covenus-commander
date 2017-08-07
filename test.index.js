#!/usr/bin/env node

const OptionParsing = require('./dist/tests/option-parsing.test').OptionParsing;
const Coercion = require('./dist/tests/coercion.test').Coercion;
const RegularExpression = require('./dist/tests/regexp.test').RegularExpression;
const VariadicArgument = require('./dist/tests/variadic-argument.test').VariadicArgument;
const ArgumentSyntax = require('./dist/tests/argument-syntax.test').ArgumentSyntax;
const GitStyle = require('./dist/tests/git-style.test').GitStyle;
const CustomHelp = require('./dist/tests/custom-help.test').CustomHelp;
const OutputHelp = require('./dist/tests/output-help.test').OutputHelp;
const Example = require('./dist/tests/example.test').Example;
const BombSquad = require('./dist/tests/bomb-squad.test').BombSquad;
const ComponentOne = require('./dist/tests/component-one.test').ComponentOne;

const CovenFactory = require('./core/index').CovenFactory;

/*
To see the call stack trace details of runtime exceptions that occur
uncomment the switch to development mode call
*/
CovenFactory.switchToDevelopmentMode();

/*
    The launch directive for the different test examples are listed below.
    Copy out of this comment block to run any of the examples

    const app = CovenFactory.createCLI(OptionParsing);
    const app = CovenFactory.createCLI(Coercion);
    const app = CovenFactory.createCLI(RegularExpression);
    const app = CovenFactory.createCLI(VariadicArgument);
    const app = CovenFactory.createCLI(ArgumentSyntax);
    const app = CovenFactory.createCLI(GitStyle);
    const app = CovenFactory.createCLI(CustomHelp);
    const app = CovenFactory.createCLI(OutputHelp);
    const app = CovenFactory.createCLI(Example);
    const app = CovenFactory.createCLI(BombSquad);
    const app = CovenFactory.createCLI(ComponentOne);
*/

const app = CovenFactory.createCLI(ComponentOne);
app.run();

