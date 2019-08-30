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

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedTable
---
**/

@testable()

@themeable(theme, styles)
class Table extends Component {
  static propTypes = {
    /**
    * Set the table's caption element (its label)
    */
    caption: PropTypes.node.isRequired,
    /**
    * Build the table markup via the children prop
    */
    children: PropTypes.node,
    /**
    * Highlight each row on hover
    */
    hover: PropTypes.bool,
    /**
    * Controls the padding and font-size of table cells
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Add a light background color to alternate rows or columns
    */
    striped: PropTypes.oneOf(['columns', 'rows']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func,
    /**
    * `auto` lets the browser determine table column widths based on cell content,
    * while `fixed` forces columns of equal width.
    */
    layout: PropTypes.oneOf(['auto', 'fixed'])
  }

  static defaultProps = {
    children: null,
    striped: undefined,
    margin: undefined,
    elementRef: undefined,
    hover: false,
    size: 'medium',
    layout: 'auto'
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles.fixedLayout]: this.props.layout === 'fixed',
      [styles[this.props.size]]: true,
      [styles.rowStriped]: this.props.striped === 'rows',
      [styles.colStriped]: this.props.striped === 'columns',
      [styles.hover]: this.props.hover
    }

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Table.propTypes),
      Table
    )

    return (
      <View
        {...passthroughProps}
        elementRef={this.props.elementRef}
        as="table"
        className={classnames(classes)}
        margin={this.props.margin}
      >
        <caption>{this.props.caption}</caption>
        {this.props.children}
      </View>
    )
  }
}

export default Table
export { Table }
