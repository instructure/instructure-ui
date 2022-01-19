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
import { Component, Children } from 'react'

import {
  omitProps,
  matchComponentTypes,
  callRenderProp
} from '@instructure/ui-react-utils'
import { SimpleSelect } from '@instructure/ui-simple-select'
import type { SimpleSelectProps } from '@instructure/ui-simple-select'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconCheckLine } from '@instructure/ui-icons'
import { warn } from '@instructure/console'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Row } from '../Row'
import { ColHeader } from '../ColHeader'
import type { TableColHeaderProps } from '../ColHeader/props'
import type { TableHeadProps } from './props'
import type { ColHeaderChild, RowChild } from '../props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Table
id: Table.Head
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class Head extends Component<TableHeadProps> {
  static readonly componentId = 'Table.Head'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null
  }

  get isSortable() {
    const [row] = Children.toArray(this.props.children) as RowChild[]
    let sortable = false

    if (row) {
      Children.forEach(
        row.props.children as ColHeaderChild[],
        (colHeader) => {
          if (matchComponentTypes<ColHeaderChild>(colHeader, [ColHeader])) {
            if (colHeader.props.onRequestSort) sortable = true
          }
        }
      )
    }

    return sortable
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    if (this.isSortable && typeof this.props.renderSortLabel === 'undefined') {
      warn(
        false,
        '[Table.Head] The `renderSortLabel` prop should be provided when Table is sortable.'
      )
    }
    this.props.makeStyles?.()
  }

  renderSelect() {
    const { children, renderSortLabel } = this.props
    const [row] = Children.toArray(children) as RowChild[]

    if (!matchComponentTypes<RowChild>(row, [Row])) {
      return null
    }
    const options: {
      id: TableColHeaderProps['id']
      label:
        | TableColHeaderProps['stackedSortByLabel']
        | TableColHeaderProps['id']
    }[] = []
    const clickHandlers: Record<
      TableColHeaderProps['id'],
      TableColHeaderProps['onRequestSort']
    > = {}
    let selectedOption: TableColHeaderProps['id'] | undefined
    let count = 0

    Children.forEach(row.props.children, (colHeader) => {
      count += 1
      if (matchComponentTypes<ColHeaderChild>(colHeader, [ColHeader])) {
        const { id, stackedSortByLabel, sortDirection, onRequestSort } = (
          colHeader
        ).props

        const label = stackedSortByLabel || id

        if (onRequestSort) {
          options.push({ id, label })
          clickHandlers[id] = onRequestSort
          if (sortDirection !== 'none') {
            selectedOption = id
          }
        }
      }
    })
    if (!options.length) {
      return null
    }
    const handleSelect: SimpleSelectProps['onChange'] = (event, { value }) => {
      if (value && typeof clickHandlers[value] === 'function') {
        clickHandlers[value]!(event, { id: `${value}` })
      }
    }
    return (
      <div role="rowgroup">
        <div role="row">
          <div role="cell" aria-colspan={count}>
            <SimpleSelect
              renderLabel={
                renderSortLabel ? (
                  callRenderProp(renderSortLabel)
                ) : (
                  <ScreenReaderContent></ScreenReaderContent>
                )
              }
              renderBeforeInput={selectedOption && IconCheckLine}
              value={selectedOption}
              onChange={handleSelect}
            >
              {options.map(({ id, label }) => (
                <SimpleSelect.Option
                  id={id}
                  key={id}
                  value={id}
                  renderBeforeLabel={
                    id === selectedOption
                      ? IconCheckLine
                      : () => <IconCheckLine style={{ color: 'transparent' }} />
                  }
                >
                  {label}
                </SimpleSelect.Option>
              ))}
            </SimpleSelect>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { children, isStacked, styles } = this.props

    return isStacked ? (
      this.renderSelect()
    ) : (
      <thead {...omitProps(this.props, Head.allowedProps)} css={styles?.head}>
        {Children.map(children, (child) =>
          matchComponentTypes<RowChild>(child, [Row]) ? child : null
        )}
      </thead>
    )
  }
}

export default Head
export { Head }
