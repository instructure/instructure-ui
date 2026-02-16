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

import { Component } from 'react'

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import { withStyleLegacy as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { ProgressCircleProps, ProgressCircleState, Values } from './props'
import { allowedProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ProgressCircle extends Component<
  ProgressCircleProps,
  ProgressCircleState
> {
  static readonly componentId = 'ProgressCircle'

  static allowedProps = allowedProps

  static defaultProps = {
    formatScreenReaderValue: ({ valueNow, valueMax }: Values) =>
      `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    as: 'div',
    color: 'primary',
    shouldAnimateOnMount: false,

    // default to showing `success` color on completion
    meterColor: ({ valueNow, valueMax }: Values) =>
      valueNow / valueMax >= 1 ? 'success' : 'brand'
  }

  _timeouts: Array<ReturnType<typeof setTimeout>> = []
  ref: Element | null = null

  constructor(props: ProgressCircleProps) {
    super(props)

    this.state = {
      shouldAnimateOnMount: props.shouldAnimateOnMount!
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
      typeof formatScreenReaderValue === 'function'
        ? formatScreenReaderValue({ valueNow: valueNow!, valueMax: valueMax! })
        : undefined
    // consolidating the label and aria-valuetext to put in aria-label because
    // NVDA does not read aria-valuetext: https://github.com/nvaccess/nvda/issues/913
    // But leaving aria-valuetext because JAWS ignores aria-label
    const labelAndValueText = `${screenReaderLabel} ${valueText}`

    const value = callRenderProp(renderValue, {
      valueNow: valueNow!,
      valueMax: valueMax!
    })

    const style = {
      strokeDashoffset: `${styles?.dashOffset}em`
    }

    return (
      <View
        {...passthroughProps(props)}
        as={this.props.as}
        elementRef={this.handleRef}
        css={styles?.progressCircle}
        margin={this.props.margin}
        data-cid="ProgressCircle"
      >
        <ScreenReaderContent>
          <progress
            max={valueMax}
            value={valueNow}
            aria-valuetext={labelAndValueText}
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
            r={styles?.radii?.radius}
          />
          <circle
            css={styles?.border}
            role="presentation"
            cx="50%"
            cy="50%"
            r={styles?.radii?.borderOffsetRadius}
          />
          <circle
            css={styles?.meter}
            role="presentation"
            style={style}
            cx="50%"
            cy="50%"
            r={styles?.radii?.radius}
          />
        </svg>
      </View>
    )
  }
}

export default ProgressCircle
export { ProgressCircle }
