const CommanderBase = require("./commander-base").CommanderBase;
const commander_program = require('commander');
const type_check = require("../../common/utils/type-check.utils");
const program_metadata_constants = require("../../common/utils/decorators/program.metadata.constants");
const argument_metadata_constants = require("../../common/utils/decorators/argument.metadata.constants");
const CommandParamsFactory = require("./command-params-factory").CommandParamsFactory;
const ArgumentParamsFactory = require("./argument-params-factory").ArgumentParamsFactory;
const OptionParamsFactory = require("./option-params-factory").OptionParamsFactory;
const CommanderExecutionContext = require("./commander-execution-context").CommanderExecutionContext;
const CommanderProxy = require("./commander-proxy").CommanderProxy;
const CommanderExceptionTraps = require("./commander-exception-traps").CommanderExceptionTraps;
const Logger = require("../../common/services/logger.service").Logger;
const OptionsBuilder = require("./options-builder").OptionsBuilder;
const ArgumentBuilder = require("./argument-builder").ArgumentBuilder;
const CommandBuilder = require("./command-builder").CommandBuilder;
const CommanderValidator = require("./commander-validator").CommanderValidator;
const CommanderReflector = require("./commander-reflector").CommanderReflector;
const StringWriter = require("../helpers/string-writer").StringWriter;

class CommanderBuilder extends CommanderBase{
    constructor(program, exceptionTrap) {
        super(program);
        this.commanderProgram = commander_program;
        this.chainCommands = new Map();
        this.executionContextCreator = new CommanderExecutionContext(new ArgumentParamsFactory(), new CommandParamsFactory(), new OptionParamsFactory());
        this.commanderExceptionsTrap = exceptionTrap;
        this.commanderProxy = new CommanderProxy();
        this.logger = new Logger('CommanderBuilder');
        this.commanderValidator = new CommanderValidator(program);
        this.commanderReflector = new CommanderReflector(program, this.commanderValidator);
        this.helpProviders = [];
        this.runSubBuild = true;
    }

    addChainCommand(action_name, action_args, block = 'global'){
        var blockCommands = this.chainCommands.get(block);
        var commandchain = blockCommands ? blockCommands : [];
        var argsArray = Array.isArray(action_args) ? action_args : [action_args];
        commandchain.push({ action: action_name, args: argsArray});
        this.chainCommands.set(block, commandchain);
    }

    runChainCommands(){
        var chainer = commander_program;
        this.chainCommands.forEach(function(commands, block) {
            commands.forEach(function({action, args}) {
                chainer = chainer[action](...args);
            });
            if(block!='global')
                chainer = commander_program;
        });
        
        commander_program.parse(process.argv);
    }

    getExecutionContextCreator(){return this.executionContextCreator}

    getExceptionsTrap(){return this.commanderExceptionsTrap}

    getCommanderProxy(){return this.commanderProxy}

    getCurrentCommanderChain(){return this.chainedCommanderProgram}

    getCommander(){return commander_program}

    preBuildVersionAndUsage(){
        const version = this.reflectMetadata(program_metadata_constants.metadata.VERSION);
        const usage = this.reflectMetadata(program_metadata_constants.metadata.USAGE);

        if(type_check.isNil(version)){this.addChainCommand('version',this.program.version)}
        else{if(type_check.isString(version)){this.addChainCommand('version',version)}
        }
    
        if(!type_check.isNil(usage)){this.addChainCommand('usage',usage)}
    }

    hasCustomConfiguration(){if(this.program.instance.configure){return true}return false}

    preBuildCustomConfiguration(){
        const configure = this.program.instance.configure;
        if(configure){
            const retval = this.program.instance.configure(this.commanderProgram);
            if(retval && retval.version){
                this.commanderProgram = retval;
                return true;
            }
            return false;
        }

    }

    preInitProgramInstance(){
        var instance = this.program.instance;
        instance["displayHelp"] = () => {
            const onCustomizeHelpBeforeDisplay = this.program.instance.onCustomizeHelpBeforeDisplay;
            if(onCustomizeHelpBeforeDisplay && type_check.isFunction(onCustomizeHelpBeforeDisplay)){
                commander_program.outputHelp(onCustomizeHelpBeforeDisplay.bind(instance));
            }else{
                commander_program.outputHelp();
            }
             
        }
        
        const onInit = instance.onInit;
        if(onInit){instance.onInit()}
    }

    preBuild(){
        this.preInitProgramInstance();
        this.preBuildVersionAndUsage();
        if(this.hasCustomConfiguration()){
            if(!this.preBuildCustomConfiguration()){
                this.runSubBuild = false;
            }
        }
    }
    postBuild(){
        this.postBuildHelp();
    }

    registerBuildHelpProvider(callback){
        if(type_check.isFunction(callback)){
            this.helpProviders.push(callback);
        }
    }

    postBuildHelp(){
        const extraHelpInfo = this.program.instance.onExtraHelpInfo;
        this.getCommander().on('--help',()=>{    
            this.helpProviders.forEach(function(provider) {
                provider();
                console.log('');
            });

            if(extraHelpInfo){
                const sw = new StringWriter();
                this.program.instance.onExtraHelpInfo(sw);
                console.log(sw.getStringContent());
            } 
        });

        const showHelpByDefault = this.reflectMetadata(program_metadata_constants.metadata.SHOWHELPBYDEFAULT);
        if(showHelpByDefault){
            this.getCommander().outputHelp();
        }
    }

    getOptionsBuilder(runOptionAsSubordinate = false){
        this.runningOptionAsSubordinate = runOptionAsSubordinate;

        const optsBuilder = new OptionsBuilder(this, runOptionAsSubordinate);
        const wrapper = {
            build : () => {  
                var optionProperties = this.commanderReflector.reflectOptionsMetadata();
                optsBuilder.build(optionProperties);
            },
            execute : () => {
                optsBuilder.execute();
            },
            surbordinateOptionPreExecute : () => {
                optsBuilder.surbordinateOptionPreExecute();
            }
        }

        return this.createBuilderProxy(wrapper);
    }

    getArgumentBuilder(){
        const argBuilder = new ArgumentBuilder(this);
        const wrapper = {
            build : () => {  
                var argumentResult = this.commanderReflector.reflectArgumentMetadata();
                argBuilder.build(argumentResult);
            },
            execute : () => {
                argBuilder.execute();
            }
        }

        return this.createBuilderProxy(wrapper);
    }

    getCommandsBuilder(){
        const cmdBuilder = new CommandBuilder(this);
        const wrapper = {
            build : () => {  
                var cmdProperties = this.commanderReflector.reflectCommandsMetadata();
                cmdBuilder.build(cmdProperties);
            },
            execute : () => {
                cmdBuilder.execute();
            }
        }

        return this.createBuilderProxy(wrapper);
    }

    createBuilderProxy(builder) {
        const proxy = this.createBuilderWrapper();
        return new Proxy(builder, {
            get: proxy,
            set: proxy
        });
    }

    createBuilderWrapper() {
        return (builder, prop) => {
            if (!(prop in builder))
                return

            var instance_member = builder[prop];
            var result;

            if (type_check.isFunction(instance_member) && instance_member.name == 'build') {
                return () => {
                    if(this.runSubBuild){
                        result = builder[prop]();
                    }
                    return result;
                };
            }

            return instance_member;
        };
    }

}



exports.CommanderBuilder = CommanderBuilder;