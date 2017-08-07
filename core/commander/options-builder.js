const ConsoleMessageException = require("../errors/exceptions/console-message.exception").ConsoleMessageException;
const error_messages = require("../errors/messages");

class OptionsBuilder{
    constructor(commanderBuilder, runOptionAsSubordinate = false) {
        this.commanderBuilder = commanderBuilder;
        this.runOptionAsSubordinate = runOptionAsSubordinate;
        this.optionHelper = new OptionsBuilderHelper(this.commanderBuilder, '[option]');
    }

    surbordinateOptionPreExecute(){
        const commander = this.commanderBuilder.getCommander();
        const program = this.commanderBuilder.getProgram();
        const proxy = this.commanderBuilder.getCommanderProxy();
        proxy.runPreExecuteOptionsProxy(commander, program);
    }

    execute(){
        const commander = this.commanderBuilder.getCommander();
        const program = this.commanderBuilder.getProgram();
        const proxy = this.commanderBuilder.getCommanderProxy();

        this.commanderBuilder.runChainCommands();
        proxy.runPreExecuteOptionsProxy(commander, program);

        if(program.instance.run){
            program.instance.run(commander);   
            return;
        }    
        
    }

    build(options){
        this.optionHelper.build(options);

    }
}

class OptionsBuilderHelper{

    constructor(commanderBuilder, blockName) {
        this.commanderBuilder = commanderBuilder;
        this.options = null;
        this.blockName = blockName;
    }

    getOptions(){
        return this.options;
    }

    build(options){
        var build={};
        var buildArgs = [];
        this.options = options;

        options.forEach((option) => {
            build.flags = this.buildFlags(option);
            buildArgs.push(build.flags);

            build.desc = option.description;
            buildArgs.push(build.desc);
            
            var isCoerced = this.isCoercionBasedBuild(option);
            if(isCoerced){
                build.coercionCallback = this.buildCoercionCallback(option);
                buildArgs.push(build.coercionCallback);
            }else{
                if(option.flagArgValueRegExp){
                    build.regExp = option.flagArgValueRegExp;
                    buildArgs.push(build.regExp);
                }
            
            }
            
            build.defaultValue = option.defaultValue;
            if(option.defaultValue){buildArgs.push(build.defaultValue)}

            this.commanderBuilder.addChainCommand("option", buildArgs, this.blockName);

            build={};
            buildArgs = [];
        });

    }

    buildFlags(option){
        var flags=`${option.shortFlag}, ${option.fullFlag}`;
        if(option.flagArg){flags=flags.concat(` ${option.flagArg}`);}
        return flags;
    }
    isCoercionBasedBuild(option){
        if(option.instanceWrapper.instance.coercion){return true}
        return false;
    }
    buildCoercionCallback(option){
        const program = this.commanderBuilder.getProgram();
        var callback = (argValue,defaultValue)=>{
                            var proxy = this.createCoercionCallback(option.instanceWrapper.instance.coercion,
                            option.instanceWrapper);
                            return proxy(argValue,defaultValue);
                        };
        return callback;
    }

    createCoercionCallback(callback, optionInstanceWrapper) {
        return this.createCoercionCallbackProxy(optionInstanceWrapper, callback);
    }

    createCoercionCallbackProxy(optionInstanceWrapper, callback)
    {
        const executionContextCreator = this.commanderBuilder.getExecutionContextCreator();
        const proxy = this.commanderBuilder.getCommanderProxy();
        const program = this.commanderBuilder.getProgram();
        const executionContext = executionContextCreator.createOption(optionInstanceWrapper, optionInstanceWrapper.metatype, callback);
        const exceptionTrap = this.commanderBuilder.getExceptionsTrap().create(optionInstanceWrapper.metatype);
        return proxy.createOptionProxy(executionContext, exceptionTrap);
    }

}

exports.OptionsBuilder = OptionsBuilder;
exports.OptionsBuilderHelper = OptionsBuilderHelper;