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

import React, { ComponentType, ReactElement } from 'react'
import { makeRequirable } from './makeRequirable'

const Children = {
  /**
   * Validate that the children of a component are one of the specified types.
   *
   * ```js
   *  import { Children } from '@instructure/ui-prop-types'
   *
   *  class Example extends Component {
   *    static propTypes = {
   *      children: Children.oneOf([Foo, Bar, Baz])
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
   * @returns {Function} A validator function that returns Error if validation failed
   */
  oneOf(validTypes: (string | ComponentType<any> | null)[]) {
    function validator(
      props: Record<string, any>,
      propName: string,
      componentName: string
    ) {
      const children = React.Children.toArray(props[propName])
      const validTypeNames = validTypes.map(
        (type: string | React.ComponentType | null) =>
          type ? getDisplayName(type) : type
      )

      for (let i = 0; i < children.length; i++) {
        const child = children[i]

        if (child && (child as ReactElement).type) {
          const childName = getDisplayName((child as ReactElement).type)

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error(
              `Expected one of ${validTypeNames.join(
                ', '
              )} in ${componentName} but found '${childName}'`
            )
          }
        } else if (child) {
          return new Error(
            `Expected one of ${validTypeNames.join(
              ', '
            )} in ${componentName} but found an element with unknown type: ${child}`
          )
        }
      }
      return null
    }
    validator.isRequired = makeRequirable(validator)
    return validator
  },

  /**
   * Ensures that there is exactly one of each specified child
   *
   * ```js
   *  import { Children } from '@instructure/ui-prop-types'
   *
   *  class Example extends Component {
   *    static propTypes = {
   *      children: Children.oneOfEach([Foo, Bar, Baz])
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
   * @returns {Error}
   */
  oneOfEach(validTypes: (string | ComponentType<any>)[]) {
    return function (
      props: Record<string, any>,
      propName: string,
      componentName: string
    ) {
      const children = React.Children.toArray(props[propName])
      const instanceCount: Record<string, any> = {}
      const validTypeNames = validTypes.map(
        (type: string | React.ComponentType) => {
          const typeName = getDisplayName(type)
          instanceCount[typeName] = 0
          return typeName
        }
      )

      for (let i = 0; i < children.length; i++) {
        const child = children[i]

        if (child && (child as ReactElement).type) {
          const childName = getDisplayName((child as ReactElement).type)

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error(
              `Expected one of ${validTypeNames.join(
                ', '
              )} in ${componentName} but found '${childName}'`
            )
          }

          instanceCount[childName] = (instanceCount[childName] || 0) + 1
        } else if (child) {
          return new Error(
            `Expected one of ${validTypeNames.join(
              ', '
            )} in ${componentName} but found an element of unknown type: ${child}`
          )
        }
      }

      const errors: string[] = []
      Object.keys(instanceCount).forEach((childName) => {
        if (instanceCount[childName] > 1) {
          errors.push(
            `${instanceCount[childName]} children of type ${childName}`
          )
        }
        if (instanceCount[childName] === 0) {
          errors.push(`0 children of type ${childName}`)
        }
      })

      if (errors.length > 0) {
        return new Error(
          `Expected exactly one of each ${validTypeNames.join(
            ', '
          )} in ${componentName} but found:${errors.join('\n')}`
        )
      }
      return null
    }
  },

  /**
   * Validate the type and order of children for a component.
   *
   * ```js
   *  import { Children } from '@instructure/ui-prop-types'
   *
   *  class Example extends Component {
   *    static propTypes = {
   *      children: Children.enforceOrder([Foo, Bar, Baz])
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
   *  import { Children } from '@instructure/ui-prop-types'
   *
   *  class Example extends Component {
   *    static propTypes = {
   *      children: Children.enforceOrder(
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
  enforceOrder(...validTypeGroups: (string | ComponentType<any>)[][]) {
    function validateTypes(childNames: string[], typeNames: string[]) {
      for (let i = 0; i < childNames.length; i++) {
        if (childNames[i] !== typeNames[i]) {
          return false
        }
      }

      return true
    }

    function formatGroupTypes(
      componentName: string,
      typeGroups: (string | ComponentType)[][]
    ) {
      return typeGroups
        .map((types: (string | ComponentType)[]) =>
          formatTypes(componentName, types)
        )
        .join('\n\n')
    }

    function formatTypes(
      componentName: string,
      types: (string | ComponentType)[]
    ) {
      const children = types
        .map((type: string | ComponentType) => {
          if (type) {
            return getDisplayName(type)
          } else {
            return '??'
          }
        })
        .map((name) => `  <${name} />`)
        .join('\n')

      return `<${componentName}>\n${children}\n</${componentName}>`
    }

    function validator(
      props: Record<string, any>,
      propName: string,
      componentName: string
    ) {
      const childNames = React.Children.toArray(props[propName]).map(
        (child) => {
          if (child && (child as ReactElement).type) {
            return getDisplayName((child as ReactElement).type)
          } else if (child) {
            return null
          }
          return
        }
      )

      // Validate each group, if any of them are valid we're done
      for (let i = 0; i < validTypeGroups.length; i++) {
        const validTypeNames = validTypeGroups[i].map(
          (type: string | React.ComponentType) => {
            if (type) {
              return getDisplayName(type)
            } else {
              return '??'
            }
          }
        )

        if (validateTypes(childNames as string[], validTypeNames)) {
          return null
        }
      }

      // If we make it through the loop then children are not valid
      return new Error(`Expected children of ${componentName} in one of the following formats:
  ${formatGroupTypes(componentName, validTypeGroups)}


  Instead of:
  ${formatTypes(componentName, childNames as string[])}`)
    }

    validator.isRequired = makeRequirable(validator)
    return validator
  }
}

// TODO: Remove when we further break up ui-utils and bringing this in no longer
// creates a circular dep
const getDisplayName = (Component: string | ComponentType): string => {
  return typeof Component === 'string'
    ? Component
    : Component.displayName || Component.name
}

export default Children
export {
  /**
   * ---
   * category: utilities/PropTypes
   * ---
   * @module Children
   */
  Children
}
