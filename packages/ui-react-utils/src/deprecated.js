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

import { warn } from '@instructure/console/macro'

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
* @module deprecated
* @param {string} version
* @param {object} oldProps (if this argument is null or undefined, the entire component is deprecated)
* @param {string} message
* @return {function} React component with deprecated props behavior
*/
const deprecated = decorator((ComposedComponent, version, oldProps, message) => {
  class DeprecatedComponent extends ComposedComponent {}

  if (process.env.NODE_ENV !== 'production') {
    DeprecatedComponent.prototype.componentDidMount = function () {
      if (oldProps) {
        warnDeprecatedProps(ComposedComponent.displayName, version, this.props, oldProps, message)
      } else {
        warnDeprecatedComponent(version, ComposedComponent.displayName, message)
      }

      if (ComposedComponent.prototype.componentDidMount) {
        ComposedComponent.prototype.componentDidMount.call(this)
      }
    }

    DeprecatedComponent.prototype.componentWillReceiveProps = function(nextProps, nextContext) {
      if (oldProps) {
        warnDeprecatedProps(ComposedComponent.displayName, version, nextProps, oldProps, message)
      } else {
        warnDeprecatedComponent(version, ComposedComponent.displayName, message)
      }

      if (ComposedComponent.prototype.componentWillReceiveProps) {
        ComposedComponent.prototype.componentWillReceiveProps.call(this, nextProps, nextContext)
      }
    }
  }

  return DeprecatedComponent
})

/**
 *
 * Trigger a console warning if the specified prop variant is deprecated
 *
 * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
 * @param {array} deprecated - an array of the deprecated variant names
 * @param {string} message - additional information to display with the warning (include the version in which they will be removed)
 */
function deprecatePropValues(propType, deprecated = [], message) {
  return (props, propName, componentName, ...rest) => {
    const isDeprecatedValue = deprecated.includes(props[propName])
    warn(
      (!isDeprecatedValue),
      `[${componentName}] The '${props[propName]}' value for the \`${propName}\` prop is deprecated. ${message || ''}`
    )
    return isDeprecatedValue ? null : propType(props, propName, componentName, ...rest)
  }
}

function warnDeprecatedProps(componentName, version, props, oldProps, message = '') {
  Object.keys(oldProps).forEach((oldProp) => {
    if (typeof props[oldProp] !== 'undefined') {
      const newProp = typeof oldProps[oldProp] === 'string'
        ? oldProps[oldProp]
        : null

      const newPropMessage = newProp ? `. Use \`${newProp}\` instead` : ''

      warn(
        false,
        `[${componentName}] \`${oldProp}\` is deprecated and will be removed in version ${version}${newPropMessage}. ${message}`,
      )
    }
  })
}

/**
 * ---
 * category: utilities
 * ---
 * @param {String} version the version of the package in which the component or function was deprecated
  * @param {String} componentName the displayName of the component or Function.name of the utility function
 * @param {String} message a message to display as a console error in DEV env when condition is false
 */
function warnDeprecatedComponent(version, componentName, message) {
  warn(false, `[${componentName}] is deprecated and will be removed in version ${version}. ${message || ''}`)
}

/**
 * ---
 * category: utilities
 * ---
 * @param {String} prevPackage the previous name of the package
 * @param {String} newPackage the new version of the package
 * @return {String} the formatted warning string
 */
function changedPackageWarning(prevPackage, newPackage) {
  return `It has been moved from @instructure/${prevPackage} to @instructure/${newPackage}.`
}

export default deprecated
export {
  deprecated,
  changedPackageWarning,
  warnDeprecatedComponent,
  warnDeprecatedProps,
  deprecatePropValues
}
