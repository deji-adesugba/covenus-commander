const ConsoleMessageException = require("../errors/exceptions/console-message.exception").ConsoleMessageException;
const type_check = require("../../common/utils/type-check.utils");
const StringWriter = require("../helpers/string-writer").StringWriter;

class ArgumentBuilder{
    constructor(commanderBuilder) {
        this.commanderBuilder = commanderBuilder;
        this.argumentResult = null;
    }

    execute(){
        this.commanderBuilder.runChainCommands();
    }

    createProgramCallbackForArgument(argument){
        if(argument.instanceWrapper && argument.instance){
            argument.instance['getProgram'] = () => {
                return this.commanderBuilder.getProgram().instance();
            }
        }
    }

    enableCustomHelpForArgumentIfAvailable(argument){
        if(argument && argument.instance){
            var onHelp = argument.instance.onHelp;
            if(onHelp && type_check.isFunction(onHelp)){
                const sw = new StringWriter();
                sw.writeLine('');
                argument.instance.onHelp(sw);
                const content = sw.getStringContent();
                this.commanderBuilder.registerBuildHelpProvider(() => { 
                    (() => {
                        console.log(content);
                    })();
                });
                
            }
        }
    }

    build(argumentResult){
        var build={};
        this.argumentResult = argumentResult;

        const argument = argumentResult.argument;
        const requiredArgsProperties = argumentResult.requiredArguments;
        const optionalArgsProperties = argumentResult.optionalArguments;
        const variadicArgProperties = argumentResult.lastVariadicArgument;
        
        var hasRequiredArgs = requiredArgsProperties.length > 0;
        var hasOptionalArgs = optionalArgsProperties.length > 0;
        var hasVariadicArg = (!type_check.isNil(variadicArgProperties));

        var requiredArgs=requiredArgsProperties.map((reqArgProp) => reqArgProp.markedArg);
        var optionalArgs=optionalArgsProperties.map((optArgProp) => optArgProp.markedArg);
        var variadicArg = hasVariadicArg? [variadicArgProperties.markedArg]:[];

        var strArg=`${this.buildArgs(requiredArgs)}${this.buildArgs(optionalArgs)}`;
        if(hasVariadicArg){
            strArg = strArg + `${variadicArgProperties.markedArg} `;
        }

        this.commanderBuilder.addChainCommand('arguments',strArg, '[argument]');
        this.commanderBuilder.addChainCommand('action',this.buildActionCallback(argument, requiredArgsProperties, optionalArgsProperties, variadicArgProperties),'[argument]');

        this.createProgramCallbackForArgument(argument);
        this.enableCustomHelpForArgumentIfAvailable(argument);
    }

    buildArgs(args){
        var strArgs='';
        args.forEach((arg) => {
            strArgs = strArgs + `${arg} `;
        })
        return strArgs;
    }

    buildActionCallback(argument, requiredArgs, optionalArgs, variadicArg){
        const program = this.commanderBuilder.getProgram();
        var callback = (...theArgs) => {
                            var argLength = theArgs.length;
                            var requiredArgObject = {}, optionalArgObject = {}, variadicArgObject = {};

                            var requiredArgLen = requiredArgs.length;
                            for (var i = 0; i < requiredArgLen; i++) { 
                                requiredArgObject[requiredArgs[i].arg]=theArgs[i];
                                if(type_check.isNil(theArgs[i])){
                                    throw new ConsoleMessageException(error_messages.NOT_ALL_REQUIRED_ARGS_PASSED(argument.metatype.name,'@CLIArgument'));
                                }
                            }
                            var optionalArgLen = optionalArgs.length;
                            var hasOptionalArgs = optionalArgLen > 0;
                            if(hasOptionalArgs){
                                for (var i = 0; i < optionalArgLen; i++) { 
                                    optionalArgObject[optionalArgs[i].arg]=theArgs[requiredArgLen + i];
                                }
                            }
                            var hasVariadicArg = !type_check.isNil(variadicArg);
                            if(hasVariadicArg){
                                variadicArgObject[variadicArg.arg]=(theArgs[argLength - 2]);
                            }
                            
                            var proxy = this.createActionCallback(argument.instance.execute,
                            argument);
                            return proxy(requiredArgObject, optionalArgObject, variadicArgObject);
                        }
        return callback;
    }

    createActionCallback(callback, argumentInstanceWrapper) {
        return this.createActionCallbackProxy(argumentInstanceWrapper, callback);
    }

    createActionCallbackProxy(argumentInstanceWrapper, callback)
    {
        const executionContextCreator = this.commanderBuilder.getExecutionContextCreator();
        const proxy = this.commanderBuilder.getCommanderProxy();
        const program = this.commanderBuilder.getProgram();
        const executionContext = executionContextCreator.createArgument(argumentInstanceWrapper, argumentInstanceWrapper.metatype, callback);
        const exceptionTrap = this.commanderBuilder.getExceptionsTrap().create(argumentInstanceWrapper.metatype);
        return proxy.createArgumentProxy(executionContext, exceptionTrap);
    }
}

exports.ArgumentBuilder = ArgumentBuilder;