"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleMessageException = require("../errors/exceptions/console-message.exception").ConsoleMessageException
const type_check = require("../../common/utils/type-check.utils");
const error_messages = require("../errors/messages");
const CommanderOutputWriter = require("./commander-output-writer").CommanderOutputWriter;

class CommanderProxy {

    constructor(){
        this.outputWriter = new CommanderOutputWriter();
    }
    createCommandProxy(targetCallback, exceptionsHandler) {
        return (requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions) => {
            try {
                Promise.resolve(targetCallback(requiredArgs, optionalArgs, variadicArg, cmdOptions, prgOptions))
                    .catch((e) => {
                    exceptionsHandler.next(e, this.outputWriter);
                    this.outputWriter.flushOutputToConsole();
                });
            }
            catch (e) {
                exceptionsHandler.next(e, this.outputWriter);
                this.outputWriter.flushOutputToConsole();
            }
        };
    }

    createArgumentProxy(targetCallback, exceptionsHandler) {
        return (requiredArgs, optionalArgs, variadicArg) => {
            try {
                Promise.resolve(targetCallback(requiredArgs, optionalArgs, variadicArg))
                    .catch((e) => {
                    exceptionsHandler.next(e, this.outputWriter);
                    this.outputWriter.flushOutputToConsole();
                });
            }
            catch (e) {
                exceptionsHandler.next(e, this.outputWriter);
                this.outputWriter.flushOutputToConsole();
            }
        };
    }

    createOptionProxy(targetCallback, exceptionsHandler) {
        return (optionValue, optionDefault) => {
            try {
                return targetCallback(optionValue, optionDefault);
            }
            catch (e) {
                exceptionsHandler.next(e, this.outputWriter);
                this.outputWriter.flushOutputToConsole();
            }
        };
    }

    

    runPreExecuteOptionsProxy(optionBag, programInstance, optionProperties = null)
    {
        if(!optionProperties){
            optionProperties = programInstance.getReflectedOptionProperties(programInstance.metatype);
        }
        if(optionProperties && Array.isArray(optionProperties)){
            optionProperties.forEach((optProp) => {
                
                if(optProp.flagArgValueRegExp)
                {
                    var opt = optionBag[optProp.fullFlagCamelCased];
                    var hint = optProp.flagArgValueHintForRegExp || 'enter an accepted value for this option';
                    if(opt)
                    {
                        if(!type_check.isString(opt))
                        {
                            throw new ConsoleMessageException(error_messages.REGEX_OPTION_INVALID(`${optProp.shortFlag}, ${optProp.fullFlag} ${optProp.flagArg}`, hint));
                        }
                    }
                }
            });
        }
    }

    runPreExecuteCommandOptionsProxy(program, options, optionsBag)
    {
        this.runPreExecuteOptionsProxy(optionsBag, program, options);
    }
}
exports.CommanderProxy = CommanderProxy;
