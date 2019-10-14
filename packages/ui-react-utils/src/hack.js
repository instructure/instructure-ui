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
* Flag React component props as hack props.
* Warnings will display in the console when hack props are used.
*
* ```js
*  class Example extends Component {
*    static propTypes = {
*      currentProp: PropTypes.func
*    }
*  }
*  export default hack(['hackProp'])(Example)
* ```
*
* @module hack
* @param {array} hackProps
* @param {string} message
* @return {function} React component flagged as having hack props
*/
const hack = process.env.NODE_ENV == 'production'
  ? () => (Component => Component)
  : decorator((ComposedComponent, hackProps, message) => {
      return class HackComponent extends ComposedComponent {
        componentDidMount() {
          if (hackProps) {
            warnHackProps(ComposedComponent.displayName, this.props, hackProps, message)
          }

          if (super.componentDidMount) {
            super.componentDidMount()
          }
        }

        componentWillReceiveProps(nextProps, nextContext) {
          if (hackProps) {
            warnHackProps(ComposedComponent.displayName, nextProps, hackProps, message)
          }

          if (super.componentWillReceiveProps) {
            super.componentWillReceiveProps(nextProps, nextContext)
          }
        }
      }
    })

function warnHackProps (displayName, props, hackProps, message = '') {
  hackProps.forEach((hackProp) => {
    warn(
      (typeof props[hackProp] === 'undefined'),
      `[${displayName}] The \`${hackProp}\` prop is a temporary hack and will be removed in a future release. ${message}`
    )
  })
}

export default hack
export { hack }
