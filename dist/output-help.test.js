"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const message_option_1 = require("./options/output-help/message.option");
let OutputHelp = class OutputHelp {
    run(options) {
        console.log('----- Output Help Example -----');
        console.log(' ');
        if (options.message) {
            this.displayHelp();
        }
        else {
            console.log(' No message passed in');
        }
    }
    onCustomizeHelpBeforeDisplay(helpText) {
        var myCustomMessage = "\n  My Custom Message  \n\n\n";
        return helpText.concat(myCustomMessage);
    }
};
OutputHelp = __decorate([
    common_1.CLIProgram({
        options: [message_option_1.MessageOption],
        version: '0.1.0'
    })
], OutputHelp);
exports.OutputHelp = OutputHelp;
//# sourceMappingURL=output-help.test.js.map