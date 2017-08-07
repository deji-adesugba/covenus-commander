import { OptionParamTypes } from '../../../common/enums/option-paramtypes.enum';

export interface IOptionParamsFactory {
    exchangeKeyForValue(optParamsKey: OptionParamTypes, optNameKey: any, {optionValue, optionDefault}: {
        optionValue: any;
        optionDefault: any;
    }): any;
}
