'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.omitProps = omitProps;
exports.pickProps = pickProps;

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

var _object3 = require('object.pick');

var _object4 = _interopRequireDefault(_object3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function omitProps(props) {
  var propTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var keys = Object.keys(propTypes).concat(['theme', 'children', 'className', 'style']).concat(exclude);

  return (0, _object2.default)(props, keys);
}

function pickProps(props) {
  var propTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var include = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return (0, _object4.default)(props, Object.keys(propTypes).concat(include));
}