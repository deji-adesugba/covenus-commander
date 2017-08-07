"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const type_check = require("./type-check.utils");

exports.isShortFlagASingleCharacter = (shortFlag) => {
    if(type_check.isNil(shortFlag))
        return false;

    if(type_check.isString(shortFlag))
    {
        if(shortFlag.length == 1)
            return true;
    }

    return false;
}

exports.isShortFlagWithDashAlready = (shortFlag) => {
    if(type_check.isNil(shortFlag))
        return false;

    if(type_check.isString(shortFlag))
    {
        if(shortFlag.length == 2 && shortFlag.indexOf('-')==0) 
        {
            return true;
        }
            
    }

    return false;
}

exports.isShortFlagAValidCharacter = (shortFlag) => {

    if(exports.isShortFlagASingleCharacter(shortFlag))
    {
        var letters = /^[a-zA-Z]+$/;
        if(shortFlag.match(letters))
            return true;
    }
    return false;
}

exports.isShortFlagAlreadyMarkedWithDashAndValid = (shortFlag) => {
    if(exports.isShortFlagWithDashAlready(shortFlag))
    {
        if(exports.isShortFlagAValidCharacter(shortFlag.substring(1)))
            return true;
    }

    return false;
}
//---------------------------------------------------------------

exports.isFullFlagWithValidCharacters = (fullFlag) => {
    if(type_check.isNil(fullFlag))
        return false;

    if(type_check.isString(fullFlag))
    {
        var letters = /^[a-zA-Z-@*:_]+$/;
        if(fullFlag.match(letters))
            return true;
    }

    return false;
}

exports.isFullFlagWithDoubleDashAlready = (fullFlag) => {
    if(type_check.isNil(fullFlag))
        return false;

    if(type_check.isString(fullFlag))
    {
        if(fullFlag.length > 2 && fullFlag.indexOf('--')==0) 
        {
            return true;
        }
            
    }

    return false;
}

exports.isFullFlagAlreadyMarkedWithDoubleDashAndValid = (fullFlag) => {
    if(exports.isFullFlagWithDoubleDashAlready(fullFlag))
    {
        if(exports.isFullFlagWithValidCharacters(fullFlag.substring(2)))
            return true;
    }

    return false;
}

var isArgSurroundedBy = (arg, startDelimiter, endDelimiter) => {
    if(type_check.isNil(arg) || type_check.isNil(startDelimiter) || type_check.isNil(endDelimiter))
        return false;

    if(type_check.isString(arg))
    {
        if(arg.startsWith(startDelimiter) && arg.endsWith(endDelimiter)) 
        {
            return true;
        }
                
    }
    
    return false;
}

exports.isArgAlreadyFlaggedAsVariadic = (arg) => {
    if(type_check.isNil(arg))
        return false;

    if(type_check.isString(arg))
    {
        if(arg.endsWith('...')) 
        {
            return true;
        }
                
    }

    return false;
}

exports.isArgAlreadyFlaggedAsOptional = (arg) => {
    if(isArgSurroundedBy(arg,'[', ']'))
    {
        return true;
    }

    return false;
}

exports.isArgAlreadyFlaggedAsRequired = (arg) => {
    if(isArgSurroundedBy(arg,'<', '>'))
    {
        return true;
    }

    return false;
}

exports.isArgAlreadyFlaggedAsRequiredOrOptional = (arg) => {
    if(exports.isArgAlreadyFlaggedAsRequired(arg) || exports.isArgAlreadyFlaggedAsOptional(arg))
    {
        return true;
    }

    return false;
}

exports.camelCaseFullFlag = (fullFlag) => {
    if(type_check.isNil(fullFlag))
        return;

    var index = -1;
    var flagLength = fullFlag.length;
    var camelLetterIndex = -1;
    var afterCamelLetterIndex = -1;
    var lastSubstr;
    while((index = fullFlag.indexOf('-')) != -1)
    {
        camelLetterIndex = index + 1;
        afterCamelLetterIndex = camelLetterIndex + 1;
        lastSubstr = (afterCamelLetterIndex == flagLength) ? "": fullFlag.substr(camelLetterIndex+1);
        if(camelLetterIndex <= flagLength)
        {
            fullFlag = fullFlag.substr(0, index) + fullFlag.charAt(camelLetterIndex).toUpperCase() + lastSubstr;
        }

    }
    return fullFlag;
}

exports.isArgWithValidCharacters = (arg) => {
    if(type_check.isNil(arg))
        return false;

    if(type_check.isString(arg))
    {
        var letters = /^[a-zA-Z-@*:_]+$/;
        if(arg.match(letters))
            return true;
    }

    return false;
}

exports.isVerbWithValidCharacters = (arg) => {
    if(type_check.isNil(arg))
        return false;

    if(type_check.isString(arg))
    {
        var letters = /^[a-zA-Z-:@*_]+$/;
        if(arg.match(letters))
            return true;
    }

    return false;
}

exports.camelCaseParameter = exports.camelCaseFullFlag;

