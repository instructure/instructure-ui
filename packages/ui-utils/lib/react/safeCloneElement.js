'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeCloneElement;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('../warning');

var _warning2 = _interopRequireDefault(_warning);

var _createChainedFunction = require('../createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function safeCloneElement(element, props) {
  var cloneRef = props.ref;
  var originalRef = element.ref;
  var originalRefIsAFunction = typeof originalRef === 'function';

  var mergedProps = Object.assign({}, props);

  if (element.props.style && props.style) {
    // merge with existing styles
    mergedProps.style = Object.assign({}, element.props.style, props.style);
  }

  // prevent overriding existing keys
  mergedProps.key = element.key || props.key;

  // Add chained function to preserve existing event handlers
  Object.keys(props).forEach(function (prop) {
    // If prop looks like an event handler "on*" and either
    // props[props] or element.props[prop] is a function create a chained function.
    // If only one is a function it will just use that function with no extra overhead.
    // This is necessary in cases where props[prop] is `null` or `undefined` which would
    // otherwise unwantedly override element.props[prop].
    if (prop.indexOf('on') === 0 && (typeof props[prop] === 'function' || typeof element.props[prop] === 'function')) {
      mergedProps[prop] = (0, _createChainedFunction2.default)(element.props[prop], props[prop]);
    }
  });

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (originalRef == null || cloneRef == null) {
    return _react2.default.cloneElement.apply(_react2.default, [element, mergedProps].concat(children));
  }

  (0, _warning2.default)(originalRefIsAFunction, 'Cloning an element with a ref that will be overwritten because the ref is not a function. Use a composable callback-style ref instead. Ignoring ref: ' + originalRef);

  return _react2.default.cloneElement.apply(_react2.default, [element, Object.assign({}, mergedProps, {
    ref: function ref(component) {
      cloneRef(component);
      originalRef(component);
    }
  })].concat(children));
}