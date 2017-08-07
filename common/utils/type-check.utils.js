"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.isUndefined = (obj) => typeof obj === 'undefined';
exports.isFunction = (fn) => typeof fn === 'function';
exports.isRegExp = (fn) => fn instanceof RegExp;
exports.isObject = (fn) => typeof fn === 'object';
exports.isBoolean = (fn) => typeof fn === 'boolean';
exports.isString = (fn) => typeof fn === 'string';
/*
exports.isConstructor = (fn) => {
    try {
    new fn();
  } catch (err) {
    if (err.message.indexOf('is not a constructor')) {
      return false;
    }
  }
  return true;
}
*/
exports.isConstructor = (fn) => fn === 'constructor';
exports.validatePath = (path) => (path.charAt(0) !== '/') ? '/' + path : path;
exports.isNil = (obj) => exports.isUndefined(obj) || obj === null;
exports.isEmpty = (arr) => !(arr && arr.length > 0);
exports.isStringEmpty = (str) => (!str);
exports.isInt = (value) => {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}
