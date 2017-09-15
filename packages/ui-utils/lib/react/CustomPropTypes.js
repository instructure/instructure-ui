'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _canUseDOM = require('../dom/canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Children: {
    /**
     * Validate that the children of a component is one of the specified types.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.oneOf([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will allow children such as:
     *
     *  <Example>
     *    <Foo />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Bar />
     *    <Foo />
     *  </Example>
     *
     * But will fail on something like:
     *
     *  <Example>
     *    <h1>Example</h1>
     *    <Foo />
     *  </Example>
     *
     * @returns Error if validation failed
     */
    oneOf: function oneOf(validTypes) {
      return function (props, propName, componentName) {
        var children = _react2.default.Children.toArray(props[propName]);
        var validTypeNames = validTypes.map(function (type) {
          return (0, _getDisplayName2.default)(type);
        });

        for (var i = 0; i < children.length; i++) {
          var childName = (0, _getDisplayName2.default)(children[i].type);

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error('Expected one of ' + validTypeNames.join(', ') + ' in ' + componentName + ' but found \'' + childName + '\'');
          }
        }
      };
    },


    /**
     * Validate the type and order of children for a component.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.requireOrder([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will enforce the following:
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     * This validator will also allow various permutations of the order.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.requireOrder(
     *        [Foo, Bar, Baz],
     *        [Foo, Bar],
     *        [Bar, Baz],
     *      )
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will enforce one of the following:
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     * @param {...Array} validTypeGroups One or more Arrays of valid types
     * @returns Error if validation failed
     */
    enforceOrder: function enforceOrder() {
      for (var _len = arguments.length, validTypeGroups = Array(_len), _key = 0; _key < _len; _key++) {
        validTypeGroups[_key] = arguments[_key];
      }

      function validateTypes(childNames, typeNames) {
        for (var i = 0; i < childNames.length; i++) {
          if (childNames[i] !== typeNames[i]) {
            return false;
          }
        }

        return true;
      }

      function formatGroupTypes(componentName, typeGroups) {
        return typeGroups.map(function (types) {
          return formatTypes(componentName, types);
        }).join('\n\n');
      }

      function formatTypes(componentName, types) {
        var children = types.map(function (type) {
          return (0, _getDisplayName2.default)(type);
        }).map(function (name) {
          return '  <' + name + ' />';
        }).join('\n');

        return '<' + componentName + '>\n' + children + '\n</' + componentName + '>';
      }

      return function (props, propName, componentName) {
        var childNames = _react2.default.Children.toArray(props[propName]).map(function (child) {
          return (0, _getDisplayName2.default)(child.type);
        });

        // Validate each group, if any of them are valid we're done
        for (var i = 0; i < validTypeGroups.length; i++) {
          var validTypeNames = validTypeGroups[i].map(function (type) {
            return (0, _getDisplayName2.default)(type);
          });

          if (validateTypes(childNames, validTypeNames)) {
            return;
          }
        }

        // If we make it through the loop then children are not valid
        return new Error('Expected children of ' + componentName + ' in one of the following formats:\n' + formatGroupTypes(componentName, validTypeGroups) + '\n\n\nInstead of:\n' + formatTypes(componentName, childNames));
      };
    }
  },

  controllable: function controllable(propType) {
    var handlerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'onChange';
    var defaultPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'defaultValue';

    return function (props, propName, componentName) {
      var error = propType.apply(null, arguments); // eslint-disable-line prefer-spread
      if (error) {
        return error;
      }

      if (props[propName] && typeof props[handlerName] !== 'function') {
        return new Error(['You provided a \'' + propName + '\' prop without an \'' + handlerName + '\' handler on \'' + componentName + '\'. This will render a controlled component. If the component should be uncontrolled and manage its own state, use \'' + defaultPropName + '\'. Otherwise, set \'' + handlerName + '\'.'].join(''));
      }
    };
  },
  elementType: function elementType(props, propName, componentName, location, propFullName) {
    if (props[propName] === undefined) {
      return;
    }

    var propValue = props[propName];
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

    if (_react2.default.isValidElement(propValue)) {
      return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement supplied to `' + componentName + '`, expected ' + 'an element type (a string or a ReactClass).');
    }

    if (propType !== 'function' && propType !== 'string') {
      return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` supplied to `' + componentName + '`, ' + 'expected an element type (a string or a ReactClass).');
    }
  },


  element: _canUseDOM2.default ? _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.instanceOf(Element)]) : _propTypes2.default.element,

  spacing: function spacing(props, propName, componentName, location) {
    var validValues = ['0', 'none', 'auto', 'xxx-small', 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

    var propValue = props[propName];

    if (propValue === undefined) {
      return;
    }

    var propValueType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

    if (propValueType !== 'string') {
      return new Error('Invalid ' + location + ' `' + propName + '` of type `' + propValueType + '` supplied to `' + componentName + '`, expected ' + 'a string.');
    }

    var propValues = propValue.split(' ');
    var valuesLength = propValues.length;
    if (valuesLength > 0 && valuesLength < 5) {
      for (var i = 0; i < valuesLength; i++) {
        var valueIndex = validValues.indexOf(propValues[i]);
        if (valueIndex === -1) {
          return new Error('Invalid ' + location + ' `' + propName + '` `' + propValues[i] + '` supplied to `' + componentName + '`, expected ' + ('a one of `' + validValues.join(', ') + '`.'));
        }
      }
    } else {
      return new Error('Invalid ' + location + ' `' + propName + '` `' + propValue + '` supplied to `' + componentName + '`, expected ' + ('between one and four of the following valid values: `' + validValues.join(', ') + '`.'));
    }
  },
  iso8601: function iso8601(props, propName, componentName, location) {
    var propValue = props[propName];
    if (propValue === undefined) return;

    var propValueType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (typeof propValueType !== 'string') {
      return new Error('Invalid ' + location + ' `' + propName + '` of type `' + propValueType + '` supplied to `' + componentName + '`, expected ' + 'an ISO 8601 formatted string.');
    }

    var parsedMoment = (0, _moment2.default)(propValue, [_moment2.default.ISO_8601]);
    if (!parsedMoment.isValid()) {
      return new Error('Invalid ' + location + ' `' + propName + '` `' + propValue + '` supplied to `' + componentName + '`, expected ' + 'an ISO 8601 formatted string.');
    }
  },
  deprecatedVariant: function deprecatedVariant(propType, deprecated, message) {
    return function (props, propName, componentName) {
      if (props[propName] === deprecated) {
        // eslint-disable-next-line
        console.warn('`' + componentName + '` `' + deprecated + '` variant is deprecated. ' + (message || ''));
      }
    };
  },


  message: _propTypes2.default.shape({
    text: _propTypes2.default.string,
    type: _propTypes2.default.oneOf(['error', 'hint', 'success', 'screenreader-only'])
  }),

  placement: _propTypes2.default.oneOf(['top', 'end', 'bottom', 'start', 'top start', 'start top', 'start center', 'start bottom', 'bottom start', 'bottom center', 'bottom end', 'end bottom', 'end center', 'end top', 'top end', 'top center', 'center end', 'center start', 'top stretch', 'bottom stretch', 'end stretch', 'start stretch', 'offscreen']),

  size: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large', 'x-large'])
};