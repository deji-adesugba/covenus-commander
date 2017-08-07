const type_check = require("../../common/utils/type-check.utils");
const common_constants = require("../../common/constants");
const error_messages = require("../errors/messages");
const MappingValidationException = require("../errors/exceptions/mapping-validation.exception").MappingValidationException;
const ImproperProgramException = require("../errors/exceptions/improper-program.exception").ImproperProgramException;
const CommanderExecutionType = require('../../common/enums/commander-executiontype.enum').CommanderExecutionType;
const CommanderBase = require("./commander-base").CommanderBase;
const CommanderBuilder = require("./commander-builder").CommanderBuilder;

class CommanderExecutor extends CommanderBase{

    constructor(program, exceptionTraps) {
        super(program);
        this._hasOption = null;
        this._hasArgument = null;
        this._hasCommand = null;
        this.executionType = null;
        this.exceptionTraps = exceptionTraps;
        this.commanderBuilder = new CommanderBuilder(this.getProgram(), exceptionTraps);
    }

    checkForOptionsInProgram(){
        if(!type_check.isNil(this._hasOption))return this._hasOption;

        const options = this.reflectMetadata(common_constants.metadata.OPTIONS);
        if(options && Array.isArray(options) && options.length > 0){return this._hasOption = true; }
        return this._hasOption = false;
    }

    checkForArgumentInProgram(){
        if(!type_check.isNil(this._hasArgument))return this._hasArgument;

        const argument = this.reflectMetadata(common_constants.metadata.ARGUMENT);
        if(argument){
            if(type_check.isFunction(argument)){return this._hasArgument = true; 
            }else{throw new MappingValidationException(error_messages.PROGRAM_ARG_METADATA_INVALID(this.program.metatype));}    
        }
        return this._hasArgument = false;
    }

    checkForCommandsInProgram(){
        if(!type_check.isNil(this._hasCommand))return this._hasCommand;

        const commands = this.reflectMetadata(common_constants.metadata.COMMANDS);
        if(commands && Array.isArray(commands) && commands.length > 0)
        {return this._hasCommand = true; }
        return this._hasCommand = false;
    }

    isArgumentBasedProgram(){
        if(!type_check.isNil(this.executionType))return this.executionType === CommanderExecutionType.ARGUMENT;
    }

    isCommandBasedProgram(){
        if(!type_check.isNil(this.executionType))return this.executionType === CommanderExecutionType.COMMANDS;
    }

    isOptionBasedProgram(){
        if(!type_check.isNil(this.executionType))return this.executionType === CommanderExecutionType.OPTIONS;
    }

    resolveProgramExecutionType(){
        this.checkForOptionsInProgram();
        this.checkForArgumentInProgram();
        this.checkForCommandsInProgram();

         if(this._hasCommand){
            if(this._hasArgument){throw new ImproperProgramException('command', 'argument', this.program.metatype.name);}
            this.executionType = CommanderExecutionType.COMMANDS;
            return;
        }
        if(this._hasArgument && this._hasOption){throw new ImproperProgramException('argument', 'option', this.program.metatype.name);}
        if(this._hasArgument){this.executionType = CommanderExecutionType.ARGUMENT;}
        if(this._hasOption){this.executionType = CommanderExecutionType.OPTIONS;}
    }

    executeProgram(){
        this.resolveProgramExecutionType();

        if(this.isCommandBasedProgram()){
            this.executeProgramAsCommands(this._hasOption ? true : false);
            return;
        }
        if(this.isArgumentBasedProgram()){this.executeProgramAsArgument();return;}
        if(this.isOptionBasedProgram()){this.executeProgramAsOptions();return;}
    }

    executeProgramAsCommands(runWithSubordinateOption){
        var cmdBuilder, optBuilder; 
        cmdBuilder = this.commanderBuilder.getCommandsBuilder();
        if(runWithSubordinateOption){
            optBuilder = this.commanderBuilder.getOptionsBuilder(true);
            this.commanderBuilder.preBuild();
            optBuilder.build();
            cmdBuilder.build();
            this.commanderBuilder.postBuild();

            optBuilder.surbordinateOptionPreExecute();
            cmdBuilder.execute();
        }else{
            this.commanderBuilder.preBuild();
            cmdBuilder.build();
            this.commanderBuilder.postBuild();
            cmdBuilder.execute();
        }
       
    }

    executeProgramAsArgument(){
        var builder = this.commanderBuilder.getArgumentBuilder();
        this.commanderBuilder.preBuild();
        builder.build();
        this.commanderBuilder.postBuild();
        builder.execute();
    }

    executeProgramAsOptions(){
        var builder = this.commanderBuilder.getOptionsBuilder();
        this.commanderBuilder.preBuild();
        builder.build();
        this.commanderBuilder.postBuild();
        builder.execute();
    }

}

exports.CommanderExecutor = CommanderExecutor;