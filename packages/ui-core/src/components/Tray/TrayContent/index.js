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
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Tray
---
**/
@themeable(theme, styles)
class TrayContent extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<TrayContent />`
     */
    children: PropTypes.node,

    /**
    * Placment to determine where the `<Tray />` should display in the viewport
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

    /*
     * The size of the `<Tray />`
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),

    /**
     *
     * Should the `<Tray />` have a box shadow
     */
    shadow: PropTypes.bool,

    /**
     *
     * Should the `<Tray />` have a border
     */
    border: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    placement: 'start',
    size: 'small',
    shadow: true,
    border: false
  }

  render () {
    return (
      <span
        {...omitProps(this.props, TrayContent.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles.border]: this.props.border,
          [styles.shadow]: this.props.shadow,
          [styles[this.props.size]]: true,
          [styles[`placement--${this.props.placement}`]]: true,
          [this.props.className]: this.props.className // eslint-disable-line react/prop-types
        })}
      >
        {this.props.children}
      </span>
    )
  }
}

export default TrayContent
