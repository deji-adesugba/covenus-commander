"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const type_check = require("../../common/utils/type-check.utils");

class StringWriter {
    constructor() {
        this.contents = [];
    }

    writeLine(content){
        this.writeHelper(content, true);
    }

    write(content){
        this.writeHelper(content);
    }

    writeHelper(content, endWithLine = false){
        var end = endWithLine ? '\n' : '';
        if(content){
            if(type_check.isString(content)){
                this.contents.push(`${content} ${end}`);
            }else{
                content = JSON.stringify(content);
                this.contents.push(`${content} ${end}`);
            }
        }else{
            if(endWithLine){
                this.contents.push(`${end}`);
            }
        }
    }

    getStringContent(){
        return this.contents.join(' ');
    }

}

exports.StringWriter = StringWriter;