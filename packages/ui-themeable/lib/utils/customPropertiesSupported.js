'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = customPropertiesSupported;

var _canUseDOM = require('@instructure/ui-utils/lib/dom/canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customPropertiesSupported() {
  return _canUseDOM2.default && window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)');
}