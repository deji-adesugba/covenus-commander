const common_constants = require("../../common/constants");
const error_messages = require("../errors/messages");
const type_check = require("../../common/utils/type-check.utils");
const MappingValidationException = require("../errors/exceptions/mapping-validation.exception").MappingValidationException;
const REQUIREDARGS = require("../../common/utils/decorators/argument.metadata.constants").metadata.REQUIREDARGS;
const OPTIONALARGS = require("../../common/utils/decorators/argument.metadata.constants").metadata.OPTIONALARGS;
const VARIADICLASTARG = require("../../common/utils/decorators/argument.metadata.constants").metadata.VARIADICLASTARG;
const CommanderBase = require("./commander-base").CommanderBase;

class CommanderReflector extends CommanderBase{
    constructor(program, validator) {
        super(program);
        this.validator = validator;
    }

    reflectOptionsMetadata(forTarget = null)
    {
        const options = type_check.isNil(forTarget) ? this.reflectMetadata(common_constants.metadata.OPTIONS) : 
        this.reflectMetadata(common_constants.metadata.OPTIONS, forTarget);

        var optionProperties = [];
        if(options && Array.isArray(options) && options.length > 0)
        {
            options.forEach((option) => {
                if(type_check.isFunction(option)){
                    var optionInstance=this.program.options.get(option.name);
                    var optProp = this.validator.validateOption(optionInstance.name, optionInstance.metatype);

                    optProp.instanceWrapper=optionInstance;

                    if(optProp.flagArgValueRegExp && optProp.instanceWrapper.instance.coercion){
                        throw new ConsoleMessageException(error_messages.REGEXP_COERCION_PRESENT(optProp.instanceWrapper.name));
            }
                    optionProperties.push(optProp);
                }else{
                    throw new MappingValidationException(error_messages.INVALID_CLASS_ARG('options', this.program.metatype.name, '@CLIProgram', 'option'));
                }  
            });
            this.program.addReflectedOptionPropertiesForTarget(forTarget ? forTarget : this.program.metatype, optionProperties);
        }
        return optionProperties;
    }

    reflectCoreCommand(commandInstance){
        var coreCmdProps = this.validator.validateCoreCommand(commandInstance);
        return coreCmdProps;
    }
    reflectCommandsMetadata(){
        const commands = this.reflectMetadata(common_constants.metadata.COMMANDS);
        const program = this.getProgram();
        var commandProperties = [];
        if(commands && Array.isArray(commands) && commands.length > 0)
        {
            commands.forEach((command) => {
                if(type_check.isFunction(command)){
                    var commandInstance=this.program.commands.get(command.name);
                    var coreCmdProps = this.reflectCoreCommand(commandInstance);

                    var requiredArguments = this.reflectRequiredArguments(commandInstance, true);
                    var hasRequiredArgs = requiredArguments.length > 0;
                    if(hasRequiredArgs)
                        program.addReflectedArgPropertiesForTarget(commandInstance.metatype, 'requiredArgs', requiredArguments);

                    var optionalArguments = this.reflectOptionalArguments(commandInstance, true);
                    var hasOptionalArgs = optionalArguments.length > 0;
                    if(hasOptionalArgs)
                        program.addReflectedArgPropertiesForTarget(commandInstance.metatype, 'optionalArgs', optionalArguments);

                    var lastVariadicArgument = this.reflectVariadicArgument(commandInstance, true);
                    var hasVariadicArg = (!type_check.isNil(lastVariadicArgument));
                    if(hasVariadicArg)
                        program.addReflectedArgPropertiesForTarget(commandInstance.metatype, 'variadicLastArg', lastVariadicArgument);

                    if(!hasRequiredArgs){
                        //no required
                        if(hasVariadicArg && hasOptionalArgs){
                            //cannot have variadic and optional args
                            throw new MappingValidationException(error_messages.NO_VARIADIC_AND_OPTIONAL_ARG(commandInstance.metatype.name,'@CLICommand'));
                        }
                    }else{
                        //has required
                        if(hasVariadicArg && hasOptionalArgs){
                            //cannot have variadic and optional args with required
                            throw new MappingValidationException(error_messages.REQ_VARIADIC_AND_OPTIONAL_ARG(commandInstance.metatype.name,'@CLICommand'));
                        }
                    }


                    var options = this.reflectOptionsMetadata(command);
                    if(coreCmdProps.verbDescription){
                        if(options.length > 0){
                            throw new MappingValidationException(error_messages.INVALID_COMMAND_ARG('options', command.name, '@CLICommand'));
                        }
                    }
                    var cmdProp = Object.assign({},coreCmdProps);
                    cmdProp.requiredArgs = requiredArguments;
                    cmdProp.optionalArgs = optionalArguments;
                    cmdProp.variadicLastArg = hasVariadicArg ? [lastVariadicArgument] : [];
                    cmdProp.options = options;
                    cmdProp.instanceWrapper = commandInstance;
                    commandProperties.push(cmdProp);
                }else{
                    throw new MappingValidationException(error_messages.INVALID_CLASS_ARG('commands', this.program.metatype.name, '@CLIProgram', 'command'));
                }
                
            });
            this.program.addReflectedCommandProperties(this.program.metatype, commandProperties);
        }


        return commandProperties;
    }

    

    reflectArgumentMetadata(){
        const argumentMetaType = this.reflectMetadata(common_constants.metadata.ARGUMENT);
        const program = this.getProgram();
        const argument = program.getArgument(argumentMetaType.name);

        var requiredArguments = this.reflectRequiredArguments(argument);
        var hasRequiredArgs = requiredArguments.length > 0;
        if(hasRequiredArgs)
            program.addReflectedArgPropertiesForTarget(argument.metatype, 'requiredArgs', requiredArguments);
        
        var optionalArguments = this.reflectOptionalArguments(argument);
        var hasOptionalArgs = optionalArguments.length > 0;
        if(hasOptionalArgs)
            program.addReflectedArgPropertiesForTarget(argument.metatype, 'optionalArgs', optionalArguments);
        
        var lastVariadicArgument = this.reflectVariadicArgument(argument);
        var hasVariadicArg = (!type_check.isNil(lastVariadicArgument));
        if(hasVariadicArg)
            program.addReflectedArgPropertiesForTarget(argument.metatype, 'variadicLastArg', lastVariadicArgument);
        
        if(!hasRequiredArgs){
            //no required
            if(hasVariadicArg && hasOptionalArgs){
                //cannot have variadic and optional args
                throw new MappingValidationException(error_messages.NO_VARIADIC_AND_OPTIONAL_ARG(argument.metatype.name,'@CLIArgument'));
            }
        }else{
            //has required
             if(hasVariadicArg && hasOptionalArgs){
                //cannot have variadic and optional args with required
                throw new MappingValidationException(error_messages.REQ_VARIADIC_AND_OPTIONAL_ARG(argument.metatype.name,'@CLIArgument'));
            }
        }

        if(!argument.instance.execute)
        {
            throw new MappingValidationException(error_messages.PROGRAM_ARG_NO_EXECUTE(argument.metatype.name,'@CLIArgument'));
        }

        
        var argumentProperties = {requiredArguments, optionalArguments, lastVariadicArgument, argument};

        return argumentProperties;
    }

    reflectRequiredArguments(argumentOrCommand, forCommand = false){
        return this.reflectRequiredOrOptionalArguments(argumentOrCommand, true, forCommand);
    }
    reflectOptionalArguments(argumentOrCommand, forCommand = false){
        return this.reflectRequiredOrOptionalArguments(argumentOrCommand, false, forCommand);
    }
    reflectVariadicArgument(argumentOrCommand, forCommand = false){
        return this.reflectVariadicForArgumentOrCommand(argumentOrCommand, forCommand);
    }

    reflectRequiredOrOptionalArguments(argumentOrCommand, isRequiredArgs = true, isCommandArgs = false){
        var argsKey = isRequiredArgs ? REQUIREDARGS : OPTIONALARGS;
        const args = this.reflectMetadata(argsKey, argumentOrCommand.metatype);
        var argsProperties = [];

        var prop = isRequiredArgs?'requiredArgs':'optionalArgs';
        var meta = isCommandArgs?'@CLICommand':'@CLIArgument';

        if(args){
            if(!Array.isArray(args))
                throw new MappingValidationException(error_messages.INVALID_ARRAY_ARG(prop, argumentOrCommand.metatype.name, meta));
        }

        if(args && args.length > 0)
        {
            args.forEach((arg) => {

                if(!type_check.isString(arg))
                    throw new MappingValidationException(error_messages.INVALID_STRING_ARG(prop, argumentOrCommand.metatype.name, meta));
            
               var argProp = this.validator.validateArgs(arg, isRequiredArgs, isCommandArgs);
               argProp.instanceOwner = argumentOrCommand.instance;
               argsProperties.push(argProp);
                
            });
        }
        return argsProperties;
    }

    reflectVariadicForArgumentOrCommand(argumentOrCommand, isCommandArgs = false){
        const variadicArg = this.reflectMetadata(VARIADICLASTARG, argumentOrCommand.metatype);
        var variadicArgProperties=null;

        if(variadicArg)
        {
            variadicArgProperties={};
            var meta = isCommandArgs?'@CLICommand':'@CLIArgument';

            if(!type_check.isString(variadicArg))
                throw new MappingValidationException(error_messages.INVALID_STRING_ARG('variadicLastArg', argumentOrCommand.metatype.name, meta));
            
            variadicArgProperties = this.validator.validateVariadicArg(variadicArg, isCommandArgs);
            variadicArgProperties.instanceOwner = argumentOrCommand.instance;
        }
        return variadicArgProperties;
    }

}

exports.CommanderReflector = CommanderReflector;