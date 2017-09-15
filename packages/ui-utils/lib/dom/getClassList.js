'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClassList;

var _findDOMNode = require('./findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classListShimmed = false;

function getClassList(element) {
  var node = (0, _findDOMNode2.default)(element);

  return {
    contains: function contains(className) {
      return node && hasClass(node, className);
    },
    add: function add(className) {
      shimClassListForIE();

      if (node && node.classList) {
        node.classList.add(className);
      } else if (node && !hasClass(node)) {
        node.className = node.className + ' ' + className;
      }
    },
    remove: function remove(className) {
      shimClassListForIE();

      if (node && node.classList) {
        node.classList.remove(className);
      } else if (node) {
        node.className = node.className // eslint-disable-line no-param-reassign
        .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
      }
    }
  };
}

function hasClass(node, className) {
  shimClassListForIE();
  if (node.classList) {
    return !!className && node.classList.contains(className);
  } else {
    return (' ' + node.className + ' ').indexOf(' ' + className + ' ') !== -1;
  }
}

function shimClassListForIE() {
  // IE 11 doesn't support classList on SVG elements
  /* istanbul ignore if */
  if (!classListShimmed && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    var descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
    Object.defineProperty(SVGElement.prototype, 'classList', descr);
    classListShimmed = true;
  }
}