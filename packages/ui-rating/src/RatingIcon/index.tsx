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

import { IconStarSolid, IconStarLightSolid } from '@instructure/ui-icons'
import {
  requestAnimationFrame,
  RequestAnimationFrameType
} from '@instructure/ui-dom-utils'
import { Transition } from '@instructure/ui-motion'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  animationDelay?: number
  animateFill?: boolean
  filled?: boolean
  size?: 'small' | 'medium' | 'large'
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
parent: Rating
id: Rating.Icon
---
**/
@withStyle(generateStyle, generateComponentTheme, ['size'])
class RatingIcon extends Component<Props> {
  static componentId = 'Rating.Icon'

  static propTypes = {
    animationDelay: PropTypes.number,
    animateFill: PropTypes.bool,
    filled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    animationDelay: 200,
    animateFill: false,
    filled: false,
    size: 'medium'
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    this.state = {
      filled: props.filled && !props.animateFill
    }
  }

  _timeouts = []
  _animation: RequestAnimationFrameType | undefined

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ filled: this.makeStyleProps().filled })
    if (this.props.animateFill) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      this._timeouts.push(setTimeout(this.fill, this.props.animationDelay))
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.animateFill &&
      this.props.filled &&
      this.props.filled !== prevProps.filled
    ) {
      this.fill()
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ filled: this.makeStyleProps().filled })
  }

  componentWillUnmount() {
    this._animation && this._animation.cancel()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  makeStyleProps = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filled' does not exist on type 'Readonly... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filled' does not exist on type 'Readonly... Remove this comment to see the full error message
    const Icon = this.state.filled ? IconStarSolid : IconStarLightSolid

    return (
      <span css={this.props.styles.ratingIcon}>
        <span>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'filled' does not exist on type 'Readonly... Remove this comment to see the full error message */}
          {this.state.filled && animateFill ? (
            <Transition in transitionOnMount type="scale">
              <Icon css={this.props.styles.icon} />
            </Transition>
          ) : (
            <Icon css={this.props.styles.icon} />
          )}
        </span>
      </span>
    )
  }
}

export default RatingIcon
export { RatingIcon }
