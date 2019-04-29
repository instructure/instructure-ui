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

import View from '@instructure/ui-layout/lib/components/View'

import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Progress
---
**/
@themeable(theme, styles)
export default class ProgressBar extends Component {
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
    successColor: true,
    as: 'div',
    formatDisplayedValue: undefined,
    margin: undefined,
    elementRef: undefined
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles[this.props.variant]]: true,
      [styles.done]: this.props.successColor &&
        (this.props.valueNow / this.props.valueMax >= 1)
    }

    const {
      formatDisplayedValue,
      formatValueText,
      valueNow,
      valueMax,
      label
    } = this.props

    const valueText = formatValueText(valueNow, valueMax)
    const value = (typeof formatDisplayedValue === 'function') && formatDisplayedValue(valueNow, valueMax)

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, ProgressBar.propTypes, ['animateOnMount']),
      ProgressBar
    )
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        className={classnames(classes)}
        margin={this.props.margin}
        elementRef={this.props.elementRef}
      >
        <progress
          className={styles.bar}
          max={valueMax}
          value={valueNow}
          role="progressbar"
          aria-valuetext={valueText}
          aria-valuenow={valueNow}
          aria-valuemax={valueMax}
          aria-label={label}
        />
        { value &&
          <span className={styles.value} aria-hidden="true">
            {value}
          </span>
        }
      </View>
    )
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}
