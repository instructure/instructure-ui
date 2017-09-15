'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addPositionChangeListener;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _getBoundingClientRect = require('./getBoundingClientRect');

var _getBoundingClientRect2 = _interopRequireDefault(_getBoundingClientRect);

var _requestAnimationFrame = require('./requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addPositionChangeListener(el, handler) {
  var node = (0, _findDOMNode2.default)(el);
  var raf = [];

  var coords = (0, _getBoundingClientRect2.default)(node) || {};
  var cancelled = false;

  function checkPosition() {
    if (cancelled === false) {
      var newCoords = (0, _getBoundingClientRect2.default)(node) || {};
      var positionChanged = newCoords.top !== coords.top || newCoords.left !== coords.left || newCoords.right !== coords.right || newCoords.bottom !== coords.bottom || newCoords.width !== coords.width || newCoords.height !== coords.height;

      if (positionChanged && typeof handler === 'function') {
        handler(newCoords);
      }

      coords = newCoords;

      raf.push((0, _requestAnimationFrame2.default)(checkPosition));
    }
  }

  checkPosition();

  return {
    remove: function remove() {
      cancelled = true;
      raf.forEach(function (req) {
        return req.cancel();
      });
    }
  };
}