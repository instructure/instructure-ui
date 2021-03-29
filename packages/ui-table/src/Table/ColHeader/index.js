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

import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import {
  IconMiniArrowUpLine,
  IconMiniArrowDownLine
} from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
parent: Table
id: Table.ColHeader
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ColHeader extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
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

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
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
      children,
      sortDirection,
      scope,
      styles
    } = this.props

    return (
      <th
        {...omitProps(this.props, ColHeader.propTypes)}
        css={styles.colHeader}
        style={{
          width
        }}
        scope={scope}
        aria-sort={sortDirection}
      >
        {onRequestSort && (
          <button onClick={this.handleClick} css={styles.button}>
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
