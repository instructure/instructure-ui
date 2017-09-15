'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComputedStyle;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComputedStyle(el) {
  var style = {};

  if (_canUseDOM2.default) {
    var node = el && (0, _findDOMNode2.default)(el);
    style = node ? window.getComputedStyle(node) : {};
  }

  return style;
}