'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = mergeDeep;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function mergeDeep() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  var target = {};

  args.forEach(function (arg) {
    target = mergeSourceIntoTarget(target, arg);
  });

  return target;
}

function mergeSourceIntoTarget(target, source) {
  if (isObject(source)) {
    var keys = [].concat(_toConsumableArray(Object.keys(source)), _toConsumableArray(Object.getOwnPropertySymbols(source)));
    var merged = Object.assign({}, target);

    keys.forEach(function (key) {
      if (isObject(target[key]) && isObject(source[key])) {
        merged[key] = mergeSourceIntoTarget(target[key], source[key]);
      } else if (isArray(source[key]) && isArray(target[key])) {
        merged[key] = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(target[key]), _toConsumableArray(source[key])))));
      } else if (isArray(target[key])) {
        merged[key] = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(target[key]), [source[key]]))));
      } else {
        merged[key] = source[key];
      }
    });

    return merged;
  } else {
    return Object.assign({}, target);
  }
}

function isObject(item) {
  return item && ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' || typeof item === 'function') && !Array.isArray(item);
}

function isArray(item) {
  return item && Array.isArray(item);
}