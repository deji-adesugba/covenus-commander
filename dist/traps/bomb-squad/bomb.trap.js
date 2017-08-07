"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../common");
const exceptions_1 = require("../exceptions");
let BombCommandTrap = class BombCommandTrap {
    trap(exception, output) {
        if (exception instanceof exceptions_1.BombNotFoundException) {
            output.writeLine('A bomb of that type was not found on site');
        }
        if (exception instanceof exceptions_1.DudBombException) {
            output.writeLine('The bomb found on site was already difused');
        }
    }
};
BombCommandTrap = __decorate([
    common_1.Trap(exceptions_1.BombNotFoundException, exceptions_1.DudBombException)
], BombCommandTrap);
exports.BombCommandTrap = BombCommandTrap;
let BombOptionTrap = class BombOptionTrap {
    trap(exception, output) {
        if (exception instanceof exceptions_1.BombOptionNotFoundException) {
            output.writeLine('The bomb option supplied is not available in stock');
        }
    }
};
BombOptionTrap = __decorate([
    common_1.Trap(exceptions_1.BombOptionNotFoundException)
], BombOptionTrap);
exports.BombOptionTrap = BombOptionTrap;
//# sourceMappingURL=bomb.trap.js.map