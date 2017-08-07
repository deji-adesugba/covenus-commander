import { CliProgramMetatype } from '../../common/interfaces/programs/program-metatype.interface';

export declare class CliProgramTokenFactory {
    create(metatype: CliProgramMetatype, scope: CliProgramMetatype[]): string;
    geCliProgramName(metatype: CliProgramMetatype): string;
    getScopeStack(scope: CliProgramMetatype[]): string[];
    private reflectScope(metatype);
}
