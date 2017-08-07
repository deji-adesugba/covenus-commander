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
exports.BombNotFoundException = exceptions_1.BombNotFoundException;
exports.DudBombException = exceptions_1.DudBombException;
exports.BombOptionNotFoundException = exceptions_1.BombOptionNotFoundException;
let GlobalTrap = class GlobalTrap {
    trap(exception, output) {
        if (exception instanceof exceptions_1.BombNotFoundException) {
            output.writeLine('bomb also not found by global squad');
        }
        if (exception instanceof exceptions_1.BombOptionNotFoundException) {
            output.writeLine("option couldn't be located by global squad");
        }
        if (exception instanceof exceptions_1.DudBombException) {
            output.writeLine('The bomb found on site was difused by global squad');
        }
        output.writeLine(`error: ${exception}`);
    }
};
GlobalTrap = __decorate([
    common_1.Trap(exceptions_1.BombNotFoundException, exceptions_1.DudBombException, exceptions_1.BombOptionNotFoundException)
], GlobalTrap);
exports.GlobalTrap = GlobalTrap;
//# sourceMappingURL=global.trap.js.map