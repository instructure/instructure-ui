'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbable;

var _getComputedStyle = require('./getComputedStyle');

var _getComputedStyle2 = _interopRequireDefault(_getComputedStyle);

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 **/

function findTabbable(el) {
  var element = (0, _findDOMNode2.default)(el);

  if (!element || typeof element.querySelectorAll !== 'function') {
    return [];
  }

  var focusableSelector = 'a[href],frame,iframe,object,input:not([type=hidden]),select,textarea,button,*[tabindex]';
  var matches = element.querySelectorAll(focusableSelector);
  return [].slice.call(matches, 0).filter(function (el) {
    return tabbable(el);
  });
}

function focusable(element) {
  return !element.disabled && visible(element);
}

function hidden(element) {
  var cs = (0, _getComputedStyle2.default)(element);
  return cs.display !== 'inline' && element.offsetWidth <= 0 && element.offsetHeight <= 0 || cs.display === 'none';
}

function positioned(element) {
  var POS = ['fixed', 'absolute'];
  if (POS.includes(element.style.position.toLowerCase())) return true;
  if (POS.includes((0, _getComputedStyle2.default)(element).getPropertyValue('position').toLowerCase())) return true;
  return false;
}

function visible(element) {
  /* eslint no-param-reassign:0 */
  while (element) {
    if (element === document.body) break;
    if (hidden(element)) return false;
    if (positioned(element)) break;
    element = element.parentNode;
  }
  return true;
}

function isInvalidTabIndex(tabIndex) {
  return !isNaN(tabIndex) && tabIndex < 0;
}

function tabbable(element) {
  return !isInvalidTabIndex(element.getAttribute('tabindex')) && focusable(element);
}