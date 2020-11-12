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
import { decorator } from '@instructure/ui-decorator'

import { TextDirectionContext } from './TextDirectionContext'
import { getTextDirection } from './getTextDirection'
import { useTextDirectionContext } from './ApplyTextDirection'

const { DIRECTION, getTextDirectionContext } = TextDirectionContext

/**
 * ---
 * category: utilities/i18n
 * ---
 * A decorator or higher order component that makes a component `bidirectional`.
 *
 * As a HOC:
 *
 * ```js
 * import { bidirectional } from '@instructure/ui-i18n'
 *
 * class Example extends React.Component {
 *   render () {
 *     return this.dir === bidirectional.DIRECTION.rtl ? <div>rtl</div> : <div>ltr</div>
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
const bidirectional = decorator((ComposedComponent) => {
  return class BidirectionalComponent extends ComposedComponent {
    static propTypes = {
      ...ComposedComponent.propTypes,
      dir: PropTypes.oneOf(Object.values(TextDirectionContext.DIRECTION))
    }

    static contextTypes = {
      ...ComposedComponent.contextTypes,
      ...TextDirectionContext.types
    }

    get dir() {
      const context = getTextDirectionContext(this.context) || {}
      return context.dir || this.props.dir || getTextDirection()
    }

    get rtl() {
      return this.dir === DIRECTION.rtl
    }

    get ltr() {
      return this.dir === DIRECTION.ltr
    }
  }
})

bidirectional.DIRECTION = DIRECTION

const useBidirectional = (props = {}) => {
  const context = useTextDirectionContext()
  const dir = props.dir || context

  return {
    dir,
    rtl: dir === DIRECTION.rtl,
    ltr: dir === DIRECTION.ltr
  }
}

const withBidirectional = (ComposedComponent) => {
  return function BidirectionalComponent(props) {
    const textDirectionContextValue = useBidirectional(props)

    return <ComposedComponent {...{ ...props, ...textDirectionContextValue }} />
  }
}

export default bidirectional
export { bidirectional, useBidirectional, withBidirectional }
