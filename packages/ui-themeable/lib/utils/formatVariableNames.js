'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatVariableNames;

var _formatVariableName = require('./formatVariableName');

var _formatVariableName2 = _interopRequireDefault(_formatVariableName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatVariableNames(variables, prefix) {
  var formatted = {};
  Object.keys(variables || {}).forEach(function (key) {
    formatted[(0, _formatVariableName2.default)(key, prefix)] = variables[key];
  });
  return formatted;
}