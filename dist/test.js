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
const common_1 = require("../common");
const core_1 = require("../core");
const common_2 = require("../common");
const core_2 = require("../core");
const common_3 = require("../common");
common_2.Logger.setMode(common_2.CovenEnvironment.DEVELOPMENT);
let PepperOption = class PepperOption {
};
PepperOption = __decorate([
    common_1.CLIOption({
        shortFlag: 'p',
        fullFlag: 'peppers',
        flagArg: 'amount',
        isFlagArgRequired: true,
        flagArgValueRegExp: /^(small|moderate|plenty)$/i,
        flagArgValueHintForRegExp: 'accepted values are small, moderate or plenty',
        description: 'Amount of peppers to add to your order("small" | "moderate" | "plenty")',
    })
], PepperOption);
exports.PepperOption = PepperOption;
let BBQSauceOption = class BBQSauceOption {
    coercion(argValue, argDefault) {
        if (argValue) {
            return argValue;
        }
        else {
            if (argDefault) {
                return argDefault;
            }
        }
        throw new core_2.CLIException("peppers option is not set to a valid value");
    }
};
BBQSauceOption = __decorate([
    common_1.CLIOption({
        shortFlag: 'b',
        fullFlag: 'bbq-sauce',
        flagArg: 'amount',
        isFlagArgRequired: false,
        description: 'Amount of barbeque sauce to add to your order("drizzle" | "moderate" | "plenty")',
        defaultValue: 'drizzle'
    })
], BBQSauceOption);
exports.BBQSauceOption = BBQSauceOption;
let OrderArguments = class OrderArguments {
    execute(condiments, olives, pepperoni, bbqSauce, peppers) {
        if (peppers) {
            console.log(`${peppers} amount of peppers`);
        }
        else {
            console.log('no peppers specified');
        }
        if (olives) {
            console.log(`${olives} amount of olives`);
        }
        else {
            console.log('no olives specified');
        }
        if (pepperoni) {
            console.log(`${pepperoni} of pepperoni`);
        }
        else {
            console.log('no pepperoni specified');
        }
        if (bbqSauce) {
            console.log(`${bbqSauce} amount of bbqSauce`);
        }
        else {
            console.log('no bbqSauce specified');
        }
        if (condiments) {
            condiments.forEach((condiment) => {
                console.log(`condiment :- ${condiment}`);
            });
        }
        else {
            console.log('no condiments specified');
        }
    }
};
__decorate([
    __param(0, common_3.VariadicArg('condiments')), __param(1, common_3.OptionalArg('olives')), __param(2, common_3.RequiredArg('pepperoni')),
    __param(3, common_3.OptionalArg('bbqSauce')), __param(4, common_3.RequiredArg('peppers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], OrderArguments.prototype, "execute", null);
OrderArguments = __decorate([
    common_1.CLIArgument({
        requiredArgs: ['peppers', 'pepperoni'],
        variadicLastArg: 'condiments'
    })
], OrderArguments);
exports.OrderArguments = OrderArguments;
let PizzaCommand = class PizzaCommand {
    execute(condiments, drink, pepperoni, crust, size, peppers, bbqSauce) {
        if (peppers) {
            console.log(`${peppers} amount of peppers on pizza`);
        }
        else {
            console.log('no peppers specified');
        }
        if (size) {
            console.log(`${size} size of pizza`);
        }
        else {
            console.log('no size specified');
        }
        if (crust) {
            console.log(`${crust} crust of pizza`);
        }
        else {
            console.log('no crust specified');
        }
        if (drink) {
            console.log(`bottle of ${drink} to go with the pizza`);
        }
        else {
            console.log('no drink specified');
        }
        if (pepperoni) {
            console.log(`${pepperoni} of pepperoni on pizza`);
        }
        else {
            console.log('no pepperoni specified');
        }
        if (bbqSauce) {
            console.log(`${bbqSauce} amount of bbqSauce`);
        }
        else {
            console.log('no bbqSauce specified');
        }
        if (condiments) {
            condiments.forEach((condiment) => {
                console.log(`condiment :- ${condiment}`);
            });
        }
        else {
            console.log('no condiments specified');
        }
    }
};
__decorate([
    __param(0, common_3.VariadicArg('condiments')), __param(1, common_3.OptionalArg('drink')), __param(2, common_3.RequiredArg('pepperoni')),
    __param(3, common_3.RequiredArg('crust')), __param(4, common_3.RequiredArg('size')), __param(5, common_3.CommandOptionArg('peppers')),
    __param(6, common_3.CommandOptionArg('bbqSauce')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PizzaCommand.prototype, "execute", null);
PizzaCommand = __decorate([
    common_1.CLICommand({
        verb: 'pizza',
        commandDescription: 'command for ordering pizza',
        options: [PepperOption, BBQSauceOption],
        requiredArgs: ['size', 'crust'],
        optionalArgs: ['drink'],
        alias: 'piz'
    })
], PizzaCommand);
exports.PizzaCommand = PizzaCommand;
let DefaultCommand = class DefaultCommand {
    execute(name, category) {
        console.log('entered execute() of default command');
        if (category) {
            console.log(`category is ${category}`);
        }
        else {
            console.log('no category specified');
        }
        if (name) {
            console.log(`name of customer is ${name}`);
        }
        else {
            console.log('no customer specified');
        }
    }
};
__decorate([
    __param(0, common_3.OptionalArg('name')), __param(1, common_3.RequiredArg('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultCommand.prototype, "execute", null);
DefaultCommand = __decorate([
    common_1.CLICommand({
        verb: 'bread',
        commandDescription: 'default command for the pizzerria',
        requiredArgs: ['category'],
        optionalArgs: ['name'],
    })
], DefaultCommand);
exports.DefaultCommand = DefaultCommand;
let OrderProgram = OrderProgram_1 = class OrderProgram {
    constructor() {
        this.logger = new common_2.Logger(OrderProgram_1.name);
    }
    onInit() {
        this.logger.log('onInit called');
    }
    configure(program) {
        this.logger.log('configure called');
        return program;
    }
    ;
    extraHelpInfo() {
        console.log(" ");
        console.log("  Examples:");
        console.log(" ");
        console.log(" ");
        console.log("  $ -p moderate -b drizzle -> for moderate peppers with a drizzle of bbqSauce dressing");
        console.log("  $ -b plenty -> for just plenty bbqSauce dressing");
        console.log(" ");
        console.log(" ");
    }
    run(options) {
        this.logger.log('run called');
        if (options.peppers) {
            console.log(`${options.peppers} amount of peppers`);
        }
        if (options.bbqSauce) {
            console.log(`${options.bbqSauce} amount of bbqSauce`);
        }
    }
};
OrderProgram = OrderProgram_1 = __decorate([
    common_1.CLIProgram({
        commands: [PizzaCommand, DefaultCommand],
        version: '1.0.0',
        showHelpByDefault: false
    }),
    __metadata("design:paramtypes", [])
], OrderProgram);
exports.OrderProgram = OrderProgram;
const app = core_1.CovenFactory.createCLI(OrderProgram);
app.run(() => console.log("The pizza order program is running"));
var OrderProgram_1;
//# sourceMappingURL=test.js.map