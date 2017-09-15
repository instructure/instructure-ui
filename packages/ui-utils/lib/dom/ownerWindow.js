'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el) {
  var node = el && (0, _findDOMNode2.default)(el);
  var doc = (0, _ownerDocument2.default)(node);
  return doc && (doc.defaultView || doc.parentWindow);
};

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }