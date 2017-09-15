'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContextTypes = undefined;
exports.makeThemeContext = makeThemeContext;
exports.getThemeContext = getThemeContext;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONTEXT_KEY = '@@themeable';

var ThemeContextTypes = exports.ThemeContextTypes = _defineProperty({}, CONTEXT_KEY, _propTypes2.default.object);

function makeThemeContext(theme, immutable) {
  return _defineProperty({}, CONTEXT_KEY, {
    theme: theme,
    immutable: immutable
  });
}

function getThemeContext(context) {
  return context ? context[CONTEXT_KEY] : undefined;
}