import { Option } from '../options/option.interface';

export declare interface VerbOption{
    noHelp?: boolean;
    isDefault?: boolean;
}

export declare interface CommandMetadata {
    verb: string;
    verbDescription?: string;
    commandDescription?: string;
    verbOption?: VerbOption;
    options?: Option[] | any[];
    requiredArgs?: string[];
    optionalArgs?: string[];
    variadicLastArg?: string;
    alias?: string;
    allowUnknownOption?: boolean;
    includeInHelpByDefault?: boolean;
}
