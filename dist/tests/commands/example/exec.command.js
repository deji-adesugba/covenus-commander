"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../common");
const exec_mode_option_1 = require("../../options/example/exec-mode.option");
let ExecCommand = class ExecCommand {
    execute(cmd, mode) {
        console.log('exec "%s" using %s mode', cmd, mode);
    }
    onHelp(output) {
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy exec sequential');
        output.writeLine('   $ deploy exec async');
        output.writeLine('');
    }
};
__decorate([
    __param(0, common_1.RequiredArg('cmd')), __param(1, common_1.CommandOptionArg('exec_mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExecCommand.prototype, "execute", null);
ExecCommand = __decorate([
    common_1.CLICommand({
        verb: 'exec',
        requiredArgs: ['cmd'],
        commandDescription: 'execute the given remote cmd',
        options: [exec_mode_option_1.ExecModeOption],
        alias: 'ex',
    })
], ExecCommand);
exports.ExecCommand = ExecCommand;
//# sourceMappingURL=exec.command.js.map