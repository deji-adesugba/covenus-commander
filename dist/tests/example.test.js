"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const example_1 = require("./commands/example");
const example_2 = require("./options/example");
let Example = class Example {
    onExtraHelpInfo(output) {
        output.writeLine('');
        output.writeLine('');
    }
};
Example = __decorate([
    common_1.CLIProgram({
        options: [example_2.ChDirOption, example_2.ConfigOption, example_2.NoTestsOption],
        commands: [example_1.SetupCommand, example_1.ExecCommand, example_1.DefaultCommand],
        version: '0.1.0'
    })
], Example);
exports.Example = Example;
//# sourceMappingURL=example.test.js.map