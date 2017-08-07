"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const bomb_command_1 = require("./commands/bomb-squad/bomb.command");
const bomb_type_option_1 = require("./options/bomb-squad/bomb-type.option");
const common_2 = require("../../common");
const global_trap_1 = require("./traps/global/global.trap");
let BombSquad = class BombSquad {
};
BombSquad = __decorate([
    common_1.CLIProgram({
        options: [bomb_type_option_1.BombTypeOption],
        commands: [bomb_command_1.BombCommand],
        version: '0.1.0'
    }),
    common_2.UseTraps(global_trap_1.GlobalTrap)
], BombSquad);
exports.BombSquad = BombSquad;
//# sourceMappingURL=bomb-squad.test.js.map