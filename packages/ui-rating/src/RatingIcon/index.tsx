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

import { IconStarSolid, IconStarLightSolid } from '@instructure/ui-icons'
import { requestAnimationFrame } from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import { Transition } from '@instructure/ui-motion'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { RatingIconProps, RatingIconState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Rating
id: Rating.Icon
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class RatingIcon extends Component<RatingIconProps, RatingIconState> {
  static readonly componentId = 'Rating.Icon'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    animationDelay: 200,
    animateFill: false,
    filled: false,
    size: 'medium'
  }

  ref: HTMLSpanElement | null = null

  constructor(props: RatingIconProps) {
    super(props)

    this.state = {
      filled: props.filled! && !props.animateFill
    }
  }

  _timeouts: ReturnType<typeof setTimeout>[] = []
  _animation: RequestAnimationFrameType | undefined

  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
    if (this.props.animateFill) {
      this._timeouts.push(setTimeout(this.fill, this.props.animationDelay))
    }
  }

  componentDidUpdate(prevProps: RatingIconProps) {
    if (
      this.props.animateFill &&
      this.props.filled &&
      this.props.filled !== prevProps.filled
    ) {
      this.fill()
    }
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentWillUnmount() {
    this._animation && this._animation.cancel()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  makeStyleProps = () => {
    return { filled: this.state.filled }
  }

  fill = () => {
    this._animation = requestAnimationFrame(() => {
      this.setState({
        filled: true
      })
    })
  }

  render() {
    const { animateFill } = this.props
    const Icon = this.state.filled ? IconStarSolid : IconStarLightSolid

    return (
      <span
        css={this.props.styles?.ratingIcon}
        ref={(el) => {
          this.ref = el
        }}
      >
        <span>
          {this.state.filled && animateFill ? (
            <Transition in transitionOnMount type="scale">
              <Icon css={this.props.styles?.icon} />
            </Transition>
          ) : (
            <Icon css={this.props.styles?.icon} />
          )}
        </span>
      </span>
    )
  }
}

export default RatingIcon
export { RatingIcon }
