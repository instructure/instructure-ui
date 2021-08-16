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
import { Component, ReactNode } from 'react'
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { OtherHTMLAttributes } from '@instructure/ui-prop-types'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  textAlign?: 'start' | 'center' | 'end'
  renderLabel?: ((props?: any) => ReactNode) | ReactNode
  renderValue?: ((props?: any) => ReactNode) | ReactNode
  /**
   * Set to true when a child of MetricGroup so the appropriate
   * aria labels get set
   */
  isGroupChild?: boolean
}

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Metric extends Component<Props & OtherHTMLAttributes<Props>> {
  static readonly componentId = 'Metric'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    renderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    isGroupChild: PropTypes.bool
  }

  static defaultProps = {
    textAlign: 'center',
    isGroupChild: false
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const {
      textAlign,
      renderLabel,
      renderValue,
      isGroupChild,
      ...rest
    } = this.props

    return (
      <div
        {...passthroughProps(rest)}
        role={isGroupChild ? 'row' : undefined}
        css={this.props.styles.metric}
      >
        <div
          role={isGroupChild ? 'rowheader' : undefined}
          css={this.props.styles.label}
        >
          {callRenderProp(renderLabel)}
        </div>
        <div
          role={isGroupChild ? 'gridcell' : undefined}
          css={this.props.styles.value}
        >
          {callRenderProp(renderValue)}
        </div>
      </div>
    )
  }
}

export default Metric
export { Metric }
