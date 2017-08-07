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
let UserService = class UserService {
    constructor() {
        this.users = [
            { id: 1, name: "Jason Bourne" },
            { id: 2, name: "Jack Sparrow" },
            { id: 3, name: "John Smith" },
        ];
    }
    getAllUsers() {
        return Promise.resolve(this.users);
    }
    getUser(id) {
        const user = this.users.find((user) => user.id == +id);
        if (!user) {
            throw new exceptions_1.UserNotFoundException();
        }
        return Promise.resolve(user);
    }
    addUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
};
UserService = __decorate([
    common_1.Component()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user-service.component.js.map