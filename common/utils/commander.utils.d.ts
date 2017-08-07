export declare const isShortFlagASingleCharacter: (shortFlag: string) => boolean;
export declare const isShortFlagWithDashAlready: (shortFlag: string) => boolean;
export declare const isShortFlagAValidCharacter: (shortFlag: string) => boolean;
export declare const isShortFlagAlreadyMarkedWithDashAndValid: (shortFlag: string) => boolean;

export declare const isFullFlagWithDoubleDashAlready: (fullFlag: string) => boolean;
export declare const isFullFlagWithValidCharacters: (fullFlag: string) => boolean;
export declare const isFullFlagAlreadyMarkedWithDoubleDashAndValid: (fullFlag: string) => boolean;

export declare const isArgAlreadyFlaggedAsOptional: (arg: string) => boolean;
export declare const isArgAlreadyFlaggedAsRequired: (arg: string) => boolean;
export declare const isArgAlreadyFlaggedAsRequiredOrOptional: (arg: string) => boolean;
export declare const camelCaseFullFlag: (fullFlag: string) => string;
export declare const isArgWithValidCharacters: (arg: string) => boolean;
export declare const isArgAlreadyFlaggedAsVariadic: (arg: string) => boolean;
export declare const isVerbWithValidCharacters: (arg: string) => boolean;
export declare const camelCaseParameter: (parameter: string) => string;
