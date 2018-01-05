/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * ---
 * category: utilities/react
 * ---
 * Custom prop types for React components.
 * @module CustomPropTypes
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import getDisplayName from './getDisplayName'
import warning from '../warning'

import canUseDOM from '../dom/canUseDOM'

export default {
  Children: {
    /**
     *
     * Validate that the children of a component is one of the specified types.
     *
     * ```js
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.oneOf([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     * ```
     *
     * This will allow children such as:
     *
     * ```jsx
     *  <Example>
     *    <Foo />
     *  </Example>
     * ```
     *
     *  OR
     *
     * ```jsx
     *  <Example>
     *    <Bar />
     *    <Foo />
     *  </Example>
     * ```
     *
     * But will fail on something like:
     *
     * ```jsx
     *  <Example>
     *    <h1>Example</h1>
     *    <Foo />
     *  </Example>
     * ```
     * @returns {Error} if validation failed
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
     *
     * Ensures that there is exactly one of each specified child
     *
     * ```js
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.oneOfEach([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     * ```
     *
     * This will enforce the following:
     *
     * ```jsx
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     * ```
     * An error will be thrown
     *  - If any of the children are not provided (ex. Foo, Bar, but missing Baz)
     *  - If multiple children of the same type are provided (ex. Foo, Foo, Bar, and Baz)
     *
     * @param {Array} validTypes - Array of child types
     * @returns {Error} if validation failed
     */
    oneOfEach (validTypes) {
      return function (props, propName, componentName) {
        const children = React.Children.toArray(props[propName])
        const instanceCount = {}
        const validTypeNames = validTypes.map((type) => {
          const typeName = getDisplayName(type)
          instanceCount[typeName] = 0
          return typeName
        })

        for (let i = 0; i < children.length; i++) {
          const childName = getDisplayName(children[i].type)

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error(
              `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found '${childName}'`
            )
          }

          instanceCount[childName] = (instanceCount[childName] || 0) + 1
        }

        const errors = []
        Object.keys(instanceCount).forEach((childName) => {
          if (instanceCount[childName] > 1) {
            errors.push(`${instanceCount[childName]} children of type ${childName}`)
          }
          if (instanceCount[childName] === 0) {
            errors.push(`0 children of type ${childName}`)
          }
        })

        if (errors.length > 0) {
          return new Error(
            `Expected exactly one of each ${validTypeNames.join(', ')} in ${componentName} but found:
${errors.join('\n')}`
          )
        }
      }
    },

    /**
     *
     * Validate the type and order of children for a component.
     *
     * ```js
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.requireOrder([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     * ```
     *
     * This will enforce the following:
     *
     * ```jsx
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     * ```
     *
     * This validator will also allow various permutations of the order.
     *
     * ```js
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
     * ```
     *
     * This will enforce one of the following:
     *
     * ```jsx
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     * ```
     *
     *  OR
     *
     * ```jsx
     *  <Example>
     *    <Foo />
     *    <Bar />
     *  </Example>
     * ```
     *
     *  OR
     *
     * ```jsx
     *  <Example>
     *    <Bar />
     *    <Baz />
     *  </Example>
     * ```
     *
     * @param {...Array} validTypeGroups One or more Arrays of valid types
     * @returns {Error} if validation failed
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
   * Ensure that a corresponding handler function is provided for the given prop if the
   * component does not manage its own state.
   *
   * ```js
   *  class Foo extends Component {
   *    static propTypes = {
   *      selected: CustomPropTypes.controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
   *      onSelect: PropTypes.func,
   *      defaultSelected: PropTypes.bool
   *    }
   *  ...
   * ```
   *
   * This will throw an error if the 'selected' prop is supplied without a corresponding
   * 'onSelect' handler and will recommend using 'defaultSelected' instead.
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {string} handlerName - name of the handler function
   * @param {string} defaultPropName - name of the default prop
   * @returns {Error} if designated prop is supplied without a corresponding handler function
   */
  controllable (propType, handlerName = 'onChange', defaultPropName = 'defaultValue') {
    return function (props, propName, componentName) {
      const error = propType.apply(null, arguments)
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
   * Verify that the given prop is a valid React element.
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns {Error} if prop is an invalid react element
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
   * @returns {Error} if is not one of the enumerated values or the shorthand syntax is incorrect
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
   *
   * Verify that the given prop is a correctly formatted ISO 8601 formatted string.
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns {Error} if prop is an invalid ISO 8601 string
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
   *
   * Trigger a console warning if the specified prop variant is deprecated
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {string} deprecated - name of the deprecated variant
   * @param {string} message - additional information to display with the warning
   */
  deprecatedVariant (propType, deprecated, message) {
    return (props, propName, componentName) => {
      warning(
        (props[propName] !== deprecated),
        `\`${componentName}\` \`${deprecated}\` variant is deprecated. ${message || ''}`
      )
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
