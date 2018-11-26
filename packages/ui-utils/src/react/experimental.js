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
* Flag React component and component props as experimental.
* Warnings will display in the console when experimental components/props
* props are used.
*
* ```js
*  class Example extends Component {
*    static propTypes = {
*      currentProp: PropTypes.func
*    }
*  }
*  export default experimental(['experimentalProp'])(Example)
* ```
*
* @module experimental
* @param {array} experimentalProps (if this argument is null or undefined, the entire component is flagged)
* @param {string} message
* @return {function} React component flagged as experimental
*/
export default function experimental (experimentalProps, message) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class ExperimentalComponent extends ComposedComponent {
      static displayName = displayName

      componentDidMount () {
        if (experimentalProps) {
          warnExperimentalProps(displayName, this.props, experimentalProps, message)
        } else {
          warnExperimentalComponent(displayName, message)
        }

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillReceiveProps (nextProps) {
        if (experimentalProps) {
          warnExperimentalProps(displayName, nextProps, experimentalProps, message)
        } else {
          warnExperimentalComponent(displayName, message)
        }

        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps(nextProps)
        }
      }
    }

    return ExperimentalComponent
  }
}

function warnExperimentalProps (displayName, props, experimentalProps, message = '') {
  experimentalProps.forEach((experimentalProp) => {
    if (typeof props[experimentalProp] !== 'undefined') {
      warning(
        false,
        `[${displayName}] The \`${experimentalProp}\` prop is experimental and its API could change significantly in a future release. ${message}`
      )
    }
  })
}

function warnExperimentalComponent (displayName, message = '') {
  warning(
    false,
    `[${displayName}] is experimental and its API could change significantly in a future release. ${message}`
  )
}
