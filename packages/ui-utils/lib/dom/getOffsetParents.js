'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetParents;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _getComputedStyle = require('./getComputedStyle');

var _getComputedStyle2 = _interopRequireDefault(_getComputedStyle);

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOffsetParents(el) {
  var parents = [];

  if (!_canUseDOM2.default) {
    return parents;
  }

  var node = (0, _findDOMNode2.default)(el);

  if (node) {
    var parent = node;

    while ((parent = parent.parentNode) && parent && parent.nodeType === 1 && parent.tagName !== 'BODY') {
      if ((0, _getComputedStyle2.default)(parent).position !== 'static') {
        parents.push(parent);
      }
    }

    parents.push((0, _ownerDocument2.default)(node).body);
  }

  return parents;
}