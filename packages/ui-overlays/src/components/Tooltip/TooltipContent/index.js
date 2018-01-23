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
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Tooltip
---
**/
@themeable(theme, styles)
export default class TooltipContent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node
  }

  static defaultProps = {
    size: 'small'
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: this.props.size
    }
    return (
      <span id={this.props.id} className={classnames(classes)} role="tooltip">
        {this.props.children}
      </span>
    )
  }
}
