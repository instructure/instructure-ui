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

/** @jsx jsx */
import { Component, Children, ReactElement } from 'react'
import PropTypes from 'prop-types'

import { PositionPropTypes } from '@instructure/ui-position'
import { View } from '@instructure/ui-view'
import { safeCloneElement } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  count?: number
  countUntil?: number
  type?: 'count' | 'notification'
  standalone?: boolean
  pulse?: boolean
  variant?: 'primary' | 'success' | 'danger'
  elementRef?: (...args: any[]) => any
  formatOverflowText?: (...args: any[]) => any
  formatOutput?: (...args: any[]) => any
  as?: React.ReactElement
  margin: Spacing
  placement: any //TODO: typeof PositionPropTypes.placement
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Badge extends Component<Props> {
  static componentId = 'Badge'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    count: PropTypes.number,
    /**
     * The number at which the count gets truncated by
     * formatOverflowText. For example, a countUntil of 100
     * would stop the count at 99.
     */
    countUntil: PropTypes.number,
    children: PropTypes.element,
    /**
     * Render Badge as a counter (`count`) or as a smaller dot (`notification`) with
     * no count number displayed.
     */
    type: PropTypes.oneOf(['count', 'notification']),
    /**
     * Render Badge as an inline html element that is not positioned relative
     * to a child.
     */
    standalone: PropTypes.bool,
    /**
     * Make the Badge slowly pulse twice to get the user's attention.
     */
    pulse: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'success', 'danger']),
    /**
     * Supported values are `top start`, `top end`, `end center`, `bottom end`,
     * `bottom start`, and `start center`
     */
    placement: PositionPropTypes.placement,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    formatOverflowText: PropTypes.func,
    formatOutput: PropTypes.func,
    as: PropTypes.elementType // eslint-disable-line react/require-default-props
  }

  static defaultProps = {
    count: undefined,
    children: null,
    countUntil: undefined,
    margin: undefined,
    formatOutput: undefined,
    standalone: false,
    type: 'count',
    variant: 'primary',
    pulse: false,
    placement: 'top end',
    elementRef: () => {},
    formatOverflowText: (_count: number, countUntil: number) =>
      `${countUntil - 1} +`
  }
  _defaultId: string

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    this._defaultId = uid('Badge')
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  countOverflow() {
    const { count, countUntil } = this.props

    //@ts-expect-error FIXME: possibly undefined
    if (countUntil > 1 && count >= countUntil) {
      return true
    } else {
      return false
    }
  }

  renderOutput() {
    const { count, countUntil, formatOverflowText, formatOutput, type } =
      this.props

    // If the badge count is >= than the countUntil limit, format the badge text
    // via the formatOverflowText function prop
    const formattedCount =
      type === 'count' && this.countOverflow()
        ? //@ts-expect-error FIXME: possibly undefined call
          formatOverflowText(count, countUntil)
        : count

    if (typeof formatOutput === 'function') {
      return formatOutput(formattedCount)
    } else {
      return type === 'count' ? formattedCount : null
    }
  }

  renderBadge() {
    const { count, margin, standalone, type, styles } = this.props

    return (
      <View
        margin={standalone ? margin : 'none'}
        css={styles.badge}
        title={type === 'count' && this.countOverflow() ? count : null}
        id={!standalone ? this._defaultId : null}
        display={standalone ? 'inline-block' : 'block'}
      >
        {this.renderOutput()}
      </View>
    )
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child as ReactElement, {
        'aria-describedby': this._defaultId
      })
    })
  }

  render() {
    const { margin, elementRef, standalone, as, styles } = this.props

    if (standalone) {
      return this.renderBadge()
    } else {
      return (
        <View
          as={as}
          margin={margin}
          elementRef={elementRef}
          css={styles.wrapper}
          display="inline-block"
        >
          {this.renderChildren()}
          {this.renderBadge()}
        </View>
      )
    }
  }
}

export default Badge
export { Badge }
