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

import { Component, Children, isValidElement } from 'react'

import { safeCloneElement, omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyle } from '@instructure/emotion'

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
  // Reference to hidden aria-live region for announcing caption changes to screen readers
  _liveRegionRef: HTMLDivElement | null = null
  // Timeout for delayed announcement (workaround for Safari/VoiceOver caption update bug)
  _announcementTimeout?: ReturnType<typeof setTimeout>

  handleRef = (el: Element | null) => {
    this.ref = el
    this.props.elementRef?.(el)
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: TableProps) {
    this.props.makeStyles?.()

    // Announce caption changes for screen readers (especially VoiceOver)
    // Safari/VoiceOver has a known bug where dynamic <caption> updates aren't announced,
    // so we use an aria-live region as a workaround
    const prevSortInfo = this.getSortedHeaderInfo(prevProps)
    const currentSortInfo = this.getSortedHeaderInfo(this.props)

    // Only announce if sorting actually changed
    const sortingChanged =
      prevSortInfo?.header !== currentSortInfo?.header ||
      prevSortInfo?.direction !== currentSortInfo?.direction

    if (sortingChanged && currentSortInfo && this._liveRegionRef) {
      // Clear any pending announcement
      clearTimeout(this._announcementTimeout)
      // Clear the live region first (part of the clear-then-set pattern)
      this._liveRegionRef.textContent = ''

      // Wait 100ms before setting new content to ensure screen readers detect the change
      this._announcementTimeout = setTimeout(() => {
        if (this._liveRegionRef) {
          const currentCaption = this.getCaptionText(this.props)
          // Append non-breaking space (\u00A0) to force Safari/VoiceOver to treat
          // repeated captions as different announcements
          this._liveRegionRef.textContent = currentCaption + '\u00A0'
        }
      }, 100)
    }
  }

  componentWillUnmount() {
    // Clean up pending announcement timeout
    clearTimeout(this._announcementTimeout)
  }

  getHeaders() {
    const [headChild] = Children.toArray(this.props.children)
    if (!headChild || !isValidElement(headChild)) return undefined
    const [firstRow] = Children.toArray(headChild.props.children)
    if (!firstRow || !isValidElement(firstRow)) return undefined
    return Children.map(firstRow.props.children, (colHeader) => {
      if (!isValidElement<{ children?: any }>(colHeader)) return undefined
      return colHeader.props.children
    })
  }

  getSortedHeaderInfo(props: TableProps) {
    const [headChild] = Children.toArray(props.children)
    const [firstRow] = Children.toArray(
      isValidElement(headChild) ? headChild.props.children : []
    )
    const colHeaders = Children.toArray(
      isValidElement(firstRow) ? firstRow.props.children : []
    )

    // Find the column with an active sort direction
    for (const colHeader of colHeaders) {
      if (
        isValidElement(colHeader) &&
        colHeader.props.sortDirection &&
        colHeader.props.sortDirection !== 'none'
      ) {
        // Extract header text (may be nested in child components)
        const headerText =
          typeof colHeader.props.children === 'string'
            ? colHeader.props.children
            : colHeader.props.children?.props?.children ?? ''
        return { header: headerText, direction: colHeader.props.sortDirection }
      }
    }
    return null
  }

  getCaptionText(props: TableProps) {
    const sortInfo = this.getSortedHeaderInfo(props)
    const caption = props.caption as string

    if (!sortInfo) return caption

    const sortText = ` Sorted by ${sortInfo.header} (${sortInfo.direction})`
    return caption ? caption + sortText : sortText.trim()
  }

  render() {
    const { margin, layout, caption, children, hover, styles } = this.props
    const isStacked = layout === 'stacked'
    const captionText = this.getCaptionText(this.props)

    return (
      <TableContext.Provider
        value={{
          isStacked,
          hover: hover!,
          headers: isStacked ? this.getHeaders() : undefined
        }}
      >
        {/* ARIA live region for dynamic sort announcements.
            MUST be outside <table> due to Safari/VoiceOver bug.
            Empty on page load, populated only when sorting changes. */}
        <div
          ref={(el) => {
            this._liveRegionRef = el
          }}
          aria-live="polite"
          aria-atomic="true"
          role="status"
          css={styles?.liveRegion}
        />

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
          aria-label={captionText}
        >
          {/* Caption for visual display and semantic HTML */}
          {!isStacked && caption && (
            <caption>
              <ScreenReaderContent>{captionText}</ScreenReaderContent>
            </caption>
          )}
          {Children.map(children, (child) =>
            isValidElement(child)
              ? safeCloneElement(child, { key: child.props.name })
              : child
          )}
        </View>
      </TableContext.Provider>
    )
  }
}

export default Table
export { Table }
