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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { testable } from '@instructure/ui-testable'
import { themeable } from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DeprecatedMetricsList
id: DeprecatedMetricsList.Item
---
**/
@testable()
@themeable(theme, styles)
class MetricsListItem extends Component {
  static propTypes = {
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    label: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired
  }
  static defaultProps = {
    textAlign: 'center'
  }

  render() {
    const {
      textAlign
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[textAlign]]: true
    }

    return (
      <div
        {...omitProps(this.props, MetricsListItem.propTypes)}
        role="row"
        className={classnames(classes)}
      >
        <div role="rowheader" className={styles.label}>
          {this.props.label}
        </div>
        <div role="gridcell" className={styles.value}>
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default MetricsListItem
export { MetricsListItem }
