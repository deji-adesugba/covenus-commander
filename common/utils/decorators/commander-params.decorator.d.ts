import 'reflect-metadata';
export declare type ParamData = object | string | number;
export interface CommanderParamsMetadata {
    [prop: number]: {
        index: number;
        data?: ParamData;
    };
}

export declare const RequiredArg: (property?: string) => ParameterDecorator;
export declare const OptionalArg: (property?: string) => ParameterDecorator;
export declare const VariadicArg: (property?: string) => ParameterDecorator;
export declare const CommandOptionArg: (property?: string) => ParameterDecorator;
export declare const ProgramOptionArg: (property?: string) => ParameterDecorator;
export declare const OptionVal: (property?: string) => ParameterDecorator;
export declare const OptionDefault: (property?: string) => ParameterDecorator;
export declare const ReqArg: (property?: string) => ParameterDecorator;
export declare const OptArg: (property?: string) => ParameterDecorator;
export declare const VarArg: (property?: string) => ParameterDecorator;
export declare const CmdOptArg: (property?: string) => ParameterDecorator;
export declare const PrgOptArg: (property?: string) => ParameterDecorator;
export declare const OptVal: (property?: string) => ParameterDecorator;
export declare const OptDef: (property?: string) => ParameterDecorator;

