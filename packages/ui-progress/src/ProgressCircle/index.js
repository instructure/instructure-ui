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

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ProgressCircle extends Component {
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
     * Control the size of the progress circle
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
    formatScreenReaderValue: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]),
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
    as: PropTypes.elementType,
    /**
     * Animate the progress meter to the current value when the component
     * has mounted
     */
    shouldAnimateOnMount: PropTypes.bool,
    animationDelay: PropTypes.number
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
    shouldAnimateOnMount: false,
    animationDelay: undefined,

    // default to showing `success` color on completion
    meterColor: ({ valueNow, valueMax }) =>
      valueNow / valueMax >= 1 ? 'success' : 'brand'
  }

  _timeouts = []

  constructor(props) {
    super(props)

    this.state = {
      shouldAnimateOnMount: props.shouldAnimateOnMount
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

    this.props.makeStyles(this.makeStylesVariables)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles(this.makeStylesVariables)
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
      formatScreenReaderValue({ valueNow, valueMax })
    // consolidating the label and aria-valuetext to put in aria-label because
    // NVDA does not read aria-valuetext: https://github.com/nvaccess/nvda/issues/913
    // But leaving aria-valuetext because JAWS ignores aria-label
    const labelAndValueText = `${screenReaderLabel} ${valueText}`

    const value = callRenderProp(renderValue, { valueNow, valueMax })

    const style = this.state.animateOnMount
      ? null
      : {
          strokeDashoffset: `${styles.dashOffset}em`
        }

    return (
      <View
        {...passthroughProps(props)}
        as={this.props.as}
        elementRef={this.props.elementRef}
        css={styles.progressCircle}
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
          <span css={styles.center} aria-hidden="true">
            <span css={styles.value}>{value}</span>
          </span>
        )}
        <svg css={styles.circle} role="presentation" focusable="false">
          <circle
            css={styles.track}
            role="presentation"
            cx="50%"
            cy="50%"
            r={styles.radii.radius}
          />
          <circle
            css={styles.border}
            role="presentation"
            cx="50%"
            cy="50%"
            r={styles.radii.borderOffsetRadius}
          />
          <circle
            css={styles.meter}
            role="presentation"
            style={style}
            cx="50%"
            cy="50%"
            r={styles.radii.radius}
          />
        </svg>
      </View>
    )
  }
}

export default ProgressCircle
export { ProgressCircle }
