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

import { View } from '@instructure/ui-layout'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'

import { BreadcrumbLink } from './BreadcrumbLink'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@testable()
@themeable(theme, styles)
class Breadcrumb extends Component {
  static propTypes = {
    /**
    * children of type BreadcrumbLink
    */
    children: Children.oneOf([BreadcrumbLink]),
    /**
    * An accessible label for the navigation
    */
    label: PropTypes.string.isRequired,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    size: 'medium',
    children: null,
    margin: undefined
  }

  static Link = BreadcrumbLink

  renderChildren () {
    const numChildren = this.props.children ? this.props.children.length : 0
    const style = {
      maxWidth: `${Math.floor(100 / numChildren)}%`
    }
    return React.Children.map(this.props.children,
      (child, index) => {
        return (
          <li className={styles.crumb} style={style}>
            {child}
            {index < (numChildren - 1) && <IconArrowOpenEndSolid className={styles.separator} />}
          </li>
        )
      }
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true
    }

    return (
      <View
        role="navigation"
        as="div"
        margin={this.props.margin}
        aria-label={this.props.label}
      >
        <ol className={classnames(classes)}>
          {this.renderChildren()}
        </ol>
      </View>
    )
  }
}

export default Breadcrumb
export { Breadcrumb, BreadcrumbLink }
