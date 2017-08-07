"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../common");
const exceptions_1 = require("../../traps/exceptions");
let CustomUserService = class CustomUserService {
    getAllUsers() {
        return Promise.resolve([]);
    }
    getUser(id) {
        if (id == 'XXX') {
            return Promise.resolve({ id: 99, name: "Super User - Vin Diesel" });
        }
        throw new exceptions_1.UserNotFoundException();
    }
    addUser(user) {
        return Promise.resolve();
    }
};
CustomUserService = __decorate([
    common_1.Component()
], CustomUserService);
exports.CustomUserService = CustomUserService;
//# sourceMappingURL=custom-user-service.component.js.map