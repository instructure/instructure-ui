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
import { Component } from 'react'

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { ProgressCircleProps, ProgressCircleState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ProgressCircle extends Component<
  ProgressCircleProps,
  ProgressCircleState
> {
  static readonly componentId = 'ProgressCircle'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    formatScreenReaderValue: ({ valueNow, valueMax }) =>
      `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    as: 'div',
    color: 'primary',
    shouldAnimateOnMount: false,

    // default to showing `success` color on completion
    meterColor: ({ valueNow, valueMax }) =>
      valueNow / valueMax >= 1 ? 'success' : 'brand'
  }

  _timeouts = []
  ref: Element | null = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      shouldAnimateOnMount: props.shouldAnimateOnMount
    }
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  get makeStylesVariables() {
    return { shouldAnimateOnMount: this.state.shouldAnimateOnMount }
  }

  componentDidMount() {
    if (this.state.shouldAnimateOnMount) {
      this._timeouts.push(
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
        setTimeout(() => {
          this.setState({
            shouldAnimateOnMount: false
          })
        }, this.props.animationDelay || 500)
      )
    }

    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentWillUnmount() {
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  render() {
    const {
      color,
      renderValue,
      formatScreenReaderValue,
      meterColor,
      valueNow,
      valueMax,
      screenReaderLabel,
      size,
      styles,
      ...props
    } = this.props

    const valueText =
      typeof formatScreenReaderValue === 'function' &&
      formatScreenReaderValue({ valueNow: valueNow!, valueMax: valueMax! })
    // consolidating the label and aria-valuetext to put in aria-label because
    // NVDA does not read aria-valuetext: https://github.com/nvaccess/nvda/issues/913
    // But leaving aria-valuetext because JAWS ignores aria-label
    const labelAndValueText = `${screenReaderLabel} ${valueText}`

    const value = callRenderProp(renderValue, { valueNow, valueMax })

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'animateOnMount' does not exist on type '... Remove this comment to see the full error message
    const style = this.state.animateOnMount
      ? null
      : {
          strokeDashoffset: `${styles?.dashOffset}em`
        }

    return (
      <View
        {...passthroughProps(props)}
        as={this.props.as}
        elementRef={this.handleRef}
        css={styles?.progressCircle}
        margin={this.props.margin}
      >
        <ScreenReaderContent>
          <progress
            max={valueMax}
            value={valueNow}
            aria-valuetext={valueText}
            aria-valuenow={valueNow}
            aria-valuemax={valueMax}
            aria-label={labelAndValueText}
          />
        </ScreenReaderContent>
        {value && (
          <span css={styles?.center} aria-hidden="true">
            <span css={styles?.value}>{value}</span>
          </span>
        )}
        <svg css={styles?.circle} role="presentation" focusable="false">
          <circle
            css={styles?.track}
            role="presentation"
            cx="50%"
            cy="50%"
            //@ts-expect-error TODO:
            r={styles?.radii?.radius}
          />
          <circle
            css={styles?.border}
            role="presentation"
            cx="50%"
            cy="50%"
            //@ts-expect-error TODO:
            r={styles?.radii?.borderOffsetRadius}
          />
          <circle
            css={styles?.meter}
            role="presentation"
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ strokeDashoffset: string; } | null' is not... Remove this comment to see the full error message
            style={style}
            cx="50%"
            cy="50%"
            //@ts-expect-error TODO:
            r={styles?.radii?.radius}
          />
        </svg>
      </View>
    )
  }
}

export default ProgressCircle
export { ProgressCircle }
