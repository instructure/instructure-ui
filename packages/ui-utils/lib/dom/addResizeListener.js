'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addResizeListener;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _requestAnimationFrame = require('./requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: replace with https://wicg.github.io/ResizeObserver/ when it's supported
function addResizeListener(el, handler) {
  var node = (0, _findDOMNode2.default)(el);
  var width = node.offsetWidth;
  var cancelled = false;
  var raf = void 0;

  var checkDimensions = function checkDimensions() {
    if (cancelled) {
      return;
    }

    var size = {
      width: node.offsetWidth,
      height: node.offsetHeight
    };

    if (size.width !== width && typeof handler === 'function') {
      handler(size);
    }

    width = size.width;

    raf = (0, _requestAnimationFrame2.default)(checkDimensions);
  };

  checkDimensions();

  return {
    remove: function remove() {
      cancelled = true;
      raf.cancel();
    }
  };
}