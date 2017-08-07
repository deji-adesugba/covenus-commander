"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OptionParamTypes = require("../../common/enums/option-paramtypes.enum").OptionParamTypes;

class OptionParamsFactory {
    exchangeKeyForValue(optParamsKey, optNameKey, {optionValue, optionDefault}) {
        switch (optParamsKey) {
            case OptionParamTypes.VALUE: return optNameKey ? optionValue[optNameKey] : optionValue;
            case OptionParamTypes.DEFAULT: return optNameKey ? optionDefault[optNameKey] : optionDefault;
            default: return null;
        }
    }
}
exports.OptionParamsFactory = OptionParamsFactory;
