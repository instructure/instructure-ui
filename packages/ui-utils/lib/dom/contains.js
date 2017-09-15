'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _canUseDOM2.default ? contains : fallback;


function contains(context, el) {
  var container = (0, _findDOMNode2.default)(context);
  var node = (0, _findDOMNode2.default)(el);

  if (!container || !node) {
    return false;
  } else if (container.contains) {
    return container.contains(node);
  } else if (container.compareDocumentPosition) {
    return container === node || !!(container.compareDocumentPosition(node) & 16); // eslint-disable-line no-bitwise
  } else {
    return fallback(container, node);
  }
}

/* istanbul ignore next  */
function fallback(context, el) {
  var node = el;

  while (node) {
    if (node === context) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}