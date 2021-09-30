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
import { Children, Component, ReactElement } from 'react'

import { withStyle, jsx } from '@instructure/emotion'
import { testable } from '@instructure/ui-testable'
import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { OtherHTMLAttributes } from '@instructure/shared-types'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MetricGroupProps } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MetricGroup extends Component<
  MetricGroupProps & OtherHTMLAttributes<MetricGroupProps>
> {
  static readonly componentId = 'MetricGroup'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child as ReactElement, {
        isGroupChild: true
      })
    })
  }

  render() {
    return (
      <div
        {...passthroughProps(this.props)}
        css={this.props.styles?.metricGroup}
        role="grid"
        aria-readonly="true"
        ref={this.handleRef}
      >
        {this.renderChildren()}
      </div>
    )
  }
}

export default MetricGroup
export { MetricGroup }
