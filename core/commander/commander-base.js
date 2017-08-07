require("reflect-metadata");
const type_check = require("../../common/utils/type-check.utils");
const UnknownCliProgramException = require("../errors/exceptions/unknown-program.exception").UnknownCliProgramException;

class CommanderBase {
    constructor(program) {
        this.program = program;
    }

    reflectMetadata(key, type = null) {
        if(!this.program){
            throw new UnknownCliProgramException();
        }
        return Reflect.getMetadata(key, type_check.isNil(type) ? this.program.metatype : type);
    }

    getProgram(){return this.program}

}

exports.CommanderBase = CommanderBase;