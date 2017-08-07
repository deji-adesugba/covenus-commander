import { OptionParamTypes } from '../../common/enums/option-paramtypes.enum';
import { IOptionParamsFactory } from './interfaces/option-params-factory.interface';

export declare class OptionParamsFactory implements IOptionParamsFactory {
    exchangeKeyForValue(optParamsKey: OptionParamTypes, optNameKey: any, {optionValue, optionDefault}: {
        optionValue: any;
        optionDefault: any;
        
    }): any;
}
