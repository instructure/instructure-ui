'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCssText;
exports.getCssTextWithPolyfill = getCssTextWithPolyfill;
exports.getCssTextWithVariables = getCssTextWithVariables;

var _replaceValuesWithVariableNames = require('./replaceValuesWithVariableNames');

var _replaceValuesWithVariableNames2 = _interopRequireDefault(_replaceValuesWithVariableNames);

var _formatVariableNames = require('./formatVariableNames');

var _formatVariableNames2 = _interopRequireDefault(_formatVariableNames);

var _applyCustomMediaToCss = require('./applyCustomMediaToCss');

var _applyCustomMediaToCss2 = _interopRequireDefault(_applyCustomMediaToCss);

var _customPropertiesSupported = require('./customPropertiesSupported');

var _customPropertiesSupported2 = _interopRequireDefault(_customPropertiesSupported);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the CSS as a string with variables applied
 *
 * @param {Function} template A template function that returns the CSS as a string with variables injected
 * @param {Object} variables JS variables
 * @param {string} prefix CSS variable prefix/namespace
 * @returns {String} css text
 */
function getCssText() {
  if ((0, _customPropertiesSupported2.default)()) {
    return getCssTextWithVariables.apply(this, arguments);
  } else {
    return getCssTextWithPolyfill.apply(this, arguments);
  }
}

function getCssTextWithPolyfill(template, variables) {
  // inject variable values
  var cssText = template(variables);

  // inject valules for @custom-media rules
  var customMedia = variables ? (0, _formatVariableNames2.default)(variables) : {};
  cssText = (0, _applyCustomMediaToCss2.default)(cssText, customMedia);

  return cssText;
}

function getCssTextWithVariables(template, variables, prefix) {
  var variableNames = variables ? (0, _replaceValuesWithVariableNames2.default)(variables, prefix) : {};

  // inject the CSS variable names into the style template
  var cssText = template(variableNames);

  // inject values for @custom-media rules (https://www.w3.org/TR/2016/WD-mediaqueries-4-20160126/#custom-mq)
  var customMedia = variables ? (0, _formatVariableNames2.default)(variables) : {};
  cssText = (0, _applyCustomMediaToCss2.default)(cssText, customMedia);

  var cssVariablesString = variables ? (0, _formatVariableNames2.default)(variables, prefix) : '';

  // append the CSS variables (defaults) to the result
  cssText = [cssText, variablesToCSSText(cssVariablesString)].join('\n');

  return cssText;
}

function variablesToCSSText(variables) {
  var names = Object.keys(variables || {});
  var rules = names.map(function (name) {
    return name + ': ' + variables[name];
  }).join(';\n');

  if (names.length > 0) {
    return '\n      :root {\n        ' + rules + ';\n      }\n    ';
  } else {
    return '';
  }
}