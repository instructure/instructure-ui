'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFontSize;
function getFontSize(el) {
  var m = document.createElement('div');

  var container = el || document.body;
  var fontSize = 16;

  if (!container) {
    container = document.createElement('body');
    container.style.cssText = 'font-size:1em !important';
    document.documentElement.insertBefore(container, document.body);
  }

  m.style.cssText = ['display: inline-block !important;', 'padding: 0 !important;', 'line-height: 1 !important;', 'position: absolute !important;', 'visibility: hidden !important;', 'font-size: 1em !important;'].join('');
  m.appendChild(document.createTextNode('M'));
  container.appendChild(m);
  fontSize = m.offsetHeight;
  container.removeChild(m);

  return fontSize;
}