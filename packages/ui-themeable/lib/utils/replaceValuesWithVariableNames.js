'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceValuesWithVariableNames;

var _formatVariableName = require('./formatVariableName');

var _formatVariableName2 = _interopRequireDefault(_formatVariableName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceValuesWithVariableNames(variables, prefix) {
  var map = {};

  Object.keys(variables || {}).forEach(function (variableName) {
    map[variableName] = 'var(' + (0, _formatVariableName2.default)(variableName, prefix) + ')';
  });

  return map;
}