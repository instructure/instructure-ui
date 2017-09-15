'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListener;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addEventListener(el, event, handler, capture) {
  var node = el === window || el === document ? el : (0, _findDOMNode2.default)(el);
  node.addEventListener(event, handler, capture);

  return {
    remove: function remove() {
      node.removeEventListener(event, handler, capture);
    }
  };
}