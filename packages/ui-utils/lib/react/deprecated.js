'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = deprecated;

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _warning = require('../warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Deprecate a prop for a Component
 */
function deprecated(version, oldProps) {
  return function (ComposedComponent) {
    var _class, _temp;

    var displayName = (0, _getDisplayName2.default)(ComposedComponent);

    var DeprecatedComponent = (_temp = _class = function (_ComposedComponent) {
      _inherits(DeprecatedComponent, _ComposedComponent);

      function DeprecatedComponent(props, context) {
        _classCallCheck(this, DeprecatedComponent);

        checkProps(version, props, oldProps);

        return _possibleConstructorReturn(this, (DeprecatedComponent.__proto__ || Object.getPrototypeOf(DeprecatedComponent)).call(this, props, context));
      }

      _createClass(DeprecatedComponent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          checkProps(version, nextProps, oldProps);

          if (_get(DeprecatedComponent.prototype.__proto__ || Object.getPrototypeOf(DeprecatedComponent.prototype), 'componentWillReceiveProps', this)) {
            _get(DeprecatedComponent.prototype.__proto__ || Object.getPrototypeOf(DeprecatedComponent.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
          }
        }
      }]);

      return DeprecatedComponent;
    }(ComposedComponent), _class.displayName = displayName, _temp);


    return DeprecatedComponent;
  };
}

function checkProps(version, props, oldProps) {
  Object.keys(oldProps).forEach(function (oldProp) {
    if (typeof props[oldProp] !== 'undefined') {
      var newProp = typeof oldProps[oldProp] === 'string' ? oldProps[oldProp] : null;

      (0, _warning2.default)(false, '%s was deprecated in %s%s', oldProp, version, newProp ? ' use ' + newProp + ' instead' : '');
    }
  });
}