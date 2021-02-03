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
import React, { Children, Component } from 'react'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { MetricGroup } from '../MetricGroup'
import { Metric } from '../Metric'

/**
---
category: components
---
**/
@deprecated('8.0.0', null, 'Use MetricGroup instead.')
@testable()
class MetricsList extends Component {
  static propTypes = {
    /**
     * children of type `Metric`
     */
    children: ChildrenPropTypes.oneOf([Metric])
  }

  static defaultProps = {
    children: null
  }

  static Item = Metric

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!child) return
      const { label, value, ...rest } = child.props
      return (
        <Metric
          {...rest}
          renderLabel={label}
          renderValue={value}
          isGroupChild
        />
      )
    })
  }

  render() {
    return (
      <MetricGroup {...passthroughProps(this.props)}>
        {this.renderChildren()}
      </MetricGroup>
    )
  }
}

export default MetricsList
export { MetricsList }
