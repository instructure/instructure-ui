'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchComponentTypes;

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchComponentTypes(componentInstance) {
  var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (componentInstance && componentInstance.type) {
    var displayNames = types.map(function (type) {
      return (0, _getDisplayName2.default)(type);
    });
    return displayNames.indexOf((0, _getDisplayName2.default)(componentInstance.type)) >= 0;
  } else {
    return false;
  }
}