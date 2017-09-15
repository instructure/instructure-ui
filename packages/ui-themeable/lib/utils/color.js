'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alpha = alpha;
exports.darken = darken;
exports.lighten = lighten;
exports.contrast = contrast;
exports.isValid = isValid;

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alpha(color, percent) {
  return (0, _tinycolor2.default)(color).setAlpha(percent / 100).toRgbString();
}

function darken(color, percent) {
  return (0, _tinycolor2.default)(color).darken(percent).toRgbString();
}

function lighten(color, percent) {
  return (0, _tinycolor2.default)(color).lighten(percent).toRgbString();
}

function contrast(color1, color2) {
  return _tinycolor2.default.readability(color1, color2);
}

function isValid(color) {
  return (0, _tinycolor2.default)(color).isValid();
}