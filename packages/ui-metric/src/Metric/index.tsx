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

import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  textAlign?: 'start' | 'center' | 'end'
  renderLabel?: ((...args: any[]) => any) | React.ReactNode
  renderValue?: ((...args: any[]) => any) | React.ReactNode
  isGroupChild?: boolean
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Metric extends Component<Props> {
  static readonly componentId = 'Metric'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    renderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Set to true when a child of MetricGroup so the appropriate
     * aria labels get set
     */
    isGroupChild: PropTypes.bool
  }

  static defaultProps = {
    textAlign: 'center',
    renderLabel: undefined,
    renderValue: undefined,
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        role={isGroupChild === true ? 'row' : null}
        css={this.props.styles.metric}
      >
        <div
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
          role={isGroupChild === true ? 'rowheader' : null}
          css={this.props.styles.label}
        >
          {callRenderProp(renderLabel)}
        </div>
        <div
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
          role={isGroupChild === true ? 'gridcell' : null}
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
