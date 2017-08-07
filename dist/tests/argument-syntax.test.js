"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const cmd_argument_1 = require("./arguments/argument-syntax/cmd.argument");
let ArgumentSyntax = class ArgumentSyntax {
};
ArgumentSyntax = __decorate([
    common_1.CLIProgram({
        argument: cmd_argument_1.CMDArgument,
        version: '0.1.0'
    })
], ArgumentSyntax);
exports.ArgumentSyntax = ArgumentSyntax;
//# sourceMappingURL=argument-syntax.test.js.map