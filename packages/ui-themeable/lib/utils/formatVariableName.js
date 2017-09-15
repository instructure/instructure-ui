"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatVariableName;
function formatVariableName(variableName, prefix) {
  var name = prefix ? prefix + "-" + variableName : variableName;
  return "--" + name;
}