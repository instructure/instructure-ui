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

import { Component, Children, ReactElement } from 'react'

import { View } from '@instructure/ui-view'
import {
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { BadgeProps } from './props'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Badge extends Component<BadgeProps> {
  static readonly componentId = 'Badge'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    standalone: false,
    type: 'count',
    variant: 'primary',
    display: 'inline-block',
    pulse: false,
    placement: 'top end',
    elementRef: () => {},
    formatOverflowText: (_count: number, countUntil: number) =>
      `${countUntil - 1} +`
  }

  constructor(props: BadgeProps) {
    super(props)
    this._defaultId = this.props.deterministicId!()
  }

  _defaultId: string

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }
  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  countOverflow() {
    const { count, countUntil } = this.props

    return countUntil && count && countUntil > 1 && count >= countUntil
  }

  renderOutput() {
    const { count, countUntil, formatOverflowText, formatOutput, type } =
      this.props

    // If the badge count is >= than the countUntil limit, format the badge text
    // via the formatOverflowText function prop
    let formattedCount = (count || '').toString()
    if (
      count &&
      countUntil &&
      formatOverflowText &&
      type === 'count' &&
      this.countOverflow()
    ) {
      formattedCount = formatOverflowText(count, countUntil)
    }

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
        css={styles?.badge}
        title={
          type === 'count' && this.countOverflow() ? count?.toString() : ''
        }
        id={!standalone ? this._defaultId : undefined}
        display={standalone ? 'inline-block' : 'block'}
        {...(standalone && { elementRef: this.handleRef })}
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
    const { margin, standalone, display, as, styles } = this.props

    if (standalone) {
      return this.renderBadge()
    } else {
      return (
        <View
          as={as}
          margin={margin}
          elementRef={this.handleRef}
          css={styles?.wrapper}
          display={display}
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
