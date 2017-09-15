'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registry = require('@instructure/ui-themeable/lib/registry');

var _keys = require('../../keys');

var _keys2 = _interopRequireDefault(_keys);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var theme = {
  key: _keys2.default.CANVAS_A11Y,
  accessible: true,
  description: 'This theme meets WCAG 2.0 AA rules for color contrast.',
  variables: Object.assign({}, _base2.default.variables, {
    colors: _colors2.default
  })
};

(0, _registry.registerTheme)(theme);

exports.default = (0, _registry.makeTheme)({ theme: theme });