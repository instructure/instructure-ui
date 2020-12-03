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
import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { PositionPropTypes } from '@instructure/ui-position'
import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { safeCloneElement } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@testable()
@themeable(theme, styles)
class Badge extends Component {
  static propTypes = {
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
    elementRef: (el) => {},
    formatOverflowText: (count, countUntil) => `${countUntil - 1} +`
  }

  constructor(props) {
    super(props)
    this._defaultId = uid('Badge')
  }

  countOverflow() {
    const { count, countUntil } = this.props

    if (countUntil > 1 && count >= countUntil) {
      return true
    } else {
      return false
    }
  }

  renderOutput() {
    const {
      count,
      countUntil,
      formatOverflowText,
      formatOutput,
      type
    } = this.props

    // If the badge count is >= than the countUntil limit, format the badge text
    // via the formatOverflowText function prop
    const formattedCount =
      type === 'count' && this.countOverflow()
        ? formatOverflowText(count, countUntil)
        : count

    if (typeof formatOutput === 'function') {
      return formatOutput(formattedCount)
    } else {
      return type === 'count' ? formattedCount : null
    }
  }

  renderBadge() {
    const {
      count,
      margin,
      pulse,
      placement,
      standalone,
      type,
      variant
    } = this.props

    return (
      <View
        margin={standalone ? margin : 'none'}
        className={classnames({
          [styles.root]: true,
          [styles[type]]: type,
          [styles[variant]]: variant,
          [styles['positioned--top']]: placement.indexOf('top') > -1,
          [styles['positioned--bottom']]: placement.indexOf('bottom') > -1,
          [styles['positioned--start']]: placement.indexOf('start') > -1,
          [styles['positioned--end']]: placement.indexOf('end') > -1,
          [styles['positioned--center']]: placement.indexOf('center') > -1,
          [styles.standalone]: standalone,
          [styles.pulse]: pulse
        })}
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
      return safeCloneElement(child, {
        'aria-describedby': this._defaultId
      })
    })
  }

  render() {
    const { margin, elementRef, standalone, as } = this.props

    if (standalone) {
      return this.renderBadge()
    } else {
      return (
        <View
          as={as}
          margin={margin}
          elementRef={elementRef}
          className={styles.wrapper}
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
