'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
function warning(condition, message) {
  if (!condition && process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    console.error.apply(undefined, ['Warning: ' + message].concat(args));
  }
}