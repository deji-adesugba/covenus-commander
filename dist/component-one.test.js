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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const get_user_command_1 = require("./commands/component-one/get-user.command");
const user_id_option_1 = require("./options/component-one/user-id.option");
const exceptions_1 = require("./traps/exceptions");
const users = [{ id: 1, name: "User X" }];
const val = {
    getAllUsers: () => { return Promise.resolve(users); },
    getUser: (id) => {
        if (+id == 1) {
            return Promise.resolve(users[0]);
        }
        throw new exceptions_1.UserNotFoundException();
    },
    addUser: (user) => { users.push(user); return Promise.resolve(); }
};
let ComponentOne = class ComponentOne {
    constructor() {
    }
};
ComponentOne = __decorate([
    common_1.CLIProgram({
        options: [user_id_option_1.UserIdOption],
        commands: [get_user_command_1.GetUserCommand],
        components: [{ provide: 'user', useValue: val }],
        version: '0.1.0'
    }),
    __metadata("design:paramtypes", [])
], ComponentOne);
exports.ComponentOne = ComponentOne;
//# sourceMappingURL=component-one.test.js.map