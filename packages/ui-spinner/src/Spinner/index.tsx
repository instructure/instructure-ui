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
import { callRenderProp, omitProps } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { logError as error } from '@instructure/console'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { SpinnerProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Spinner extends Component<SpinnerProps> {
  static readonly componentId = 'Spinner'
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    as: 'div',
    size: 'medium',
    variant: 'default'
  }

  ref: Element | null = null
  private readonly titleId?: string

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: SpinnerProps) {
    super(props)
    this.titleId = uid('Spinner')
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  radius() {
    switch (this.props.size) {
      case 'x-small':
        return '0.5em'
      case 'small':
        return '1em'
      case 'large':
        return '2.25em'
      default:
        return '1.75em'
    }
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Spinner.allowedProps),
      Spinner
    )

    const hasTitle = this.props.renderTitle
    error(
      !!hasTitle,
      '[Spinner] The renderTitle prop is necessary for screen reader support.'
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        elementRef={this.handleRef}
        css={this.props.styles?.spinner}
        margin={this.props.margin}
      >
        <svg
          css={this.props.styles?.circle}
          role="img"
          aria-labelledby={this.titleId}
          focusable="false"
        >
          <title id={this.titleId}>
            {callRenderProp(this.props.renderTitle)}
          </title>
          <g role="presentation">
            {this.props.variant !== 'inverse' && (
              <circle
                css={this.props.styles?.circleTrack}
                cx="50%"
                cy="50%"
                r={this.radius()}
              />
            )}
            <circle
              css={this.props.styles?.circleSpin}
              cx="50%"
              cy="50%"
              r={this.radius()}
            />
          </g>
        </svg>
      </View>
    )
  }
}

export default Spinner
export { Spinner }
