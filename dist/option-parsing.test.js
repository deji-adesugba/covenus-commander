"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const option_parsing_1 = require("./options/option-parsing");
let OptionParsing = class OptionParsing {
    run(options) {
        console.log('----- Option Parsing Example -----');
        console.log(' ');
        if (options.peppers) {
            console.log(` - ${options.peppers} pepper`);
        }
        if (options.pineapple) {
            console.log(` - ${options.pineapple} pineapple`);
        }
        if (options.bbqSauce) {
            console.log(` - ${options.bbqSauce} bbq-sauce`);
        }
        if (options.cheese) {
            console.log(` - ${options.cheese} cheese`);
        }
    }
};
OptionParsing = __decorate([
    common_1.CLIProgram({
        options: [option_parsing_1.PeppersOption, option_parsing_1.PineappleOption, option_parsing_1.BBQSauceOption, option_parsing_1.CheeseOption],
        version: '0.1.0'
    })
], OptionParsing);
exports.OptionParsing = OptionParsing;
//# sourceMappingURL=option-parsing.test.js.map