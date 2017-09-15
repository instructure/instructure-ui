"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pickOverrides;
function pickOverrides(defaultTheme, theme) {
  var overrides = {};

  // filter out any properties that have values that are the same as in defaults
  Object.keys(theme || {}).forEach(function (key) {
    if (defaultTheme[key] !== theme[key]) {
      overrides[key] = theme[key];
    }
  });

  return overrides;
}