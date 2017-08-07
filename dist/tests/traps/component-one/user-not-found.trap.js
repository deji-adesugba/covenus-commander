"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const common_1 = require("../../../../common");
let UserTrap = class UserTrap {
    trap(exception, output) {
        if (exception instanceof exceptions_1.UserNotFoundException) {
            output.writeLine('User not found in user directory');
        }
    }
};
UserTrap = __decorate([
    common_1.Trap(exceptions_1.UserNotFoundException)
], UserTrap);
exports.UserTrap = UserTrap;
//# sourceMappingURL=user-not-found.trap.js.map