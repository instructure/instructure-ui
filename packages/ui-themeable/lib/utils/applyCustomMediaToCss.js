'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyCustomMediaToCss;
function applyCustomMediaToCss(cssText, variables) {
  var matches = getMatches(cssText, /@media\s*[^(]*\((--[^)]+)\)?/g);
  var result = cssText;

  matches.forEach(function (match) {
    var matcher = new RegExp(match[1].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm');

    result = result.replace(matcher, variables[match[1]]);
  });

  return result;
}

function getMatches(str, regex) {
  var matches = [];
  var match = void 0;
  var matcher = regex;

  matcher.lastIndex = 0;
  matcher = new RegExp(matcher.source, 'g');

  while ((match = matcher.exec(str)) !== null) {
    matches.push(match);

    if (matcher.lastIndex === match.index) {
      matcher.lastIndex++;
    }
  }

  return matches;
}