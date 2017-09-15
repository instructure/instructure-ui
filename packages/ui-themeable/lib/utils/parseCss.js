'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;
exports.clean = clean;
var ruleTypes = exports.ruleTypes = {
  style: 1,
  keyframes: 7,
  media: 4
};

function parse() {
  var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var cleaned = clean(cssText);
  return parseLexed(lex(cleaned), cleaned);
}

function clean() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // remove comments and imports
  return text.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, '').replace(/@import[^;]*;/gim, '');
}

function lex(text) {
  var rootNode = {
    start: 0,
    end: text.length
  };
  var node = rootNode;
  var chars = text.split('');

  chars.forEach(function (char, i) {
    switch (char) {
      case '{':
        // eslint-disable-line no-case-declarations
        if (!node.rules) {
          node.rules = [];
        }
        var parent = node;
        var previous = parent.rules[parent.rules.length - 1];
        node = {
          start: i + 1,
          parent: parent,
          previous: previous
        };
        parent.rules.push(node);
        break;
      case '}':
        node.end = i + 1;
        node = node.parent || rootNode;
        break;
    }
  });
  return rootNode;
}

function parseSelector(node, text) {
  var start = node.previous ? node.previous.end : node.parent.start;
  var end = node.start - 1;

  var selector = text.substring(start, end);

  selector = selector.replace(/\s+/g, ' ');
  selector = selector.substring(selector.lastIndexOf(';') + 1);

  return selector.trim();
}

function parseRuleType(selector) {
  if (selector.indexOf('@') === 0) {
    if (selector.indexOf('@media') === 0) {
      return ruleTypes.media;
    } else if (selector.match(/^@[^\s]*keyframes/)) {
      return ruleTypes.keyframes;
    }
  } else {
    return ruleTypes.style;
  }
}

function parseLexed(node) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* eslint-disable no-param-reassign */

  if (node.parent) {
    node.selector = parseSelector(node, text);
    node.type = parseRuleType(node.selector);
  }

  node.cssText = text.substring(node.start, node.end - 1).trim();

  if (node.rules && node.rules.length > 0) {
    node.rules = node.rules.map(function (rule) {
      return parseLexed(rule, text);
    });
  }

  /* eslint-enable no-param-reassign */

  return node;
}