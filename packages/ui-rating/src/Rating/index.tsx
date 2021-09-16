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
**/
@withStyle(generateStyle)
@testable()
class Rating extends Component<RatingProps> {
  static readonly componentId = 'Rating'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    animateFill: false,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filled' implicitly has an 'any' type.
    formatValueText: (filled, iconCount) => `${filled} / ${iconCount}`,
    iconCount: 3,
    size: 'medium',
    valueNow: 0
  }

  static Icon = RatingIcon

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get filled() {
    const { valueNow, iconCount, valueMax } = this.props

    // prevent divide by zero errors
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const max = valueMax > 0 ? valueMax : iconCount

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const filledIcons = Math.round((valueNow * iconCount) / max)

    // Handle edge case where valueNow is greater than valueMax
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (filledIcons > iconCount) {
      return iconCount
    } else {
      return filledIcons
    }
  }

  get empty() {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    return this.props.iconCount - this.filled
  }

  render() {
    const {
      iconCount,
      animateFill,
      size,
      margin,
      label,
      formatValueText
    } = this.props

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    const valueText = label + ' ' + formatValueText(this.filled, iconCount)

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
      >
        <ScreenReaderContent>{valueText}</ScreenReaderContent>
        {/* @ts-expect-error ts-migrate(6133) FIXME: 'x' is declared but its value is never read. */}
        {[...Array(this.filled)].map((x, i) => (
          <RatingIcon
            key={i + 1}
            filled
            animateFill={animateFill}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number | null' is not assignable to type 'nu... Remove this comment to see the full error message
            animationDelay={animateFill ? (i + 1) * 200 : null}
            size={size}
          />
        ))}
        {/* @ts-expect-error ts-migrate(6133) FIXME: 'x' is declared but its value is never read. */}
        {[...Array(this.empty)].map((x, i) => (
          <RatingIcon key={i + 1} size={size} />
        ))}
      </View>
    )
  }
}

export default Rating
export { Rating }
