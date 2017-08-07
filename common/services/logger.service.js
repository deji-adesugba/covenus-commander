"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const CovenEnvironment = require("../enums/coven-environment.enum").CovenEnvironment;
const ColorForLogMessage = require("../enums/logger-messagecolor.enum").ColorForLogMessage;

const clc = require("cli-color");

class Logger {
    constructor(context) {
        this.context = context;
        this.warningColor = clc.yellow;
        this.errorColor = clc.red.bold;
        this.noticeColor = clc.green;
    }
    static setMode(mode) {
        this.mode = mode;
    }
    log(message) {
        this.logMessage(message, this.noticeColor);
    }
    error(message, trace = '') {
        this.logMessage(message, this.errorColor);
        if(trace)
            this.printStackTrace(trace);
    }
    warn(message) {
        this.logMessage(message, this.warningColor);
    }
    logMessage(message, color) {

        if (Logger.mode === CovenEnvironment.TEST || Logger.mode === CovenEnvironment.PRODUCTION)
            return;

        process.stdout.write(color(`[Coven] ${process.pid}   - `));
        process.stdout.write(`${new Date(Date.now()).toLocaleString()}   `);
        process.stdout.write(this.warningColor(`[${this.context}] `));
        process.stdout.write(color(message));
        process.stdout.write(`\n`);
    }
    printStackTrace(trace) {
        if (Logger.mode === CovenEnvironment.TEST || Logger.mode === CovenEnvironment.PRODUCTION)
            return;

        process.stdout.write(trace);
        process.stdout.write(`\n`);
    }
}
Logger.mode = CovenEnvironment.PRODUCTION;
exports.Logger = Logger;
