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
import PropTypes from 'prop-types'
import decorator from '@instructure/ui-decorator'

import { TextDirectionContextTypes, getTextDirectionContext, DIRECTION } from './TextDirectionContextTypes'
import getTextDirection from './utils/getTextDirection'

/**
* ---
* category: utilities/i18n
* ---
* A decorator or higher order component that makes a component `bidirectional`.
*
* As an HOC:
*
* ```js
* import bidirectional, { DIRECTION } from '@instructure/ui-i18n/lib/bidirectional'
*
* class Example extends React.Component {
*   render () {
*     return this.dir === DIRECTION.rtl ? <div>rtl</div> : <div>ltr</div>
*   }
* }
*
* export default bidirectional()(Example)
* ```
*
* When used as a child of [ApplyTextDirection](#ApplyTextDirection), bidirectional components use
* the direction provided in the context. When used without [ApplyTextDirection](#ApplyTextDirection),
* the direction can be supplied explicitly via the `dir` prop. If no `dir` prop is provided,
* bidirectional components query the documentElement for the `dir` attribute, defaulting to `ltr`
* if it is not present.
*
* @return {function} composes the bidirectional component.
*/
export default decorator((ComposedComponent) => {
  return class BidirectionalComponent extends ComposedComponent {
    static propTypes = {
      ...ComposedComponent.propTypes,
      dir: PropTypes.oneOf(Object.values(DIRECTION))
    }

    static contextTypes = {
      ...ComposedComponent.contextTypes,
      ...TextDirectionContextTypes
    }

    _defaultDirection = getTextDirection()

    get dir () {
      const context = getTextDirectionContext(this.context) || {}

      return context.dir  ||
        this.props.dir ||
        this._defaultDirection
    }

    get rtl () {
      return this.dir === DIRECTION.rtl
    }

    get ltr () {
      return this.dir === DIRECTION.ltr
    }
  }
})

export { DIRECTION } from './TextDirectionContextTypes'
