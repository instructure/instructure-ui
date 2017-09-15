'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.origin = origin;

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _ownerWindow = require('../dom/ownerWindow');

var _ownerWindow2 = _interopRequireDefault(_ownerWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function origin(node) {
  var ownWindow = (0, _ownerWindow2.default)(node);

  var location = ownWindow.location;

  // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

  if (location.protocol === 'file:') {
    return '*';
  } else if (location.origin) {
    return location.origin;
  } else if (location.port) {
    return location.protocol + '//' + location.hostname + ':' + location.port;
  } else {
    return location.protocol + '//' + location.hostname;
  }
}

var windowMessageListener = function windowMessageListener(messageHandler, validSource) {
  return function (ComposedComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_ComposedComponent) {
      _inherits(_class, _ComposedComponent);

      function _class() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.handleMessage = function (e) {
          if (_this.sourceIsValid(e.source) && e.origin === origin(_this) && e.data) {
            messageHandler.call(_this, e.data);
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var win = (0, _ownerWindow2.default)(this);

          win.addEventListener('message', this.handleMessage, false);

          if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this)) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var win = (0, _ownerWindow2.default)(this);
          win.removeEventListener('message', this.handleMessage, false);

          if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this)) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
          }
        }
      }, {
        key: 'sourceIsValid',
        value: function sourceIsValid(eventSource) {
          var expectedSource = typeof validSource === 'function' ? validSource.call(this) : validSource;
          if (!expectedSource) {
            return true;
          } else if (eventSource) {
            var sourceFrame = eventSource.frameElement;
            var sourceName = sourceFrame ? sourceFrame.getAttribute('name') : null;
            return sourceName === expectedSource;
          } else {
            return false;
          }
        }
      }]);

      return _class;
    }(ComposedComponent), _class.displayName = (0, _getDisplayName2.default)(ComposedComponent), _temp2;
  };
};

windowMessageListener.postMessage = function (target, message, origin) {
  target.postMessage(message, origin);
};

exports.default = windowMessageListener;