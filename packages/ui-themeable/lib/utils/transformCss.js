'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformCss;
exports.isKeyframesSelector = isKeyframesSelector;
exports.toRules = toRules;

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var _parseCss = require('./parseCss');

var _parseCss2 = _interopRequireDefault(_parseCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformCss(cssText, transform) {
  var node = (0, _parseCss2.default)(cssText);

  if (typeof transform === 'function') {
    node = transformNode(node, transform);
  }

  return toCssText(node);
}

function isKeyframesSelector(rule) {
  return rule.parent && rule.parent.type === _parseCss.ruleTypes.keyframes;
}

function toRules(cssText) {
  var node = (0, _parseCss2.default)(cssText);
  var rules = [];

  if (node.rules && node.rules.length > 0) {
    rules = node.rules.filter(function (rule) {
      return filterUnusedVendorRule(rule.selector);
    }).map(function (rule) {
      return toCssText(rule);
    });
  } else {
    var _cssText = toCssText(node);
    if (_cssText) {
      rules = [_cssText];
    }
  }

  return rules;
}

function transformNode(node, transform) {
  if (!node) {
    return;
  }

  if (node.type === _parseCss.ruleTypes.style) {
    return transform(node);
  }

  var rules = node.rules || [];
  var transformed = Object.assign({}, node);

  transformed.rules = rules.map(function (rule) {
    return transformNode(rule, transform);
  });

  return transformed;
}

function toCssText(node, text) {
  var cssText = '';
  var result = text || '';

  if (node.rules && node.rules.length > 0) {
    cssText = node.rules.map(function (rule) {
      return toCssText(rule, cssText);
    }).join('\n');
  } else {
    cssText = node.cssText.trim();

    if (cssText) {
      cssText = '  ' + cssText + '\n';
    }
  }

  if (cssText) {
    var prefix = node.selector ? node.selector + ' {\n' : '';
    var suffix = node.selector ? '}\n' : '';
    result += '' + prefix + cssText + suffix;
  }

  return result;
}

function filterUnusedVendorRule(selector) {
  if (!(_bowser2.default.msedge || _bowser2.default.msie) && selector.indexOf('-ms-') > -1) {
    return false;
  }

  if (!(_bowser2.default.webkit || _bowser2.default.msedge || _bowser2.default.blink) && selector.indexOf('-webkit-') > -1) {
    return false;
  }

  if (!_bowser2.default.gecko && selector.indexOf('-moz-') > -1) {
    return false;
  }

  return true;
}