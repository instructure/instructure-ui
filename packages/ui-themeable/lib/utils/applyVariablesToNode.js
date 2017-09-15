'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyVariablesToNode;
exports.applyVariablesPolyfillToNode = applyVariablesPolyfillToNode;
exports.applyVariablesToNodeStyle = applyVariablesToNodeStyle;

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var _scopeStylesToNode = require('./scopeStylesToNode');

var _scopeStylesToNode2 = _interopRequireDefault(_scopeStylesToNode);

var _formatVariableNames = require('./formatVariableNames');

var _formatVariableNames2 = _interopRequireDefault(_formatVariableNames);

var _pickOverrides = require('./pickOverrides');

var _pickOverrides2 = _interopRequireDefault(_pickOverrides);

var _customPropertiesSupported = require('./customPropertiesSupported');

var _customPropertiesSupported2 = _interopRequireDefault(_customPropertiesSupported);

var _getCssText = require('./getCssText');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Apply custom style properties to a dom node (with polyfill for IE)
 *
 * @param {Element} domNode HTML element to apply variables to using the style attribute
 * @param {Object} variables JS variables
 * @param {Object} defaults Default JS variables
 * @param {String} prefix A variable prefix/namespace
 * @param {Function} template (for IE) A template function that returns the CSS as a string with variables injected
 * @param {String} scope (for IE) A scope to apply to the styles applied to domNode
 */
function applyVariablesToNode() {
  if ((0, _customPropertiesSupported2.default)() && !(_bowser2.default.msedge && _bowser2.default.version >= 15)) {
    // polyfill edge 15 until improved css variable support
    applyVariablesToNodeStyle.apply(this, arguments);
  } else {
    applyVariablesPolyfillToNode.apply(this, arguments);
  }
}

function applyVariablesPolyfillToNode(domNode, variables, defaults, prefix, template, scope) {
  if (!domNode) {
    return;
  }

  var overrides = (0, _pickOverrides2.default)(defaults, variables);
  var cssText = '';

  if (overrides && Object.keys(overrides).length > 0) {
    cssText = (0, _getCssText.getCssTextWithPolyfill)(template, Object.assign({}, defaults, variables));
  }

  (0, _scopeStylesToNode2.default)(domNode, cssText, scope);
}

function applyVariablesToNodeStyle(domNode, variables, defaults, prefix) {
  if (!domNode) {
    return;
  }

  clearCustomProperties(domNode, prefix);

  var overrides = (0, _pickOverrides2.default)(defaults, variables);

  if (overrides && Object.keys(overrides).length > 0) {
    setCustomProperties(domNode, (0, _formatVariableNames2.default)(overrides, prefix));
  }
}

function clearCustomProperties(domNode, prefix) {
  var styles = domNode.style;
  for (var i = styles.length - 1; i >= 0; i--) {
    var prop = styles[i];
    if (prop.indexOf('--' + prefix + '-') >= 0) {
      domNode.style.removeProperty(prop);
    }
  }
}

function setCustomProperties(domNode, properties) {
  Object.keys(properties).forEach(function (propertyName) {
    var value = properties[propertyName];

    if (value) {
      domNode.style.setProperty(propertyName, value);
    }
  });
}