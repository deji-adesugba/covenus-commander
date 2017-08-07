"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const regexp_1 = require("./options/regexp");
let RegularExpression = class RegularExpression {
    run(options) {
        console.log('----- RegExp Example -----');
        console.log(' ');
        console.log(' size: %j', options.size);
        console.log(' drink: %j', options.drink);
    }
};
RegularExpression = __decorate([
    common_1.CLIProgram({
        options: [regexp_1.DrinkOption, regexp_1.SizeOption],
        version: '0.1.0'
    })
], RegularExpression);
exports.RegularExpression = RegularExpression;
//# sourceMappingURL=regexp.test.js.map