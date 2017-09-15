"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getActiveElement;
function getActiveElement(doc) {
  try {
    return (doc || document).activeElement;
  } catch (e) {/* ie throws if no active element */}
}