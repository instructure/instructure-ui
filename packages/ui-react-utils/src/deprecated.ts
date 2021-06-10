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
import { decorator } from '@instructure/ui-decorator'
import { logWarnDeprecated as warnDeprecated } from '@instructure/console'
import { ComponentClass } from 'react'

export interface DeprecatedDecorator {
  (version: string, oldProps?: Record<string, any> | null, message?: string): (
    ComposedComponent: any
  ) => any
  deprecatePropValues: (...args: any[]) => (...args: any[]) => boolean | null
  warnDeprecatedProps: (...args: any[]) => void
  warnDeprecatedComponent: (...args: any[]) => void
  changedPackageWarning: (...args: any[]) => string
}

const deprecated = (() => {
  if (process.env.NODE_ENV === 'production') {
    const deprecated: DeprecatedDecorator = function () {
      return (ComposedComponent: ComponentClass) => ComposedComponent
    }
    deprecated.deprecatePropValues = () => () => null
    deprecated.warnDeprecatedProps = () => {}
    deprecated.warnDeprecatedComponent = () => {}
    deprecated.changedPackageWarning = () => ''
    return deprecated
  }
  const deprecated = decorator(
    (
      ComposedComponent: ComponentClass,
      version: string,
      oldProps?: Record<string, any>,
      message = ''
    ) => {
      /**
       * ---
       * category: utilities/react
       * ---
       * Deprecate React component props. Warnings will display in the console when deprecated
       * props are used. Include the version number when the deprecated component will be removed.
       *
       * ```js
       *  class Example extends Component {
       *    static propTypes = {
       *      currentProp: PropTypes.func
       *    }
       *  }
       *  export default deprecated('7.0.0', {
       *    deprecatedProp: 'currentProp',
       *    nowNonExistentProp: true
       *  })(Example)
       * ```
       *
       * @param {string} version
       * @param {object} oldProps (if this argument is null or undefined, the entire component is deprecated)
       * @param {string} message
       * @return {function} React component with deprecated props behavior
       * @module deprecated
       */
      class DeprecatedComponent extends ComposedComponent {}

      DeprecatedComponent.prototype.componentDidMount = function () {
        if (oldProps) {
          warnDeprecatedProps(
            ComposedComponent.name,
            version,
            this.props,
            oldProps,
            message
          )
        } else {
          warnDeprecatedComponent(version, ComposedComponent.name, message)
        }

        if (ComposedComponent.prototype.componentDidMount) {
          ComposedComponent.prototype.componentDidMount.call(this)
        }
      }

      DeprecatedComponent.prototype.componentDidUpdate = function (
        prevProps,
        prevState,
        prevContext
      ) {
        if (oldProps) {
          warnDeprecatedProps(
            ComposedComponent.name,
            version,
            this.props,
            oldProps,
            message
          )
        } else {
          warnDeprecatedComponent(version, ComposedComponent.name, message)
        }

        if (ComposedComponent.prototype.componentDidUpdate) {
          ComposedComponent.prototype.componentDidUpdate.call(
            this,
            prevProps,
            prevState,
            prevContext
          )
        }
      }
      return DeprecatedComponent
    }
  )
  /**
   * ---
   * category: utilities
   * ---
   * Trigger a console warning if the specified prop variant is deprecated
   *
   * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
   * @param {array} deprecated - an array of the deprecated variant names
   * @param {string|function} message - a string with additional information (like the version the prop will be removed) or a function returning a string
   */
  ;(deprecated as DeprecatedDecorator).deprecatePropValues = (
    propType: (
      props: Record<string, any>,
      propName: string,
      componentName: string,
      ...rest: any[]
    ) => boolean,
    deprecated: string[] = [],
    message:
      | string
      | ((arg: { props: any; propName: string; propValue: any }) => string)
  ) => {
    return (
      props: Record<string, any>,
      propName: string,
      componentName: string,
      ...rest: any[]
    ) => {
      const isDeprecatedValue = deprecated.includes(props[propName])

      const warningMessage =
        message && typeof message === 'function'
          ? message({ props, propName, propValue: props[propName] })
          : `The '${
              props[propName]
            }' value for the \`${propName}\` prop is deprecated. ${
              message || ''
            }`
      // @ts-expect-error TODO remove if its typed
      warnDeprecated(!isDeprecatedValue, `[${componentName}] ${warningMessage}`)

      return isDeprecatedValue
        ? null
        : propType(props, propName, componentName, ...rest)
    }
  }

  function warnDeprecatedProps(
    componentName: string,
    version: string,
    props: Record<string, any>,
    oldProps: Record<string, any>,
    message = ''
  ) {
    Object.keys(oldProps).forEach((oldProp) => {
      if (typeof props[oldProp] !== 'undefined') {
        const newProp =
          typeof oldProps[oldProp] === 'string' ? oldProps[oldProp] : null

        const newPropMessage = newProp ? `. Use \`${newProp}\` instead` : ''

        // @ts-expect-error TODO remove if its typed
        warnDeprecated(
          false,
          `[${componentName}] \`${oldProp}\` is deprecated and will be removed in version ${version}${newPropMessage}. ${message}`
        )
      }
    })
  }
  ;(deprecated as DeprecatedDecorator).warnDeprecatedProps = warnDeprecatedProps

  function warnDeprecatedComponent(
    version: string,
    componentName: string,
    message: string
  ) {
    // @ts-expect-error TODO remove if its typed
    warnDeprecated(
      false,
      `[${componentName}] is deprecated and will be removed in version ${version}. ${
        message || ''
      }`
    )
  }
  /**
   * ---
   * category: utilities
   * ---
   * @param {String} version the version of the package in which the component or function was deprecated
   * @param {String} componentName the name of the component or Function.name of the utility function
   * @param {String} message a message to display as a console error in DEV env when condition is false
   */
  ;(deprecated as DeprecatedDecorator).warnDeprecatedComponent =
    warnDeprecatedComponent

  /**
   * ---
   * category: utilities
   * ---
   * @param {String} prevPackage the previous name of the package
   * @param {String} newPackage the new version of the package
   * @return {String} the formatted warning string
   */
  ;(deprecated as DeprecatedDecorator).changedPackageWarning = (
    prevPackage: string,
    newPackage: string
  ) => {
    return `It has been moved from @instructure/${prevPackage} to @instructure/${newPackage}.`
  }

  return deprecated as DeprecatedDecorator
})()

export default deprecated
export { deprecated }
