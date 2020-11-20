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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { deprecated } from '@instructure/ui-react-utils'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import { ProgressBar } from '../ProgressBar'
import { ProgressCircle } from '../ProgressCircle'

/**
---
category: components
---
**/

@deprecated('8.0.0', null, 'Use ProgressBar or ProgressCircle instead.')
@testable()
class Progress extends Component {
  static propTypes = {
    /**
     * A label is required for accessibility
     */
    label: PropTypes.string.isRequired,
    /**
     * Different-sized progress bars and circles
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
    /**
     * Maximum value (defaults to 100)
     */
    valueMax: PropTypes.number,
    /**
     * Receives the progress of the event
     */
    valueNow: PropTypes.number,
    /**
     * A function that returns the current value formatted for screen readers
     */
    formatValueText: PropTypes.func,
    /**
     * A function to format the displayed value. If null the value will not display.
     */
    formatDisplayedValue: PropTypes.func,
    /**
     * Animate the progress meter to the current value when the component
     * has mounted
     */
    animateOnMount: PropTypes.bool,
    /**
     * The bar changes to your theme's success color when complete
     */
    successColor: PropTypes.bool,
    /**
     * Choose either a progress bar or circle. The `-inverse` variants are for
     * when you need the Progress component to appear on inverse backgrounds
     */
    variant: PropTypes.oneOf([
      'bar',
      'circle',
      'bar-inverse',
      'circle-inverse'
    ]),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func
  }

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => `${valueNow} / ${valueMax}`,
    formatDisplayedValue: undefined,
    size: 'medium',
    animateOnMount: false,
    valueMax: 100,
    valueNow: 0,
    variant: 'bar',
    successColor: true,
    elementRef: (el) => {},
    margin: undefined
  }

  render() {
    const {
      label,
      successColor,
      animateOnMount,
      variant,
      ...props
    } = this.props

    const childVariant =
      variant === 'bar-inverse' || variant === 'circle-inverse'
        ? 'primary-inverse'
        : 'primary'

    const formatValueText =
      typeof this.props.formatValueText === 'function'
        ? ({ valueNow, valueMax }) =>
            this.props.formatValueText(valueNow, valueMax)
        : undefined

    const formatDisplayedValue =
      typeof this.props.formatDisplayedValue === 'function'
        ? ({ valueNow, valueMax }) =>
            this.props.formatDisplayedValue(valueNow, valueMax)
        : undefined

    const isCircle = variant === 'circle' || variant === 'circle-inverse'

    // translate legacy Progress props into props accepted by the new components
    const updatedProps = {
      ...props,
      formatScreenReaderValue: formatValueText,
      renderValue: formatDisplayedValue,
      screenReaderLabel: label,
      color: childVariant,
      meterColor: !successColor ? 'brand' : undefined,
      shouldAnimateOnMount: isCircle && animateOnMount
    }

    return isCircle ? (
      <ProgressCircle {...updatedProps} />
    ) : (
      <ProgressBar {...updatedProps} />
    )
  }
}

export default Progress
export { Progress }
