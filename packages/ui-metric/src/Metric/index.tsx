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

import { Component } from 'react'

import { testable } from '@instructure/ui-testable'
import { withStyle } from '@instructure/emotion'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MetricProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Metric extends Component<MetricProps> {
  static readonly componentId = 'Metric'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    textAlign: 'center',
    isGroupChild: false
  }

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

  render() {
    const { textAlign, renderLabel, renderValue, isGroupChild, ...rest } =
      this.props

    return (
      <div
        {...passthroughProps(rest)}
        role={isGroupChild ? 'row' : undefined}
        css={this.props.styles?.metric}
        ref={this.handleRef}
      >
        <div
          role={isGroupChild ? 'rowheader' : undefined}
          css={this.props.styles?.label}
        >
          {callRenderProp(renderLabel)}
        </div>
        <div
          role={isGroupChild ? 'gridcell' : undefined}
          css={this.props.styles?.value}
        >
          {callRenderProp(renderValue)}
        </div>
      </div>
    )
  }
}

export default Metric
export { Metric }
