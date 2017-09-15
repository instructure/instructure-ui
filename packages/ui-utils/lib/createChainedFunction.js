'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * Forked from: https://github.com/react-bootstrap/react-overlays/blob/master/src/utils/createChainedFunction.js
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f, i) {
    if (f == null) {
      return false;
    }

    // Only allow the first of identical functions
    var indexes = getAllIndexes(funcs, f);
    return indexes.length === 1 || i === indexes[0];
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

exports.default = createChainedFunction;

/**
 * Find all indexes for a value in an Array
 *
 * @param {array} arr The Array to search for val
 * @param {*} val The value to find indexes for
 * @return {array} All the indexes of the Array matching val
 */

function getAllIndexes(arr, val) {
  var indexes = [];

  arr.forEach(function (e, i) {
    if (e === val) {
      indexes.push(i);
    }
  });

  return indexes;
}