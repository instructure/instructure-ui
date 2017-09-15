'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = themeable;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _getDisplayName = require('@instructure/ui-utils/lib/react/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _shallowEqual = require('@instructure/ui-utils/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _warning = require('@instructure/ui-utils/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _ThemeContextTypes = require('./ThemeContextTypes');

var _applyVariablesToNode = require('./utils/applyVariablesToNode');

var _applyVariablesToNode2 = _interopRequireDefault(_applyVariablesToNode);

var _getCssText = require('./utils/getCssText');

var _getCssText2 = _interopRequireDefault(_getCssText);

var _registry = require('./registry');

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development';

/**
 * Mark component as themeable and inject component styles into the document
 *
 * Themeable components have a `theme` property which can be configured explicitly
 * via props or passed via context.
 *
 */
function themeable(theme, styles) {
  return function (ComposedComponent) {
    var _class, _temp;

    var displayName = (0, _getDisplayName2.default)(ComposedComponent);

    var contextKey = Symbol(displayName);
    var componentId = uniqueId(displayName);

    var template = typeof styles.template === 'function' ? styles.template : function () {
      (0, _warning2.default)(false, '[themeable] Invalid styles for: %O', displayName);
      return '';
    };

    (0, _registry.registerComponentTheme)(contextKey, theme);

    var getThemeFromContext = function getThemeFromContext(context) {
      var themeContext = (0, _ThemeContextTypes.getThemeContext)(context);
      if (themeContext && themeContext.theme && themeContext.theme[contextKey]) {
        return Object.assign({}, themeContext.theme[contextKey], {
          immutable: themeContext.immutable
        });
      } else {
        return {};
      }
    };

    var generateThemeForContextKey = function generateThemeForContextKey(themeKey, overrides) {
      return (0, _registry.generateComponentTheme)(contextKey, themeKey, overrides);
    };

    var ThemeableComponent = (_temp = _class = function (_ComposedComponent) {
      _inherits(ThemeableComponent, _ComposedComponent);

      function ThemeableComponent(props, context) {
        _classCallCheck(this, ThemeableComponent);

        var _this = _possibleConstructorReturn(this, (ThemeableComponent.__proto__ || Object.getPrototypeOf(ThemeableComponent)).call(this, props, context));

        _this._themeCache = null;
        _this._instanceId = uniqueId(displayName);
        return _this;
      }
      // For testing purposes


      _createClass(ThemeableComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var defaultTheme = generateThemeForContextKey();
          var cssText = (0, _getCssText2.default)(styles.template, defaultTheme, componentId);

          (0, _styles.mount)(componentId, cssText);

          if (_get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillMount', this)) {
            _get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillMount', this).call(this);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.applyTheme();

          if (_get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentDidMount', this)) {
            _get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentDidMount', this).call(this);
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
          var themeContextWillChange = !(0, _deepEqual2.default)((0, _ThemeContextTypes.getThemeContext)(this.context), (0, _ThemeContextTypes.getThemeContext)(nextContext));
          var shouldUpdate = true;

          if (_get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'shouldComponentUpdate', this)) {
            shouldUpdate = _get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState, nextContext);
            return themeContextWillChange || shouldUpdate;
          } else {
            return themeContextWillChange || !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
          }
        }
      }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
          if (!(0, _deepEqual2.default)(nextProps.theme, this.props.theme) || !(0, _deepEqual2.default)(getThemeFromContext(nextContext), getThemeFromContext(this.context))) {
            this._themeCache = null;
          }

          if (_get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillUpdate', this)) {
            _get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState, nextContext);
          }
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, prevContext) {
          if (!(0, _deepEqual2.default)(prevProps.theme, this.props.theme) || !(0, _deepEqual2.default)(getThemeFromContext(prevContext), getThemeFromContext(this.context))) {
            this.applyTheme();
          }

          if (_get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentDidUpdate', this)) {
            _get(ThemeableComponent.prototype.__proto__ || Object.getPrototypeOf(ThemeableComponent.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState, prevContext);
          }
        }
      }, {
        key: 'applyTheme',
        value: function applyTheme() {
          var defaultTheme = generateThemeForContextKey();

          (0, _applyVariablesToNode2.default)(_reactDom2.default.findDOMNode(this), // eslint-disable-line react/no-find-dom-node
          this.theme, defaultTheme, componentId, styles.template, // for IE 11
          this._instanceId // for IE 11
          );
        }
      }, {
        key: 'theme',
        get: function get() {
          if (this._themeCache !== null) {
            return this._themeCache;
          }

          var theme = getThemeFromContext(this.context);

          if (this.props.theme) {
            if (!theme) {
              theme = this.props.theme;
            } else if (theme.immutable) {
              (0, _warning2.default)(false, '[themeable] Parent theme is immutable. Cannot apply theme: %O', this.props.theme);
            } else {
              theme = Object.assign({}, theme, this.props.theme);
            }
          }

          // pass in the component theme as overrides
          this._themeCache = generateThemeForContextKey(null, theme);

          return this._themeCache;
        }
      }]);

      return ThemeableComponent;
    }(ComposedComponent), _class.displayName = displayName, _class.componentId = componentId, _class.theme = contextKey, _class.contextTypes = Object.assign({}, ComposedComponent.contextTypes, _ThemeContextTypes.ThemeContextTypes), _class.propTypes = Object.assign({}, ComposedComponent.propTypes, {
      theme: _propTypes2.default.object // eslint-disable-line react/forbid-prop-types
    }), _class.generateTheme = generateThemeForContextKey, _temp);


    return ThemeableComponent;
  };
}

/**
*  Utility to generate a theme for all themeable components
*/
themeable.generateTheme = _registry.generateTheme;

function uniqueId(displayName) {
  var id = _shortid2.default.generate();
  return process.env.DEBUG ? displayName + '__' + id : id;
}