'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerDocument;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownerDocument(el) {
  var node = el && (0, _findDOMNode2.default)(el);
  return node && node.ownerDocument || document;
}