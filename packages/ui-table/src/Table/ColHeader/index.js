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

import { themeable } from '@instructure/ui-themeable'
import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import {
  IconMiniArrowUpLine,
  IconMiniArrowDownLine
} from '@instructure/ui-icons'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Table
id: Table.ColHeader
---
**/
@themeable(theme, styles)
class ColHeader extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * A unique id for this column. When sortable table is in stacked layout,
     * id is also used as option in combobox.
     */
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Control the width of column.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Control the text alignment in column header
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
     * The string of sorting direction
     */
    sortDirection: PropTypes.oneOf(['none', 'ascending', 'descending']),
    /**
     * Callback fired when column header is clicked. Parameters: `(event, { id })`
     */
    onRequestSort: PropTypes.func,
    /**
     * The column header scope attribute. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
     */
    scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup', 'auto'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    textAlign: 'start',
    sortDirection: 'none',
    children: null,
    scope: 'col'
  }

  handleClick = (event) => {
    const { id, onRequestSort } = this.props

    onRequestSort(event, {
      id
    })
  }

  renderSortArrow() {
    const { sortDirection, onRequestSort } = this.props

    if (sortDirection === 'ascending') {
      return <IconMiniArrowUpLine />
    }
    if (sortDirection === 'descending') {
      return <IconMiniArrowDownLine />
    }
    if (onRequestSort) {
      // Reserve a space for arrow to keep column width consistent
      return <IconMiniArrowUpLine style={{ color: 'transparent' }} />
    }
    return null
  }

  render() {
    const {
      onRequestSort,
      width,
      textAlign,
      children,
      sortDirection,
      scope
    } = this.props

    return (
      <th
        {...omitProps(this.props, ColHeader.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles.header]: !onRequestSort,
          [styles[`textAlign--${textAlign}`]]: true
        })}
        style={{
          width
        }}
        scope={scope}
        aria-sort={sortDirection}
      >
        {onRequestSort && (
          <button
            onClick={this.handleClick}
            className={classnames({
              [styles.header]: true,
              [styles.button]: true,
              [styles[`flexDirection--${textAlign}`]]: true
            })}
          >
            <div>
              {callRenderProp(children)}
              {this.renderSortArrow()}
            </div>
          </button>
        )}
        {!onRequestSort && children}
        {!onRequestSort && this.renderSortArrow()}
      </th>
    )
  }
}

export default ColHeader
export { ColHeader }
