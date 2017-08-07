const ConsoleMessageException = require("../errors/exceptions/console-message.exception").ConsoleMessageException;
const error_messages = require("../errors/messages");
const type_check = require("../../common/utils/type-check.utils");
const firstLetterCapitalize = require("../../common/utils/helper.utils").firstLetterCapitalize;
const OptionsBuilderHelper = require("./options-builder").OptionsBuilderHelper;
const StringWriter = require("../helpers/string-writer").StringWriter;

class CommandBuilder{
    constructor(commanderBuilder) {
        this.commanderBuilder = commanderBuilder;
        this.cmdProps = null;
        this.cmdOptionHelp = null;
    }

    execute(){
        this.commanderBuilder.runChainCommands();
    }

    createProgramCallbackForCommand(cmdProp){
        if(cmdProp.instanceWrapper && cmdProp.instanceWrapper.instance){
            cmdProp.instanceWrapper.instance['getProgram'] = () => {
                return this.commanderBuilder.getProgram().instance();
            }
        }
    }

    enableCustomHelpForCommandIfAvailable(cmdProp){
        if(cmdProp.instanceWrapper && cmdProp.instanceWrapper.instance){
            var onHelp = cmdProp.instanceWrapper.instance.onHelp;
            if(onHelp && type_check.isFunction(onHelp)){
                const sw = new StringWriter();
                sw.writeLine('');
                sw.writeLine(` ${firstLetterCapitalize(cmdProp.verb)} Command Help:`);
                sw.writeLine('');
                cmdProp.instanceWrapper.instance.onHelp(sw);
                const content = sw.getStringContent();
                this.commanderBuilder.registerBuildHelpProvider(() => { 
                    (() => {
                        console.log(content);
                    })();
                });
                
            }
        }
    }

    outputCommandOptionsHelpstring(helpInfo){
        var flagSectionLength = helpInfo.maxFlagLength + 7;
        var helpArrayIndex = 0;
        var helpInfoIndex = 0;
        const sw = new StringWriter();
        sw.writeLine('');
        sw.writeLine(` ${firstLetterCapitalize(helpInfo.command)} Command Options:`);
        sw.writeLine('');
        helpInfo.flags.forEach((flag) => {
            var paddingLength = flagSectionLength - flag.length
            sw.writeLine('   ' + flag + ' '.repeat(paddingLength) + helpInfo.descriptions[helpInfoIndex]);
        });
        const content = sw.getStringContent();
        this.commanderBuilder.registerBuildHelpProvider(() => { 
            (() => {
                console.log(content);
            })();
        });
    }

    buildCommandOptionHelpFlag(option){
        var flags=`${option.shortFlag}, ${option.fullFlag}`;
        if(option.flagArg){flags=flags.concat(` ${option.flagArg}`);}
        return flags;
    }

    buildCommandOptionsHelpString(cmdProp){
        var maxOptionFlagLen = 0;
        var optFlags = [], optDescriptions = [];
        var cmdHelps = [];
        if(cmdProp.includeInHelpByDefault && cmdProp.options && Array.isArray(cmdProp.options) && cmdProp.options.length > 0){
            cmdProp.options.forEach((opt) => {
                var optFlag = this.buildCommandOptionHelpFlag(opt);
                var optFlagLen = type_check.isString(optFlag) ? optFlag.length : 0;
                maxOptionFlagLen = maxOptionFlagLen > optFlagLen ? maxOptionFlagLen : optFlagLen;
                if(optFlagLen > 0){
                    optFlags.push(optFlag);
                    optDescriptions.push(opt.description); 
                }
            });
            this.outputCommandOptionsHelpstring({command: cmdProp.verb, flags: optFlags, descriptions: optDescriptions, maxFlagLength: maxOptionFlagLen});
        }
    }

    isDefaultCommandDefined(commandProperties){
        var result = false;
        if(commandProperties && Array.isArray(commandProperties)){
            commandProperties.forEach((cmdProp) => {
                if(cmdProp.verbOption){
                }
                if(cmdProp.verb === '*' 
                    || (cmdProp.verbOption && cmdProp.verbOption.isDefault === true)
                    || !type_check.isNil(cmdProp.verbDescription))
                {
                    result = true;
                }
            });
        }
        return result;
    }

    buildDefaultCommandifNone(commandProperties){
        if(!this.isDefaultCommandDefined(commandProperties)){
            var block =  'fallback_command';
            this.commanderBuilder.addChainCommand('command', '*', block);
            this.commanderBuilder.addChainCommand('action',(cmd)=>{
                throw new ConsoleMessageException(error_messages.INVALID_COMMAND(cmd));
            }, block);
        }
    }

    build(commandProperties){
        var program = this.commanderBuilder.getProgram();
        var optionsHelper;
        this.cmdProps = commandProperties;

        commandProperties.forEach((cmdProp) => {
            var commandArgs = [];
            commandArgs.push(this.buildVerbWithArgs(cmdProp));
            if(cmdProp.verbDescription){commandArgs.push(cmdProp.verbDescription)}
            if(cmdProp.verbOption){commandArgs.push(cmdProp.verbOption)}
            var blockName = cmdProp.verb;
            this.commanderBuilder.addChainCommand('command', commandArgs, blockName);

            if(!cmdProp.verbDescription){

                if(cmdProp.alias){this.commanderBuilder.addChainCommand('alias', cmdProp.alias, blockName)}
                if(cmdProp.commandDescription){this.commanderBuilder.addChainCommand('description', cmdProp.commandDescription, blockName)}
                
                var options = cmdProp.options || [];    
                if(options){
                    optionsHelper = new OptionsBuilderHelper(this.commanderBuilder, blockName);
                    optionsHelper.build(options);
                }
                
                if(cmdProp.instanceWrapper.instance.execute){
                    this.commanderBuilder.addChainCommand('action',this.buildActionCallback(cmdProp.instanceWrapper, cmdProp.requiredArgs, cmdProp.optionalArgs, cmdProp.variadicLastArg, program, options), blockName);
                }
                
            }
            this.buildCommandOptionsHelpString(cmdProp);
            this.enableCustomHelpForCommandIfAvailable(cmdProp);
            this.createProgramCallbackForCommand(cmdProp);
        });
        this.buildDefaultCommandifNone(commandProperties);
    }

    buildArgs(args){
        var strArgs='';
        args.forEach((arg) => {
            strArgs = strArgs + `${arg} `;
        })
        
        return strArgs;
    }

    buildVerbWithArgs(cmdProp){
        var strArg;
        var requiredArgs=cmdProp.requiredArgs.map((reqArgProp) => reqArgProp.markedArg);
        var optionalArgs=cmdProp.optionalArgs.map((optArgProp) => optArgProp.markedArg);
        var variadicArgs=cmdProp.variadicLastArg.map((optArgProp) => optArgProp.markedArg);
        if(variadicArgs.length == 1){
            strArg=`${cmdProp.verb} ${this.buildArgs(requiredArgs)}${this.buildArgs(optionalArgs)}${this.buildArgs(variadicArgs)}`;
        }else{
            strArg=`${cmdProp.verb} ${this.buildArgs(requiredArgs)}${this.buildArgs(optionalArgs)}`;
        }

        return strArg;
    }

    buildActionCallback(command, requiredArgs, optionalArgs, variadicArg, program, options){
        var callback = (...theArgs) => {
                            var argLength = theArgs.length;
                            var requiredArgObject = {}, optionalArgObject = {}, variadicArgObject = {}, commandOptObject = {}, programOptObject = {};

                            var requiredArgLen = requiredArgs.length;
                            for (var i = 0; i < requiredArgLen; i++) { 
                                requiredArgObject[requiredArgs[i].arg]=theArgs[i];
                                if(type_check.isNil(theArgs[i])){
                                    throw new ConsoleMessageException(error_messages.NOT_ALL_REQUIRED_ARGS_PASSED(command.metatype.name,'@CLICommand'));
                                }
                            }
                            var optionalArgLen = optionalArgs.length;
                            var hasOptionalArgs = optionalArgLen > 0;
                            if(hasOptionalArgs){
                                for (var i = 0; i < optionalArgLen; i++) { 
                                    optionalArgObject[optionalArgs[i].arg]=theArgs[requiredArgLen + i];
                                }
                            }

                            var hasVariadicArg = (variadicArg.length == 1);
                            if(hasVariadicArg){
                                if(argLength >= 2){
                                    var variadicArgVal = theArgs[argLength - 2];
                                    variadicArgObject[variadicArg[0].arg]= variadicArgVal;
                                }
                            }

                            commandOptObject = theArgs[argLength - 1];
                            programOptObject = this.commanderBuilder.getCommander();
                            const commanderProxy = this.commanderBuilder.getCommanderProxy();
                            commanderProxy.runPreExecuteCommandOptionsProxy(program, options, commandOptObject);

                            var proxy = this.createActionCallback(command.instance.execute,
                            command);
                            return proxy(requiredArgObject, optionalArgObject, variadicArgObject, commandOptObject, programOptObject);
                        }
        return callback;
    }

    createActionCallback(callback, commandInstanceWrapper) {
        return this.createActionCallbackProxy(commandInstanceWrapper, callback);
    }

    createActionCallbackProxy(commandInstanceWrapper, callback)
    {
        const executionContextCreator = this.commanderBuilder.getExecutionContextCreator();
        const proxy = this.commanderBuilder.getCommanderProxy();
        const program = this.commanderBuilder.getProgram();
        const executionContext = executionContextCreator.createCommand(commandInstanceWrapper, commandInstanceWrapper.metatype, callback);
        const exceptionTrap = this.commanderBuilder.getExceptionsTrap().create(commandInstanceWrapper.metatype);
        return proxy.createCommandProxy(executionContext, exceptionTrap);
    }
}

exports.CommandBuilder = CommandBuilder;