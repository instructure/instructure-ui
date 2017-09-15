'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDisplayName;

var _warning = require('../warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(Component) {
  (0, _warning2.default)(typeof Component === 'string' || typeof Component.displayName !== 'undefined', '%s is missing the property "displayName".', Component.name);
  return typeof Component === 'string' ? Component : Component.displayName;
}