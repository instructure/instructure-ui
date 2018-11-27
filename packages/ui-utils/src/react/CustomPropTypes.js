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

import React from 'react'
import PropTypes from 'prop-types'

import getDisplayName from './getDisplayName'
import canUseDOM from '../dom/canUseDOM'

/**
 * ---
 * category: utilities/react
 * ---
 * Custom prop types for React components.
 * @module CustomPropTypes
 */
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
        const validTypeNames = validTypes.map(type => type  ? getDisplayName(type) : type)

        for (let i = 0; i < children.length; i++) {
          const child = children[i]

          if (child && child.type) {
            const childName = getDisplayName(child.type)

            if (validTypeNames.indexOf(childName) < 0) {
              return new Error(
                `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found '${childName}'`
              )
            }
          } else if (child) {
            return new Error(
              `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found an element with unknown type: ${child}`
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
          const child = children[i]

          if (child && child.type) {
            const childName = getDisplayName(child.type)

            if (validTypeNames.indexOf(childName) < 0) {
              return new Error(
                `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found '${childName}'`
              )
            }

            instanceCount[childName] = (instanceCount[childName] || 0) + 1
          } else if (child) {
            return new Error(
              `Expected one of ${validTypeNames.join(', ')} in ${componentName} but found an element of unknown type: ${child}`
            )
          }
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
        const children = types
          .map((type) => {
            if (type) {
              return getDisplayName(type)
            } else {
              return '??'
            }
          })
          .map(name => `  <${name} />`)
          .join('\n')

        return `<${componentName}>\n${children}\n</${componentName}>`
      }

      return function (props, propName, componentName) {
        const childNames = React.Children.toArray(props[propName]).map((child) => {
          if (child && child.type) {
            return getDisplayName(child.type)
          } else if (child) {
            return null
          }
        })

        // Validate each group, if any of them are valid we're done
        for (let i = 0; i < validTypeGroups.length; i++) {
          const validTypeNames = validTypeGroups[i].map((type) => {
            if (type) {
              return getDisplayName(type)
            } else {
              return '??'
            }
          })

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
    if (typeof props[propName] === 'undefined') {
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
   * Verify that a prop cannot be given if one or more other props are also
   * given.
   *
   * ```js
   *  class Foo extends Component {
   *    static propTypes = {
   *      decimalPrecision: CustomPropTypes.xor(PropTypes.number, 'significantDigits'),
   *      significantDigits: CustomPropTypes.xor(PropTypes.number, 'decimalPrecision')
   *    }
   *  ...
   * ```
   *
   * This will throw an error if both the `decimalPrecision` and
   * `significantDigits` props are provided.
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {...string} otherPropNames - reject if any of these other props are also given
   * @returns {Error} if any of the other props are also given
   */
  xor (propType, ...otherPropNames) {
    return function (props, propName, componentName) {
      if (props[propName] != null) {
        const otherProps = otherPropNames.map(name => props[name]).filter(prop => prop != null)
        if (otherProps.length > 0) {
          return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`: expected only one of ` +
              `${[propName].concat(otherPropNames).map(name => `\`${name}\``).join(', ')} to be set.`
          )
        }
      }

      return propType.apply(null, arguments)
    }
  },

  /**
   * Verify that the given prop is a valid css `cursor` value.
   *
   * The list of possible cursor values is taken from
   * https://developer.mozilla.org/en-US/docs/Web/CSS/cursor.
   *
   * Note that this does not currently support `url(...)` values.
   */
  cursor: PropTypes.oneOf([
    'auto',
    'default',
    'none',
    'context-menu',
    'help',
    'pointer',
    'progress',
    'wait',
    'cell',
    'crosshair',
    'text',
    'vertical-text',
    'alias',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'all-scroll',
    'col-resize',
    'row-resize',
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
    'ne-resize',
    'nw-resize',
    'se-resize',
    'sw-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'zoom-in',
    'zoom-out',
  ])
}
