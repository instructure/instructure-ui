'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('./dom');

var dom = _interopRequireWildcard(_dom);

var _i18n = require('./i18n');

var i18n = _interopRequireWildcard(_i18n);

var _react = require('./react');

var react = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  dom: dom,
  i18n: i18n,
  react: react
};