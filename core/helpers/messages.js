"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.CliProgramInitMessage = (cliProgram) => `${cliProgram} dependencies initialized`;
exports.CommandMappingMessage = (name) => `${name}:`;
exports.CommanderMappedMessage = (name, type, cliProgram) => `Mapped ${name} ${type} for ${cliProgram} program`;

