'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvas = undefined;

var _registry = require('@instructure/ui-themeable/lib/registry');

var _canvas2 = require('./canvas');

var _canvas3 = _interopRequireDefault(_canvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _registry.getRegisteredThemes)();
exports.canvas = _canvas3.default;