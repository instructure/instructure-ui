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
import { Component, Children, isValidElement } from 'react'

import { safeCloneElement, omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Head } from './Head'
import { Body } from './Body'
import { Row } from './Row'
import { ColHeader } from './ColHeader'
import { RowHeader } from './RowHeader'
import { Cell } from './Cell'

import type { TableProps } from './props'

import { allowedProps, propTypes } from './props'
import TableContext from './TableContext'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Table extends Component<TableProps> {
  static readonly componentId = 'Table'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    hover: false,
    layout: 'auto'
  }

  static Head = Head
  static Body = Body
  static Row = Row
  static ColHeader = ColHeader
  static RowHeader = RowHeader
  static Cell = Cell

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  getHeaders() {
    const { children } = this.props
    const [headChild] = Children.toArray(children)
    if (!headChild || !isValidElement(headChild)) return undefined
    const [firstRow] = Children.toArray(headChild.props.children)
    if (!firstRow || !isValidElement(firstRow)) return undefined
    return Children.map(firstRow.props.children, (colHeader) => {
      if (!isValidElement<{ children?: any }>(colHeader)) return undefined
      return colHeader.props.children
    })
  }

  render() {
    const { margin, layout, caption, children, hover, styles } = this.props
    const isStacked = layout === 'stacked'
    const headers = isStacked ? this.getHeaders() : undefined

    return (
      <TableContext.Provider
        value={{
          isStacked: isStacked,
          hover: hover!,
          headers: headers
        }}
      >
        <View
          {...View.omitViewProps(
            omitProps(this.props, Table.allowedProps),
            Table
          )}
          as={isStacked ? 'div' : 'table'}
          margin={margin}
          elementRef={this.handleRef}
          css={styles?.table}
          role={isStacked ? 'table' : undefined}
          aria-label={isStacked ? (caption as string) : undefined}
        >
          {!isStacked && (
            <caption>
              <ScreenReaderContent>{caption}</ScreenReaderContent>
            </caption>
          )}
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return safeCloneElement(child, { key: child.props.name })
            }
            return child
          })}
        </View>
      </TableContext.Provider>
    )
  }
}

export default Table
export { Table }
