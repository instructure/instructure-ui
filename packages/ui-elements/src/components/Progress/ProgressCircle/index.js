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
import classnames from 'classnames'

import ScreenReaderContent from '@instructure/ui-a11y/lib/ScreenReaderContent'
import View from '@instructure/ui-layout/lib/components/View'

import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/ThemeablePropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Progress
---
**/
@themeable(theme, styles)
export default class ProgressCircle extends Component {
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
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func,
    as: PropTypes.elementType
  }

  static defaultProps = {
    formatValueText: (valueNow, valueMax) => `${valueNow} / ${valueMax}`,
    size: 'medium',
    valueMax: 100,
    valueNow: 0,
    variant: 'default',
    animateOnMount: false,
    successColor: true,
    as: 'div',
    formatDisplayedValue: undefined,
    margin: undefined,
    elementRef: undefined
  }

  constructor (props) {
    super()

    this.state = {
      animateOnMount: props.animateOnMount
    }
  }

  _timeouts = []

  componentWillMount () {
    if (this.state.animateOnMount) {
      this._timeouts.push(setTimeout(() => {
        this.setState({
          animateOnMount: false
        })
      }, 500))
    }
  }

  componentWillUnmount () {
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  circumference () {
    const camelSize = this.props.size === 'x-small' ? 'xSmall' : this.props.size
    // get the circumference of the meter circle
    return parseFloat(this.theme[`${camelSize}Circumference`])
  }

  radius () {
    const camelSize = this.props.size === 'x-small' ? 'xSmall' : this.props.size
    return this.theme[`${camelSize}Radius`]
  }

  dashOffset () {
    const {
      valueNow,
      valueMax
    } = this.props

    // send the stroke-dashoffset to the meter circle, checking
    // to make sure current value doesn't exceed max value
    if (valueNow < valueMax) {
      const circumference = this.circumference()
      // figure out how much offset to give the stroke to show the % complete
      return circumference - ((valueNow / valueMax) * circumference)
    } else {
      return 0
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true,
      [styles.animateOnMount]: this.state.animateOnMount,
      [styles.done]: this.props.successColor &&
        this.props.valueNow / this.props.valueMax >= 1
    }

    const {
      formatDisplayedValue,
      formatValueText,
      valueNow,
      valueMax,
      label
    } = this.props

    const valueText = formatValueText(valueNow, valueMax)

    // consolidating the label and aria-valuetext to put in aria-label because
    // NVDA does not read aria-valuetext: https://github.com/nvaccess/nvda/issues/913
    // But leaving aria-valuetext because JAWS ignores aria-label
    const labelAndValueText = `${label} ${valueText}`

    const value = (typeof formatDisplayedValue === 'function') && formatDisplayedValue(valueNow, valueMax)

    const style = this.state.animateOnMount ? null : {
      strokeDashoffset: `${this.dashOffset()}em`
    }

    const radius = this.radius()

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, ProgressCircle.propTypes, ['animateOnMount']),
      ProgressCircle
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        elementRef={this.props.elementRef}
        className={classnames(classes)}
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
        { value &&
          <span className={styles.center} aria-hidden="true">
            <span className={styles.value}>{value}</span>
          </span>
        }
        <svg
          className={styles.circle}
          role="presentation"
          focusable="false"
        >
          <circle
            className={styles.shadow}
            role="presentation"
            cx="50%"
            cy="50%"
            r={radius}
          />
          <circle
            className={styles.track}
            role="presentation"
            cx="50%"
            cy="50%"
            r={radius}
          />
          <circle
            className={styles.meter}
            role="presentation"
            style={style}
            cx="50%"
            cy="50%"
            r={radius}
          />
        </svg>
      </View>
    )
  }
}
