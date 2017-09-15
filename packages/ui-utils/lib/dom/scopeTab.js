'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _findTabbable = require('./findTabbable');

var _findTabbable2 = _interopRequireDefault(_findTabbable);

var _isActiveElement = require('./isActiveElement');

var _isActiveElement2 = _interopRequireDefault(_isActiveElement);

var _containsActiveElement = require('./containsActiveElement');

var _containsActiveElement2 = _interopRequireDefault(_containsActiveElement);

var _getActiveElement = require('./getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(element, event) {
  var node = (0, _findDOMNode2.default)(element);
  var tabbable = (0, _findTabbable2.default)(node);

  if (!tabbable.length) {
    event.preventDefault();
    return;
  }

  // Account for a changing tabindex of the active element
  // (a case that happens with Menu for KO a11y)
  if ((0, _containsActiveElement2.default)(element)) {
    var activeElement = (0, _getActiveElement2.default)();
    if (tabbable.indexOf(activeElement) === -1) {
      tabbable.push(activeElement);
    }
  }

  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = (0, _isActiveElement2.default)(finalTabbable) ||
  // handle immediate shift+tab after opening with mouse
  (0, _isActiveElement2.default)(node);

  if (!leavingFinalTabbable) return;

  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
}