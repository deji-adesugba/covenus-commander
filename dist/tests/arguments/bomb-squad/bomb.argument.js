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
const bomb_trap_1 = require("../../traps/bomb-squad/bomb.trap");
let BombArgument = class BombArgument {
    execute(bombType) {
        bombType = bombType;
        if (bombType == 'c4' || bombType == 'hydrogen') {
            throw new bomb_trap_1.DudBomdException();
        }
        else {
            throw new bomb_trap_1.BombNotFoundException();
        }
    }
};
__decorate([
    __param(0, common_1.RequiredArg('bomb-type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BombArgument.prototype, "execute", null);
BombArgument = __decorate([
    common_1.CLIArgument({
        requiredArgs: ['bomb-type'],
    }),
    common_1.UseTraps(bomb_trap_1.BombTrap)
], BombArgument);
exports.BombArgument = BombArgument;
//# sourceMappingURL=bomb.argument.js.map