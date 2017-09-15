'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureSingleChild;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeCloneElement = require('./safeCloneElement');

var _safeCloneElement2 = _interopRequireDefault(_safeCloneElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureSingleChild(child) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var childCount = _react.Children.count(child);

  if (childCount === 0) {
    return null;
  } else if (typeof child === 'string' && child.length > 0 || childCount > 1) {
    return _react2.default.createElement(
      'span',
      props,
      child
    );
  } else {
    return (0, _safeCloneElement2.default)(child, props);
  }
}