'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeStylesToNode;
exports.scopeCssText = scopeCssText;

var _transformCss = require('./transformCss');

var _transformCss2 = _interopRequireDefault(_transformCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeStylesToNode(domNode, cssText, scope) {
  var styleNode = domNode.querySelector('#' + scope);
  var attr = scope.toLowerCase();

  if (!cssText) {
    if (styleNode) {
      if (!styleNode.scoped) {
        removeScopeFromDomNode(domNode, attr);
      }
      domNode.removeChild(styleNode);
    }
  } else {
    var shouldInsertNode = !styleNode;
    var scopedCSS = cssText;

    if (shouldInsertNode) {
      styleNode = document.createElement('style');
      styleNode.setAttribute('scoped', true);
      styleNode.setAttribute('type', 'text/css');
      styleNode.id = scope;
    }

    if (!styleNode.scoped) {
      // if scoped styles are not supported
      addScopeToDomNode(domNode, attr);
      scopedCSS = scopeCssText(scopedCSS, '[' + attr + ']');
    }

    if (shouldInsertNode) {
      domNode.insertBefore(styleNode, domNode.firstChild);
    }

    if ('textContent' in styleNode) {
      styleNode.textContent = scopedCSS;
    } else {
      styleNode.styleSheet.cssText = scopedCSS;
    }
  }
}

function scopeCssText(cssText, scope) {
  return (0, _transformCss2.default)(cssText, function (rule) {
    var transformed = Object.assign({}, rule);
    if (!rule.isScoped) {
      transformed.selector = scopeRule(rule, scope);
      transformed.isScoped = true;
    }
    return transformed;
  });
}

function addScopeToDomNode(node, scope) {
  // for SVG nodes children is undefined in IE/Edge
  var children = node.children || node.childNodes;

  if (node.setAttribute) {
    node.setAttribute(scope, '');
  }

  for (var i = 0; i < children.length; i++) {
    addScopeToDomNode(children[i], scope);
  }
}

function removeScopeFromDomNode(node, scope) {
  var children = node.children || node.childNodes;

  if (node.removeAttribute) {
    node.removeAttribute(scope);
  }

  for (var i = 0; i < children.length; i++) {
    removeScopeFromDomNode(children[i], scope);
  }
}

function isRootSelector(selector) {
  return selector.match(/^(_|html|body|\:root)/i);
}

function scopeSimpleSelector(selector, scope) {
  var parts = selector.split(':');
  parts[0] += scope;
  return parts.join(':');
}

function scopeCompoundSelector(selector, combinator, scope) {
  if (isRootSelector(selector)) {
    return selector;
  }

  var scopedSelector = scope ? scopeSimpleSelector(selector, scope) : selector;

  return combinator + scopedSelector;
}

function scopeComplexSelector(selector, scope) {
  var scopedSelector = selector.trim();

  scopedSelector = scopedSelector.replace(/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g, function (match, combinator, selector) {
    return scopeCompoundSelector(selector, combinator, scope);
  });
  return scopedSelector;
}

function scopeRule(rule, scope) {
  var parts = rule.selector.split(',');

  if (!(0, _transformCss.isKeyframesSelector)(rule)) {
    parts = parts.map(function (part) {
      return scopeComplexSelector(part, scope);
    });
  }

  return parts.join(',');
}