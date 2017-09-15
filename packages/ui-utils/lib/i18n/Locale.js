'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function browserLocale() {
  var nav = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator;

  if (typeof nav !== 'undefined') {
    return nav.language;
  }
  return 'en';
}

exports.default = { browserLocale: browserLocale };