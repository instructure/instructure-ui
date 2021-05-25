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

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  id: string
  stackedSortByLabel: string
  width?: string | number
  textAlign?: 'start' | 'center' | 'end'
  sortDirection?: 'none' | 'ascending' | 'descending'
  onRequestSort?: (...args: any[]) => any
  scope?: 'row' | 'col' | 'rowgroup' | 'colgroup' | 'auto'
}

/**
---
parent: Table
id: Table.ColHeader
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ColHeader extends Component<Props> {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * A unique id for this column. The `id` is also used as option in combobox,
     * when sortable table is in stacked layout,
     * and no `stackedSortByLabel` is provided.
     */
    id: PropTypes.string.isRequired,
    /**
     * A custom string to display as option text in the combobox (instead of
     * using the `id` prop), when sortable table is in stacked layout.
     */
    stackedSortByLabel: PropTypes.string,
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
    stackedSortByLabel: undefined,
    children: null,
    scope: 'col'
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { id, onRequestSort } = this.props

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
    const { onRequestSort, width, children, sortDirection, scope, styles } =
      this.props

    return (
      <th
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
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
