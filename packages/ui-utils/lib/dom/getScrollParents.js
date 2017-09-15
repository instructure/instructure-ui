'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScrollParents;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _getComputedStyle = require('./getComputedStyle');

var _getComputedStyle2 = _interopRequireDefault(_getComputedStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollParents(el) {
  var parents = [];

  if (!_canUseDOM2.default) {
    return parents;
  }

  var node = (0, _findDOMNode2.default)(el);

  if (node) {
    // In firefox if the element is inside an iframe with display: none; window.getComputedStyle() will return null;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = (0, _getComputedStyle2.default)(node) || {};
    var position = computedStyle.position;

    if (position === 'fixed') {
      return [node.ownerDocument];
    }

    var parent = node;
    while (parent && parent.nodeType === 1 && (parent = parent.parentNode)) {
      var style = void 0;
      try {
        style = (0, _getComputedStyle2.default)(parent);
      } catch (err) {} // eslint-disable-line no-empty

      if (typeof style === 'undefined' || style === null) {
        parents.push(parent);
        return parents;
      }

      var _style = style,
          overflow = _style.overflow,
          overflowX = _style.overflowX,
          overflowY = _style.overflowY;


      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
          parents.push(parent);
        }
      }
    }

    parents.push(node.ownerDocument.body);

    // If the node is within a frame, account for the parent window scroll
    if (node.ownerDocument !== document) {
      parents.push(node.ownerDocument.defaultView);
    }
  }

  return parents;
}