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
const setup_mode_option_1 = require("../../options/example/setup-mode.option");
let SetupCommand = class SetupCommand {
    execute(env, mode, config) {
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode and config %s', env, mode, config);
    }
    onHelp(output) {
        output.writeLine(' Examples:');
        output.writeLine('');
        output.writeLine('   $ deploy setup normal');
        output.writeLine('   $ deploy setup priviledged');
    }
};
__decorate([
    __param(0, common_1.OptionalArg('env')), __param(1, common_1.CommandOptionArg('setup_mode')), __param(2, common_1.ProgramOptionArg('config')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SetupCommand.prototype, "execute", null);
SetupCommand = __decorate([
    common_1.CLICommand({
        verb: 'setup',
        optionalArgs: ['env'],
        commandDescription: 'run setup commands for all envs',
        options: [setup_mode_option_1.SetupModeOption],
    })
], SetupCommand);
exports.SetupCommand = SetupCommand;
//# sourceMappingURL=setup.command.js.map