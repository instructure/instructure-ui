'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

exports.pick = pick;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matchComponentTypes = require('./matchComponentTypes');

var _matchComponentTypes2 = _interopRequireDefault(_matchComponentTypes);

var _ensureSingleChild = require('./ensureSingleChild');

var _ensureSingleChild2 = _interopRequireDefault(_ensureSingleChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstract component identifier. Helpful for picking out a specific child.
 *
 * Example:
 *
 *  class App extends Component {
 *    render () {
 *      const title = pick(Title, this.props.children)
 *      const content = pick(Content, this.props.children)
 *
 *      return (
 *        <div>
 *          {title}
 *          <ContextBox>
 *            {content}
 *          </ContextBox>
 *        </div>
 *      )
 *    }
 *  }
 *
 *  class Title extends ComponentIdentifier { static displayName = "Title" }
 *  class Content extends ComponentIdentifier { static displayName = "Content" }
 *
 *  ReactDOM.render(
 *    <App>
 *      <Title><h2>Hello World!</h2></Title>
 *      <Content><div>This text gets decorated within `App`.</div></Content>
 *    </App>,
 *    document.getElementById('container')
 *  )
 */
var ComponentIdentifier = (_temp = _class = function (_Component) {
  _inherits(ComponentIdentifier, _Component);

  function ComponentIdentifier() {
    _classCallCheck(this, ComponentIdentifier);

    return _possibleConstructorReturn(this, (ComponentIdentifier.__proto__ || Object.getPrototypeOf(ComponentIdentifier)).apply(this, arguments));
  }

  _createClass(ComponentIdentifier, [{
    key: 'render',

    /* eslint-enable react/require-default-props */

    value: function render() {
      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['children']);

      return (0, _ensureSingleChild2.default)(children, props);
    }
    /* eslint-disable react/require-default-props */

  }]);

  ComponentIdentifier.displayName = 'ComponentIdentifier'
  return ComponentIdentifier;
}(_react.Component), _class.propTypes = {
  /**
   * The children to be rendered
   */
  children: _propTypes2.default.node }, _temp);

/**
 * Pick a specific child component from a component's children
 *
 * @param {Component} component The component to look for
 * @param {Array} children The child components to look through
 * @return {Component} The matching component if found, otherwise undefined
 */

exports.default = ComponentIdentifier;
function pick(component, children) {
  var result = void 0;

  _react2.default.Children.forEach(children, function (child) {
    if ((0, _matchComponentTypes2.default)(child, [component])) {
      result = child;
    }
  });

  return result;
}