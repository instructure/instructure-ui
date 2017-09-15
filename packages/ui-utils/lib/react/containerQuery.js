'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = containerQuery;

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _findDOMNode = require('../dom/findDOMNode');

var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

var _getFontSize = require('../dom/getFontSize');

var _getFontSize2 = _interopRequireDefault(_getFontSize);

var _addResizeListener = require('../dom/addResizeListener');

var _addResizeListener2 = _interopRequireDefault(_addResizeListener);

var _debounce = require('../debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function containerQuery(query) {
  var getSelectorMap = function getSelectorMap(el) {
    return parseQuery(query, el);
  };

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.updateAttributes = function (size) {
          if (_this._size && _this._size.width === size.width && _this._size.height === size.height) {
            return;
          }

          var container = (0, _findDOMNode2.default)(_this);
          var selectorMap = getSelectorMap(container)(size);

          _this._size = size;

          // eslint-disable-next-line no-restricted-syntax
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = toPairs(selectorMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _ref2 = _step.value;

              var _ref3 = _slicedToArray(_ref2, 2);

              var selectorName = _ref3[0];
              var isOn = _ref3[1];

              if (isOn) {
                container.setAttribute('data-' + selectorName, '');
              } else {
                container.removeAttribute('data-' + selectorName);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var node = (0, _findDOMNode2.default)(this);

          var size = {
            width: node.offsetWidth,
            height: node.offsetHeight
          };

          this._debounced = (0, _debounce2.default)(this.updateAttributes, 100, { leading: false, trailing: true });
          this._resizeListener = (0, _addResizeListener2.default)(node, this._debounced);

          this.updateAttributes(size);

          if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this)) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this._resizeListener) {
            this._resizeListener.remove();
          }

          if (this._debounced) {
            this._debounced.cancel();
          }

          if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this)) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this).call(this);
          }
        }
      }]);

      return _class;
    }(ComposedComponent), _class.displayName = (0, _getDisplayName2.default)(ComposedComponent), _class.getSelectorMap = getSelectorMap, _temp2;
  };
}

function parseQuery(query, el) {
  var rules = [];
  var fontSizeRem = null;
  var fontSizeEm = null;

  // eslint-disable-next-line no-restricted-syntax
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = toPairs(query)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref4 = _step2.value;

      var _ref5 = _slicedToArray(_ref4, 2);

      var selectorName = _ref5[0];
      var _ref5$ = _ref5[1];
      var minWidth = _ref5$.minWidth;
      var maxWidth = _ref5$.maxWidth;
      var minHeight = _ref5$.minHeight;
      var maxHeight = _ref5$.maxHeight;

      rules.push([selectorName, {
        minWidth: px(minWidth) || 0,
        maxWidth: px(maxWidth) || Infinity,
        minHeight: px(minHeight) || 0,
        maxHeight: px(maxHeight) || Infinity
      }]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  function px(val) {
    if (!val || typeof val === 'number') {
      return val;
    }

    var _parseUnit = parseUnit(val),
        _parseUnit2 = _slicedToArray(_parseUnit, 2),
        num = _parseUnit2[0],
        unit = _parseUnit2[1];

    if (unit === 'rem') {
      fontSizeRem = fontSizeRem || (0, _getFontSize2.default)();
      return num * fontSizeRem;
    } else if (unit === 'em') {
      fontSizeEm = fontSizeEm || (0, _getFontSize2.default)(el);
      return num * fontSizeEm;
    } else {
      return num;
    }
  }

  return function (_ref6) {
    var width = _ref6.width,
        height = _ref6.height;

    var selectorMap = {};

    // eslint-disable-next-line no-restricted-syntax
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = rules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref7 = _step3.value;

        var _ref8 = _slicedToArray(_ref7, 2);

        var _selectorName = _ref8[0];
        var _ref8$ = _ref8[1];
        var _minWidth = _ref8$.minWidth;
        var _maxWidth = _ref8$.maxWidth;
        var _minHeight = _ref8$.minHeight;
        var _maxHeight = _ref8$.maxHeight;

        selectorMap[_selectorName] = _minWidth <= width && width <= _maxWidth && _minHeight <= height && height <= _maxHeight;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return selectorMap;
  };
}

function toPairs(obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]];
  });
}

function parseUnit(str) {
  return [parseFloat('' + str, 10), str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''];
}