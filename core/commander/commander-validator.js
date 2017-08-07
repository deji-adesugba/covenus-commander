"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");
const type_check = require("../../common/utils/type-check.utils");
const commander_check = require("../../common/utils/commander.utils");
const UnknownMappingException = require("../errors/exceptions/unknown-mapping.exception").UnknownMappingException;
const MappingValidationException = require("../errors/exceptions/mapping-validation.exception").MappingValidationException;
const option_metadata_constants = require("../../common/utils/decorators/option.metadata.constants");
const command_metadata_constants = require("../../common/utils/decorators/command.metadata.constants");
const error_messages = require("../errors/messages");
const common_constants = require("../../common/constants");
const ConsoleMessageException = require("../errors/exceptions/console-message.exception").ConsoleMessageException
const CommanderBase = require("./commander-base").CommanderBase;

class CommanderValidator extends CommanderBase {
    constructor(program) {
        super(program);
    }

    validateVariadicArg(variadicArg, isCommand){
        var argProps={};
        if(this.validatePropertyWithCallback(variadicArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsOptional(prop)})){
            var unmarked_arg = variadicArg.substring(1,variadicArg.length-1);

            if(this.validatePropertyWithCallback(unmarked_arg, (prop) => {return commander_check.isArgAlreadyFlaggedAsVariadic(prop)})){
                var unmarked_unvariadic_arg = unmarked_arg.substring(0,variadicArg.length-3);

                if(!this.validatePropertyWithCallback(unmarked_unvariadic_arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(unmarked_unvariadic_arg, 'variadic', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(unmarked_unvariadic_arg);
                    argProps.markedArg = `[${argProps.arg}...]`;
                }
            }else{
                if(!this.validatePropertyWithCallback(unmarked_arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(unmarked_arg, 'variadic', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(unmarked_arg);
                    argProps.markedArg = `[${argProps.arg}...]`;
                }
            }
        }else{
            if(this.validatePropertyWithCallback(variadicArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsVariadic(prop)})){
                var unvariadic_arg = variadicArg.substring(0,variadicArg.length-3);

                if(!this.validatePropertyWithCallback(unvariadic_arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(unvariadic_arg, 'variadic', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(unvariadic_arg);
                    argProps.markedArg = `[${argProps.arg}...]`;
                }
            }else{
                if(!this.validatePropertyWithCallback(variadicArg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(variadicArg, 'variadic', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(variadicArg);
                    argProps.markedArg = `[${argProps.arg}...]`;
                }
            }
        }
        return argProps;
    }

    validateArgs(arg, isRequiredArgs, isCommand){
        var argProps={};

        if(isRequiredArgs){
            if(this.validatePropertyWithCallback(arg, (prop) => {return commander_check.isArgAlreadyFlaggedAsRequired(prop)})){
                var unmarked_arg = arg.substring(1,arg.length-1);
                if(!this.validatePropertyWithCallback(unmarked_arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(arg, 'required', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(unmarked_arg);
                    argProps.markedArg = `<${argProps.arg}>`;
                }
            }else{
                if(!this.validatePropertyWithCallback(arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(arg, 'required', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(arg);
                    argProps.markedArg = `<${argProps.arg}>`;
                }
            }
        }else{
            if(this.validatePropertyWithCallback(arg, (prop) => {return commander_check.isArgAlreadyFlaggedAsOptional(prop)})){
                var unmarked_arg = arg.substring(1,arg.length-1);
                if(!this.validatePropertyWithCallback(unmarked_arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(arg, 'optional', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(unmarked_arg);
                    argProps.markedArg = `[${argProps.arg}]`;
                }
            }else{
                if(!this.validatePropertyWithCallback(arg, (prop) => {return commander_check.isArgWithValidCharacters(prop)})){
                    throw new MappingValidationException(error_messages.INVALID_ARG_CHARACTERS(arg, 'optional', isCommand?'@CLICommand':'@CLIArgument'));
                }else{
                    argProps.arg = commander_check.camelCaseFullFlag(arg);
                    argProps.markedArg = `[${argProps.arg}]`;
                }
            }
        }
        return argProps;
    }

    validatePropertyOfMetadata(propertyKey, type, decoratorName, throwError = true){
        var propertyValue;
        if (type_check.isUndefined(propertyValue=this.reflectMetadata(propertyKey, type))){
            if(throwError){
                throw new UnknownMappingException(propertyKey, decoratorName, type.name);
            }else{return null}
        }
        return propertyValue;
    }

    validatePropertyIsString(propertyKey, propertyValue, type, decoratorName){
        if(!type_check.isString(propertyValue))
        {
            throw new MappingValidationException(error_messages.VALID_STRING_MAPPING(propertyKey, type.name, decoratorName));
        }
        return true;
    }

    validatePropertyIsStringWithMessage(propertyValue, message){
        if(!type_check.isString(propertyValue))
        {
            throw new MappingValidationException(message);
        }
        return true;
    }

    validatePropertyWithCallback(propertyValue, callback){
        return callback(propertyValue);
    }

    validateOption(option_typename, metatype) {
        var optProps={};

        if (type_check.isUndefined(metatype)) {
            throw new MappingValidationException(`${option_typename} has no @CLIOption properties to validate`);
        }
        var shortFlag = this.validatePropertyOfMetadata(option_metadata_constants.metadata.SHORTFLAG, metatype, '@CLIOption');
        var fullFlag = this.validatePropertyOfMetadata(option_metadata_constants.metadata.FULLFLAG, metatype, '@CLIOption');
        var description = this.validatePropertyOfMetadata(option_metadata_constants.metadata.DESCRIPTION, metatype, '@CLIOption');;

        if(this.validatePropertyWithCallback(shortFlag, (prop) => {return commander_check.isShortFlagASingleCharacter(prop)})){
            if(this.validatePropertyWithCallback(shortFlag, (prop) => {return commander_check.isShortFlagAValidCharacter(prop)})){
                optProps.shortFlag = `-${shortFlag}`;
                optProps.shortFlagRaw = shortFlag;
            }else{
                throw new MappingValidationException(error_messages.SHORT_FLAG_OPTION_MAPPING(option_typename));
            }
        }else{
            if(this.validatePropertyWithCallback(shortFlag, (prop) => {return commander_check.isShortFlagWithDashAlready(prop)})){
                if(this.validatePropertyWithCallback(shortFlag, (prop) => {return commander_check.isShortFlagAlreadyMarkedWithDashAndValid(prop)})){
                    optProps.shortFlag = shortFlag;
                    optProps.shortFlagRaw = shortFlag;
                }else{
                    throw new MappingValidationException(error_messages.SHORT_FLAG_VALID_ASCII_MAPPING(option_typename));
                }
            }else{
                throw new MappingValidationException(error_messages.SHORT_FLAG_OPTION_MAPPING(option_typename));
            }
        }

        if(this.validatePropertyIsString(option_metadata_constants.metadata.DESCRIPTION, description, metatype, '@CLIOption')){
            optProps.description = description
        }

        var flagArgValueHintForRegExp = this.validatePropertyOfMetadata(option_metadata_constants.metadata.FLAGARGVALUEHINTFORREGEXP, metatype, '@CLIOption', false);
        if(flagArgValueHintForRegExp){
            if(this.validatePropertyIsString(option_metadata_constants.metadata.FLAGARGVALUEHINTFORREGEXP, flagArgValueHintForRegExp, metatype, '@CLIOption')){
                optProps.flagArgValueHintForRegExp = flagArgValueHintForRegExp
            }
        }

        if(this.validatePropertyIsString(option_metadata_constants.metadata.FULLFLAG, fullFlag, metatype, '@CLIOption')){
            fullFlag = fullFlag.replace(/^\-+|\-+$/g, '');
        }

        if(this.validatePropertyWithCallback(fullFlag, (prop) => {return commander_check.isFullFlagAlreadyMarkedWithDoubleDashAndValid(prop)})){
            optProps.fullFlag = fullFlag;
            optProps.fullFlagRaw = fullFlag.substring(2);
        }else{
            if(this.validatePropertyWithCallback(fullFlag, (prop) => {return commander_check.isFullFlagWithDoubleDashAlready(prop)})){
                throw new MappingValidationException(error_messages.FULL_FLAG_VALID_ASCII_DASH_MAPPING(option_typename));
            }
            if(this.validatePropertyWithCallback(fullFlag, (prop) => {return commander_check.isFullFlagWithValidCharacters(prop)})){
                optProps.fullFlag = `--${fullFlag}`;
                optProps.fullFlagRaw = fullFlag;
                optProps.fullFlagCamelCased = commander_check.camelCaseFullFlag(fullFlag);
            }else{
                throw new MappingValidationException(error_messages.FULL_FLAG_VALID_ASCII_DASH_MAPPING(option_typename));
            }

        }

        var flagArgValueRegExp;
        var flagArg = this.validatePropertyOfMetadata(option_metadata_constants.metadata.FLAGARG, metatype, '@CLIOption', false);
        var isFlagArgRequired = this.validatePropertyOfMetadata(option_metadata_constants.metadata.ISFLAGARGREQUIRED, metatype, '@CLIOption', false);
        if(isFlagArgRequired){
            if(!flagArg){
                throw new MappingValidationException(error_messages.UNKNOWN_MAPPING(option_metadata_constants.metadata.FLAGARG, '@CLIOption', option_typename));
            }
        }
        if (flagArg) {
            //flagArg is defined
            if(this.validatePropertyIsString(option_metadata_constants.metadata.FLAGARG, flagArg, metatype, '@CLIOption')){
                optProps.flagArg=flagArg;
            }else{
                throw new MappingValidationException(error_messages.INVALID_STRING_ARG(option_metadata_constants.metadata.FLAGARG,
                     metatype, '@CLIOption'));
            }

            
            if(!isFlagArgRequired){
                optProps.isFlagArgRequired = false;
            }else{
                optProps.isFlagArgRequired = isFlagArgRequired;
            }

            flagArgValueRegExp = this.validatePropertyOfMetadata(option_metadata_constants.metadata.FLAGARGVALUEREGEXP, metatype, '@CLIOption', false);
            if(flagArgValueRegExp){
                //flagArgValueRegExp is defined
                if(!(type_check.isRegExp(flagArgValueRegExp)))
                {
                    throw new MappingValidationException(error_messages.VALID_REGEXP_MAPPING(option_metadata_constants.metadata.FLAGARGVALUEREGEXP, option_typename, '@CLIOption'));
                }
                optProps.flagArgValueRegExp = flagArgValueRegExp;
            }

            this.validatePropertyIsString(option_metadata_constants.metadata.FLAGARG, flagArg, metatype, '@CLIOption');

            if(this.validatePropertyWithCallback(flagArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsRequiredOrOptional(prop)})){
                //isFlagArgRequired is defined
                if(isFlagArgRequired){
                    if(this.validatePropertyWithCallback(flagArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsRequired(prop)})){
                        optProps.flagArg = flagArg;
                        optProps.flagArgRaw = flagArg.substring(1,flagArg.length-1);
                    }else{
                        if(this.validatePropertyWithCallback(flagArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsOptional(prop)}))
                            throw new MappingValidationException(error_messages.FLAG_REQUIREMENT_PROVISO(option_typename));
                    }
                }else{
                    if(this.validatePropertyWithCallback(flagArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsOptional(prop)})){
                        optProps.flagArg = flagArg;
                        optProps.flagArgRaw = flagArg.substring(1,flagArg.length-1);
                    }else{
                        if(this.validatePropertyWithCallback(flagArg, (prop) => {return commander_check.isArgAlreadyFlaggedAsRequired(prop)}))
                            throw new MappingValidationException(error_messages.FLAG_OPTIONAL_PROVISO(option_typename));

                        
                    }
                }
            }
            else{
                optProps.flagArg = isFlagArgRequired ? `<${flagArg}>` : `[${flagArg}]`;
                optProps.flagArgRaw = flagArg;
            }
            
        }else{
            //no flag
            flagArgValueRegExp = this.validatePropertyOfMetadata(option_metadata_constants.metadata.FLAGARGVALUEREGEXP, metatype, '@CLIOption', false);
            if(flagArgValueRegExp){
               throw new MappingValidationException(error_messages.REGEXP_NEEDS_FLAGARG(option_typename, 
                option_metadata_constants.metadata.FLAGARGVALUEREGEXP,
                option_metadata_constants.metadata.FLAGARG
            ));
            }

        }
        var defaultValue = this.validatePropertyOfMetadata(option_metadata_constants.metadata.DEFAULTVALUE, metatype, '@CLIOption', false);
        if(defaultValue){
            //defaultValue is defined
            optProps.defaultValue=defaultValue;
        }

        return optProps;
    }

    validateCoreCommand(command){
        var cmdProps = {};
        var verbOption = {noHelp:false, isDefault:false};

        if (type_check.isUndefined(command.metatype)) {
            throw new MappingValidationException(`${command.name} has no @CLICommand properties to validate`);
        }

        var verb = this.validatePropertyOfMetadata(command_metadata_constants.metadata.VERB, command.metatype, '@CLICommand');
        if(this.validatePropertyWithCallback(verb, (prop) => {return commander_check.isVerbWithValidCharacters(prop)})){
            cmdProps.verb = verb;
        }else{
            throw new MappingValidationException(error_messages.INVALID_VERB_ASCII_MAPPING(command_metadata_constants.metadata.VERB, command.name, '@CLICommand'));
        }

        var verbDescription = this.validatePropertyOfMetadata(command_metadata_constants.metadata.VERBDESCRIPTION, command.metatype, '@CLICommand', false);
        if(verbDescription){
            //has verb description
            if(this.validatePropertyIsStringWithMessage(verbDescription, `The command verb's description must be a string.This is for ${command.name} class`)){
                cmdProps.verbDescription = verbDescription;
            }
        }

        var commandDescription = this.validatePropertyOfMetadata(command_metadata_constants.metadata.COMMANDDESCRIPTION, command.metatype, '@CLICommand', false);
        if(commandDescription){
            //has command description
            if(this.validatePropertyIsStringWithMessage(commandDescription, `The command's description must be a string.This is for ${command.name} class`)){
                cmdProps.commandDescription = commandDescription;
            }
        }

        var verbOpt = this.validatePropertyOfMetadata(command_metadata_constants.metadata.VERBOPTION, command.metatype, '@CLICommand', false);
        if(verbOpt){
            if(verbOpt.noHelp && type_check.isBoolean(verbOpt.noHelp)){verbOption.noHelp = verbOpt.noHelp}
            if(verbOpt.isDefault && type_check.isBoolean(verbOpt.isDefault)){verbOption.isDefault = verbOpt.isDefault}
            cmdProps.verbOption = verbOption;
        }

        var includeInHelpByDefault = this.validatePropertyOfMetadata(command_metadata_constants.metadata.INCLUDEINHELPBYDEFAULT, command.metatype, '@CLICommand', false);
        if(includeInHelpByDefault){
            if(type_check.isBoolean(includeInHelpByDefault)){
                cmdProps.includeInHelpByDefault = includeInHelpByDefault
            }else{
                throw new MappingValidationException(error_messages.INVALID_BOOLEAN_MAPPING(command_metadata_constants.metadata.INCLUDEINHELPBYDEFAULT, command.name, '@CLICommand'));
            }
        }else{cmdProps.includeInHelpByDefault = true}
        

        var alias = this.validatePropertyOfMetadata(command_metadata_constants.metadata.ALIAS, command.metatype, '@CLICommand', false);
        if(alias){
            if(type_check.isString(alias)){
                if(this.validatePropertyWithCallback(alias, (prop) => {return commander_check.isVerbWithValidCharacters(prop)})){
                    cmdProps.alias = alias;
                }else{
                    throw new MappingValidationException(error_messages.INVALID_ASCII_MAPPING(command_metadata_constants.metadata.ALIAS, command.name, '@CLICommand'));
                }
            }
        }

        var allowUnknownOption = this.validatePropertyOfMetadata(command_metadata_constants.metadata.ALLOWUNKNOWNOPTION, command.metatype, '@CLICommand', false);
        if(allowUnknownOption){
            if(type_check.isBoolean(allowUnknownOption)){
                cmdProps.allowUnknownOption = allowUnknownOption;
            }
        }
        return cmdProps;
    }
}

exports.CommanderValidator = CommanderValidator;
