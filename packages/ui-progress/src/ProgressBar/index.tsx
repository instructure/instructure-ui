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

import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { ProgressBarProps, Values } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ProgressBar extends Component<ProgressBarProps> {
  static readonly componentId = 'ProgressBar'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    formatScreenReaderValue: ({ valueNow, valueMax }: Values) =>
      `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    as: 'div',
    color: 'primary',
    shouldAnimate: false,

    // default to showing `success` color on completion
    meterColor: ({ valueNow, valueMax }: Values) =>
      valueNow / valueMax >= 1 ? 'success' : 'brand'
  }

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  render() {
    const {
      renderValue,
      formatScreenReaderValue,
      valueNow,
      valueMax,
      screenReaderLabel,
      size,
      color,
      meterColor,
      renderValueInside,
      styles,
      ...props
    } = this.props

    const valueText =
      typeof formatScreenReaderValue === 'function'
        ? formatScreenReaderValue({ valueNow: valueNow!, valueMax: valueMax! })
        : undefined

    const value = callRenderProp(renderValue, {
      valueNow: valueNow!,
      valueMax: valueMax!
    })

    return (
      <View
        {...passthroughProps(props)}
        as={this.props.as}
        css={styles?.progressBar}
        margin={this.props.margin}
        elementRef={this.handleRef}
      >
        <span css={styles?.trackLayout}>
          <progress
            css={styles?.htmlProgress}
            max={valueMax}
            value={valueNow}
            aria-valuetext={valueText}
            aria-label={screenReaderLabel}
          />

          <span css={styles?.track} role="presentation" aria-hidden="true">
            <span css={styles?.trackValue}>{renderValueInside && value}</span>
          </span>
        </span>

        {value && !renderValueInside && (
          <span css={styles?.value} aria-hidden="true">
            {value}
          </span>
        )}
      </View>
    )
  }
}

export default ProgressBar
export { ProgressBar }
