'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registry = require('@instructure/ui-themeable/lib/registry');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _a11y = require('./a11y');

var _a11y2 = _interopRequireDefault(_a11y);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _registry.makeTheme)({
  theme: _base2.default,
  a11y: _a11y2.default
});