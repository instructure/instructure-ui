'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBoundingClientRect;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _contains = require('./contains');

var _contains2 = _interopRequireDefault(_contains);

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBoundingClientRect(el) {
  var rect = { top: 0, left: 0, height: 0, width: 0 };

  if (!_canUseDOM2.default) {
    return rect;
  }

  var node = (0, _findDOMNode2.default)(el);

  if (!node) {
    return rect;
  }

  if (node === window) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
      width: window.innerWidth,
      height: window.innerHeight,
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset
    };
  }

  var doc = el === document ? document : (0, _ownerDocument2.default)(node);
  var docEl = doc && doc.documentElement;

  if (!docEl || !(0, _contains2.default)(docEl, node)) {
    return rect;
  }

  var boundingRect = node.getBoundingClientRect();

  var k = void 0;

  // eslint-disable-next-line no-restricted-syntax
  for (k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (doc !== document) {
    var frameElement = doc.defaultView.frameElement;
    if (frameElement) {
      var frameRect = getBoundingClientRect(frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  /* eslint-disable no-mixed-operators */
  return {
    top: rect.top + (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0),
    left: rect.left + (window.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0),
    width: (rect.width == null ? node.offsetWidth : rect.width) || 0,
    height: (rect.height == null ? node.offsetHeight : rect.height) || 0,
    right: doc.body.clientWidth - rect.width - rect.left,
    bottom: doc.body.clientHeight - rect.height - rect.top
    /* eslint-enable no-mixed-operators */
  };
}