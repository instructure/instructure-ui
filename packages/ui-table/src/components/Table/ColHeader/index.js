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
import { IconMiniArrowUpLine, IconMiniArrowDownLine } from '@instructure/ui-icons'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TableControlled
---
**/
@themeable(theme, styles)
class ColHeader extends Component {
  static propTypes = {
    /**
     * A unique id for this column
     */
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    colAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
     * The string of sorting direction
     */
    sortDirection: PropTypes.oneOf(['none', 'ascending', 'descending']),
    /**
     * Callback fired when column header is clicked. Parameters: `(event, { id })`
     */
    onRequestSort: PropTypes.func,
  }

  static defaultProps = {
    sortDirection: 'none',
  }

  handleClick = (event) => {
    const { id, onRequestSort } = this.props

    onRequestSort(event, {
      id,
    })
  }

  renderSortArrow () {
    const { sortDirection, onRequestSort } = this.props

    if (sortDirection === 'ascending') {
      return <IconMiniArrowUpLine />
    }
    if (sortDirection === 'descending') {
      return <IconMiniArrowDownLine />
    }
    if (onRequestSort) {
      // Reserve a space for arrow to keep column width consistent
      return <IconMiniArrowUpLine style={{color: 'transparent'}} />
    }
    return null
  }

  render () {
    const { onRequestSort, size, colAlign, children } = this.props

    return (
      <th
        {...omitProps(this.props, ColHeader.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles[size]]: !onRequestSort,
          [styles[`colAlign--${colAlign}`]]: colAlign,
        })}
        scope="col"
      >
        {onRequestSort && (
          <button
            onClick={this.handleClick}
            className={classnames({
              [styles.button]: true,
              [styles[size]]: true,
              [styles[`colAlign--${colAlign}`]]: colAlign,
            })}
          >
            {children}
            {this.renderSortArrow()}
          </button>
        )}
        {!onRequestSort && children}
        {!onRequestSort && this.renderSortArrow()}
      </th>
    )
  }
}

export default ColHeader
