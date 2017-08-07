"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const custom_help_1 = require("./options/custom-help");
let CustomHelp = class CustomHelp {
    onExtraHelpInfo(output) {
        output.writeLine('');
        output.writeLine('');
        output.writeLine('----- Custom Help Example -----');
        output.writeLine('');
        output.writeLine('    $ custom-help --help');
        output.writeLine('    $ custom-help -h');
        output.writeLine('');
    }
};
CustomHelp = __decorate([
    common_1.CLIProgram({
        options: [custom_help_1.FooOption, custom_help_1.BarOption, custom_help_1.BazOption],
        version: '0.1.0'
    })
], CustomHelp);
exports.CustomHelp = CustomHelp;
//# sourceMappingURL=custom-help.test.js.map