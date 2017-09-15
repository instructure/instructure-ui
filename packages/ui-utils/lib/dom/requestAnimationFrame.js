'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var requestAnimationFrame = void 0;

  /* istanbul ignore else  */
  if (_canUseDOM2.default && window.requestAnimationFrame && window.cancelAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(cb) {
      var id = window.requestAnimationFrame(cb);
      return {
        cancel: function cancel() {
          return window.cancelAnimationFrame(id);
        }
      };
    };
  } else {
    /* https://github.com/component/raf */
    var prev = new Date().getTime();

    requestAnimationFrame = function requestAnimationFrame(cb) {
      var curr = new Date().getTime();
      var ms = Math.max(0, 16 - (curr - prev));
      var req = setTimeout(cb, ms);
      prev = curr;
      return {
        cancel: function cancel() {
          return clearTimeout(req);
        }
      };
    };
  }

  return requestAnimationFrame;
}();