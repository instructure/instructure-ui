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
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { ThemeablePropTypes } from '@instructure/ui-themeable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ProgressBar extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * A label is required for accessibility
     */
    screenReaderLabel: PropTypes.string.isRequired,
    /**
     * Control the height of the progress bar
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
     * A function for formatting the text provided to screen readers via `aria-valuenow`
     */
    formatScreenReaderValue: PropTypes.func,
    /**
     * A function to format the displayed value. If null the value will not display.
     * Takes `valueNow` and `valueMax` as parameters.
     */
    renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /**
     * Controls the overall color scheme of the component
     */
    color: PropTypes.oneOf(['primary', 'primary-inverse']),
    /**
     * Control the color of the progress meter. Defaults to showing theme success
     * color on completion, based on `valueNow` and `valueMax`.
     */
    meterColor: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.oneOf([
        'info',
        'warning',
        'danger',
        'alert',
        'success',
        'brand'
      ])
    ]),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Provides a reference to the component's root HTML element
     */
    elementRef: PropTypes.func,
    /**
     * Set the element type of the component's root
     */
    as: PropTypes.elementType
  }

  static defaultProps = {
    formatScreenReaderValue: ({ valueNow, valueMax }) =>
      `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    as: 'div',
    renderValue: undefined,
    margin: undefined,
    elementRef: undefined,
    color: 'primary',

    // default to showing `success` color on completion
    meterColor: ({ valueNow, valueMax }) =>
      valueNow / valueMax >= 1 ? 'success' : 'brand'
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
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
        css={styles.progressBar}
        margin={this.props.margin}
        elementRef={this.props.elementRef}
      >
        <span css={styles.trackLayout}>
          {/* creates bottom border effect - <progress /> hard to style x-browser */}
          <span css={styles.trackBorder}></span>

          <progress
            css={styles.track}
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
          <span css={styles.value} aria-hidden="true">
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
