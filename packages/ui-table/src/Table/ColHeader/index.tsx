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
import React, { Component } from 'react'

import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import {
  IconMiniArrowUpLine,
  IconMiniArrowDownLine,
  IconMiniArrowDoubleLine
} from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TableColHeaderProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Table
id: Table.ColHeader
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class ColHeader extends Component<TableColHeaderProps> {
  static readonly componentId = 'Table.ColHeader'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    textAlign: 'start',
    sortDirection: 'none',
    children: null,
    scope: 'col'
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleClick = (event: React.SyntheticEvent) => {
    const { id, onRequestSort } = this.props

    onRequestSort && onRequestSort(event, { id })
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
      return <IconMiniArrowDoubleLine css={{ opacity: '30%' }} />
    }
    return null
  }

  render() {
    const { onRequestSort, width, children, sortDirection, scope, styles } =
      this.props

    return (
      <th
        {...omitProps(this.props, ColHeader.allowedProps)}
        css={styles?.colHeader}
        style={{
          width
        }}
        scope={scope}
        aria-sort={sortDirection}
      >
        {onRequestSort && (
          <button onClick={this.handleClick} css={styles?.button}>
            <div css={styles?.buttonContent}>
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
