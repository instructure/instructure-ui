'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleMouseOverOut;

var _contains = require('./contains');

var _contains2 = _interopRequireDefault(_contains);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple implementation of mouseEnter and mouseLeave.
 * React's built version is broken: https://github.com/facebook/react/issues/4251
 * for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
 * from one child element to another.
 *
 * @param handler {function} Callback function for handling the event
 * @param e {Event} The DOM Event that was fired
 */
function handleMouseOverOut(handler, e) {
  var target = e.currentTarget;
  var related = e.relatedTarget || e.nativeEvent.toElement;

  if (!related || related !== target && !(0, _contains2.default)(target, related)) {
    handler(e);
  }
}