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

import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { ProgressBarProps } from './props'
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
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'valueNow' implicitly has an 'any'... Remove this comment to see the full error message
    formatScreenReaderValue: ({ valueNow, valueMax }) =>
      `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    as: 'div',
    color: 'primary',

    // default to showing `success` color on completion
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'valueNow' implicitly has an 'any'... Remove this comment to see the full error message
    meterColor: ({ valueNow, valueMax }) =>
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
    this.ref = el
    this.props.elementRef?.(el)
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
      styles,
      ...props
    } = this.props

    const valueText =
      typeof formatScreenReaderValue === 'function' &&
      formatScreenReaderValue({ valueNow, valueMax })
    // consolidating the label and aria-valuetext to put in aria-label because
    // NVDA does not read aria-valuetext: https://github.com/nvaccess/nvda/issues/913
    // But leaving aria-valuetext because JAWS ignores aria-label
    const labelAndValueText = `${screenReaderLabel} ${valueText}`

    const value = callRenderProp(renderValue, { valueNow, valueMax })

    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <View
        {...passthroughProps(props)}
        as={this.props.as}
        css={styles?.progressBar}
        margin={this.props.margin}
        elementRef={this.handleRef}
      >
        <span css={styles?.trackLayout}>
          {/* creates bottom border effect - <progress /> hard to style x-browser */}
          <span css={styles?.trackBorder}></span>

          <progress
            css={styles?.track}
            max={valueMax}
            value={valueNow}
            role="progressbar"
            aria-valuetext={valueText}
            aria-valuenow={valueNow}
            aria-valuemax={valueMax}
            aria-label={labelAndValueText}
          />
        </span>

        {value && (
          <span css={styles?.value} aria-hidden="true">
            {value}
          </span>
        )}
      </View>
    )
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}

export default ProgressBar
export { ProgressBar }
