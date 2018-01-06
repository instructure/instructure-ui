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

import getDisplayName from './getDisplayName'
import warning from '../warning'

/**
* ---
* category: utilities/react
* ---
* Deprecate React component props. Warnings will display in the console when deprecated
* props are used.
*
* ```js
*  class Example extends Component {
*    static propTypes = {
*      currentProp: PropTypes.func
*    }
*  }
*  export default deprecated('3.0.0', {
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
export default function deprecated (version, oldProps, message) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class DeprecatedComponent extends ComposedComponent {
      static displayName = displayName

      componentDidMount () {
        if (oldProps) {
          warnDeprecatedProps(displayName, version, this.props, oldProps, message)
        } else {
          warnDeprecatedComponent(version, displayName, message)
        }

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillReceiveProps (nextProps) {
        if (oldProps) {
          warnDeprecatedProps(displayName, version, nextProps, oldProps, message)
        } else {
          warnDeprecatedComponent(version, displayName, message)
        }

        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps(nextProps)
        }
      }
    }

    return DeprecatedComponent
  }
}

function warnDeprecatedProps (displayName, version, props, oldProps, message) {
  Object.keys(oldProps).forEach((oldProp) => {
    if (typeof props[oldProp] !== 'undefined') {
      const newProp = typeof oldProps[oldProp] === 'string'
        ? oldProps[oldProp]
        : null

      warning(
        false,
        '[%s] `%s` was deprecated in %s%s. %s',
        displayName, oldProp, version, (newProp ? `. Use \`${newProp}\` instead` : ''), message || ''
      )
    }
  })
}

function warnDeprecatedComponent (version, displayName, message) {
  warning(false, '[%s] was deprecated in version %s. %s', displayName, version, message || '')
}

export function changedPackageWarning (prevPackage, newPackage) {
  return `It has been moved from @instructure/${prevPackage} to @instructure/${newPackage}.`
}
