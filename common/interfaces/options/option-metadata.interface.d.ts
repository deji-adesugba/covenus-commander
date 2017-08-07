export declare interface OptionMetadata {
    shortFlag: string;
    fullFlag: string;
    flagArg?: string;
    flagArgValueRegExp?: RegExp;
    flagArgValueHintForRegExp?: string;
    isFlagArgRequired?: boolean;
    description: string;
    defaultValue?: any;
}