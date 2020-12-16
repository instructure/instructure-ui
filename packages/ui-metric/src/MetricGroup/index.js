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
import { Children, Component } from 'react'
import PropTypes from 'prop-types'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { withStyle, jsx } from '@instructure/emotion'
import { testable } from '@instructure/ui-testable'
import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { Metric } from '../Metric'

import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle)
@testable()
class MetricGroup extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type `Metric`
     */
    children: ChildrenPropTypes.oneOf([Metric])
  }

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      return safeCloneElement(child, {
        isGroupChild: true
      })
    })
  }

  render() {
    return (
      <div
        {...passthroughProps(this.props)}
        css={this.props.styles.metricGroup}
        role="grid"
        aria-readonly="true"
      >
        {this.renderChildren()}
      </div>
    )
  }
}

export default MetricGroup
export { MetricGroup }
