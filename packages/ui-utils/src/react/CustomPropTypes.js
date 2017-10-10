import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import getDisplayName from './getDisplayName'

import canUseDOM from '../dom/canUseDOM'

export default {
  Children: {
    /**
     * ---
     * category: utilities/react
     * ---
     *
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
    oneOf (validTypes) {
      return function (props, propName, componentName) {
        const children = React.Children.toArray(props[propName])
        const validTypeNames = validTypes.map(type => getDisplayName(type))

        for (let i = 0; i < children.length; i++) {
          const childName = getDisplayName(children[i].type)

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error(
              `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found '${childName}'`
            )
          }
        }
      }
    },

    /**
     * ---
     * category: utilities/react
     * ---
     *
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
    enforceOrder (...validTypeGroups) {
      function validateTypes (childNames, typeNames) {
        for (let i = 0; i < childNames.length; i++) {
          if (childNames[i] !== typeNames[i]) {
            return false
          }
        }

        return true
      }

      function formatGroupTypes (componentName, typeGroups) {
        return typeGroups.map(types => formatTypes(componentName, types)).join('\n\n')
      }

      function formatTypes (componentName, types) {
        const children = types.map(type => getDisplayName(type)).map(name => `  <${name} />`).join('\n')

        return `<${componentName}>\n${children}\n</${componentName}>`
      }

      return function (props, propName, componentName) {
        const childNames = React.Children.toArray(props[propName]).map(child => getDisplayName(child.type))

        // Validate each group, if any of them are valid we're done
        for (let i = 0; i < validTypeGroups.length; i++) {
          const validTypeNames = validTypeGroups[i].map(type => getDisplayName(type))

          if (validateTypes(childNames, validTypeNames)) {
            return
          }
        }

        // If we make it through the loop then children are not valid
        return new Error(`Expected children of ${componentName} in one of the following formats:
${formatGroupTypes(componentName, validTypeGroups)}


Instead of:
${formatTypes(componentName, childNames)}`)
      }
    }
  },

  /**
   * ---
   * category: utilities/react
   * ---
   *
   * Ensure that a corresponding handler function is provided for the given prop if the
   * component does not manage its own state.
   *
   * Example:
   *
   *  class Foo extends Component {
   *    static propTypes = {
   *      selected: CustomPropTypes.controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
   *      onSelect: PropTypes.func,
   *      defaultSelected: PropTypes.bool
   *    }
   *  ...
   *
   * This will throw an error if the 'selected' prop is supplied without a corresponding
   * 'onSelect' handler and will recommend using 'defaultSelected' instead.
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {string} handlerName - name of the handler function
   * @param {string} defaultPropName - name of the default prop
   * @returns Error if designated prop is supplied without a corresponding handler function
   */
  controllable (propType, handlerName = 'onChange', defaultPropName = 'defaultValue') {
    return function (props, propName, componentName) {
      const error = propType.apply(null, arguments) // eslint-disable-line prefer-spread
      if (error) {
        return error
      }

      if (props[propName] && typeof props[handlerName] !== 'function') {
        return new Error(
          [
            `You provided a '${propName}' prop without an '${handlerName}' handler on '${componentName}'. \
This will render a controlled component. \
If the component should be uncontrolled and manage its own state, use '${defaultPropName}'. \
Otherwise, set '${handlerName}'.`
          ].join('')
        )
      }
    }
  },

  /**
   * ---
   * category: utilities/react
   * ---
   *
   * Verify that the given prop is a valid React element.
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns Error if prop is an invalid react element
   */
  elementType (props, propName, componentName, location, propFullName) {
    if (props[propName] === undefined) {
      return
    }

    const propValue = props[propName]
    const propType = typeof propValue

    if (React.isValidElement(propValue)) {
      return new Error(
        `Invalid ${location} \`${propFullName}\` of type ReactElement supplied to \`${componentName}\`, expected ` +
          `an element type (a string or a ReactClass).`
      )
    }

    if (propType !== 'function' && propType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` supplied to \`${componentName}\`, ` +
          `expected an element type (a string or a ReactClass).`
      )
    }
  },

  element: canUseDOM ? PropTypes.oneOfType([PropTypes.element, PropTypes.instanceOf(Element)]) : PropTypes.element,

  /**
   * ---
   * category: utilities/react
   * ---
   *
   * Validate spacing prop constraining it to the following enumerated values
   *
   *  - '0'
   *  - 'none'
   *  - 'auto'
   *  - 'xxx-small'
   *  - 'xx-small'
   *  - 'x-small'
   *  - 'small'
   *  - 'medium'
   *  - 'large'
   *  - 'x-large'
   *  - 'xx-large'
   *
   * Valid inputs include a single value or a string with CSS
   * shorthand like syntax with a maximum of 4 values.
   *
   * Examples of valid inputs:
   * 'x-small' (single value)
   * 'small large' (CSS shorthand)
   * '0 small large x-large' (CSS shorthand max 4 values)
   *
   * Examples of invalid inputs:
   * '5px' (must be a string from the enumerated values)
   * '0 large small 0 0' (invalid shorthand syntax w/5 values)
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns Error if is not one of the enumerated values or the shorthand syntax is incorrect
   */
  spacing (props, propName, componentName, location) {
    const validValues = [
      '0',
      'none',
      'auto',
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]

    const propValue = props[propName]

    if (propValue === undefined) {
      return
    }

    const propValueType = typeof propValue

    if (propValueType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propValueType}\` supplied to \`${componentName}\`, expected ` +
          `a string.`
      )
    }

    const propValues = propValue.split(' ')
    const valuesLength = propValues.length
    if (valuesLength > 0 && valuesLength < 5) {
      for (let i = 0; i < valuesLength; i++) {
        const valueIndex = validValues.indexOf(propValues[i])
        if (valueIndex === -1) {
          return new Error(
            `Invalid ${location} \`${propName}\` \`${propValues[i]}\` supplied to \`${componentName}\`, expected ` +
              `a one of \`${validValues.join(', ')}\`.`
          )
        }
      }
    } else {
      return new Error(
        `Invalid ${location} \`${propName}\` \`${propValue}\` supplied to \`${componentName}\`, expected ` +
          `between one and four of the following valid values: \`${validValues.join(', ')}\`.`
      )
    }
  },

  /**
   * ---
   * category: utilities/react
   * ---
   *
   * Verify that the given prop is a correctly formatted ISO 8601 formatted string.
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns Error if prop is an invalid ISO 8601 string
   */
  iso8601 (props, propName, componentName, location) {
    const propValue = props[propName]
    if (propValue === undefined) return

    const propValueType = typeof propValue
    if (typeof propValueType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propValueType}\` supplied to \`${componentName}\`, expected ` +
          `an ISO 8601 formatted string.`
      )
    }

    const parsedMoment = moment(propValue, [moment.ISO_8601])
    if (!parsedMoment.isValid()) {
      return new Error(
        `Invalid ${location} \`${propName}\` \`${propValue}\` supplied to \`${componentName}\`, expected ` +
          `an ISO 8601 formatted string.`
      )
    }
  },

  /**
   * ---
   * category: utilities/react
   * ---
   *
   * Trigger a warning if the specified prop variant is deprecated
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {string} deprecated - name of the deprecated variant
   * @param {string} message - additional information to display with the warning
   */
  deprecatedVariant (propType, deprecated, message) {
    return (props, propName, componentName) => {
      if (props[propName] === deprecated) {
        // eslint-disable-next-line
        console.warn(`\`${componentName}\` \`${deprecated}\` variant is deprecated. ${message || ''}`)
      }
    }
  },

  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
  }),

  placement: PropTypes.oneOf([
    'top',
    'end',
    'bottom',
    'start',
    'top start',
    'start top',
    'start center',
    'start bottom',
    'bottom start',
    'bottom center',
    'bottom end',
    'end bottom',
    'end center',
    'end top',
    'top end',
    'top center',
    'center end',
    'center start',
    'top stretch',
    'bottom stretch',
    'end stretch',
    'start stretch',
    'offscreen'
  ]),

  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large', 'x-large'])
}
