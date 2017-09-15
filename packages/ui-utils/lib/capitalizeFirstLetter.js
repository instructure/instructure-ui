"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeFirstLetter;
function capitalizeFirstLetter(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}