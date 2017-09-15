'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActiveElement;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _getActiveElement = require('./getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isActiveElement(el) {
  var node = el && (0, _findDOMNode2.default)(el);
  return node && (0, _getActiveElement2.default)() === node;
}