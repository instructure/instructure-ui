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

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import testable from '@instructure/ui-testable'

import RatingIcon from './RatingIcon'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class Rating extends Component {
  static propTypes = {
    /**
    * A label is required for accessibility
    */
    label: PropTypes.string.isRequired,
    /**
    * A function that returns the current value formatted for screen readers
    */
    formatValueText: PropTypes.func,
    /**
    * Choose from a 0-3 or 0-5 rating system
    */
    iconCount: PropTypes.oneOf([3, 5]),
    /**
    * Choose from different rating icon sizes
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * The maximum rating (defaults to iconCount)
    */
    valueMax: PropTypes.number,
    /**
    * The current rating
    */
    valueNow: PropTypes.number,
    /**
    * Set to make the icons animate when they become filled
    */
    animateFill: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    animateFill: false,
    formatValueText: (filled, iconCount) => `${filled} / ${iconCount}`,
    iconCount: 3,
    size: 'medium',
    valueNow: 0
  }

  get filled () {
    const {
      valueNow,
      iconCount,
      valueMax
    } = this.props

    // prevent divide by zero errors
    const max = (valueMax > 0) ? valueMax : iconCount

    const filledIcons = Math.round((valueNow * iconCount) / max)

    // Handle edge case where valueNow is greater than valueMax
    if (filledIcons > iconCount) {
      return iconCount
    } else {
      return filledIcons
    }
  }

  get empty () {
    return this.props.iconCount - this.filled
  }

  render () {
    const {
      iconCount,
      animateFill,
      size,
      margin,
      formatValueText
    } = this.props

    const classes = {
      [styles.root]: true
    }

    const valueText = formatValueText(this.filled, iconCount)

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Rating.propTypes),
      Rating
    )

    return (
      <View
        {...passthroughProps}
        className={classnames(classes)}
        margin={margin}
        role="slider"
        aria-valuetext={valueText}
        aria-valuenow={this.filled}
        aria-valuemax={this.props.iconCount}
        aria-valuemin={0}
        aria-label={this.props.label}
        aria-readonly="true"
        display="inline-block"
      >
        {
          [...Array(this.filled)].map((x, i) => (
            <RatingIcon
              key={i + 1}
              filled
              animateFill={animateFill}
              animationDelay={(animateFill) ? (i + 1) * 200 : null}
              size={size}
            />
          ))
        }
        {
          [...Array(this.empty)].map((x, i) => (
            <RatingIcon
              key={i + 1}
              size={size}
            />
          ))
        }
      </View>
    )
  }
}

export default Rating
