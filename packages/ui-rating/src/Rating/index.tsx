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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { RatingIcon } from '../RatingIcon'
import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import type { RatingProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, null)
@testable()
class Rating extends Component<RatingProps> {
  static readonly componentId = 'Rating'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    animateFill: false,
    formatValueText: (filled: string, iconCount: string) =>
      `${filled} / ${iconCount}`,
    iconCount: 3,
    size: 'medium',
    valueNow: 0
  }

  static Icon = RatingIcon

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get filled() {
    const { valueNow, iconCount, valueMax } = this.props

    // prevent divide by zero errors
    const max = !!valueMax && valueMax > 0 ? valueMax : iconCount

    const filledIcons = Math.round((valueNow! * iconCount!) / max!)

    // Handle edge case where valueNow is greater than valueMax
    if (filledIcons > iconCount!) {
      return iconCount
    } else {
      return filledIcons
    }
  }

  get empty() {
    return this.props.iconCount! - this.filled!
  }

  render() {
    const { iconCount, animateFill, size, margin, label, formatValueText } =
      this.props

    const valueText = label + ' ' + formatValueText?.(this.filled, iconCount)

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Rating.allowedProps),
      Rating
    )

    return (
      <View
        {...passthroughProps}
        css={this.props.styles?.rating}
        margin={margin}
        display="inline-block"
        elementRef={this.handleRef}
      >
        <ScreenReaderContent>{valueText}</ScreenReaderContent>
        {[...Array(this.filled)].map((_x, i) => (
          <RatingIcon
            key={i + 1}
            filled
            animateFill={animateFill}
            animationDelay={animateFill ? (i + 1) * 200 : undefined}
            size={size}
          />
        ))}
        {[...Array(this.empty)].map((_x, i) => (
          <RatingIcon key={i + 1} size={size} />
        ))}
      </View>
    )
  }
}

export default Rating
export { Rating }
