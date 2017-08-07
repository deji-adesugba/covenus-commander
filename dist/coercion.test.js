"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const coercion_1 = require("./options/coercion");
let Coercion = class Coercion {
    run(options) {
        console.log('----- Coercion Example -----');
        console.log(' ');
        console.log(' int: %j', options.integer);
        console.log(' float: %j', options.float);
        console.log(' optional: %j', options.optional);
        options.range = options.range || [];
        console.log(' range: %j..%j', options.range[0], options.range[1]);
        console.log(' list: %j', options.list);
        console.log(' collect: %j', options.collect);
        console.log(' verbosity: %j', options.verbose);
        console.log(' args: %j', options.args);
    }
};
Coercion = __decorate([
    common_1.CLIProgram({
        options: [coercion_1.IntegerOption, coercion_1.FloatOption, coercion_1.RangeOption, coercion_1.ListOption,
            coercion_1.OptionalOption, coercion_1.VerboseOption, coercion_1.CollectOption],
        version: '0.1.0',
        usage: '[options] <file ...>'
    })
], Coercion);
exports.Coercion = Coercion;
//# sourceMappingURL=coercion.test.js.map