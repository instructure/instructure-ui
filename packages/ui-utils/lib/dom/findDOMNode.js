'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findDOMNode;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findDOMNode(el) {
  if (el === window) {
    return el;
  } else if (el === document) {
    return document.documentElement;
  } else if (el) {
    return _reactDom2.default.findDOMNode(el); // eslint-disable-line react/no-find-dom-node
  }
}