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

import { Component, Children, ContextType } from 'react'

import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import { SimpleSelect } from '@instructure/ui-simple-select'
import type { SimpleSelectProps } from '@instructure/ui-simple-select'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconCheckLine } from '@instructure/ui-icons'
import { warn } from '@instructure/console'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { TableColHeaderProps } from '../ColHeader/props'
import type { TableHeadProps } from './props'
import type { RowChild } from '../props'
import { allowedProps, propTypes } from './props'
import TableContext from '../TableContext'

/**
---
parent: Table
id: Table.Head
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Head extends Component<TableHeadProps> {
  static readonly componentId = 'Table.Head'
  static contextType = TableContext
  declare context: ContextType<typeof TableContext>
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    children: null
  }

  /**
   * Returns `true` if the first child's children have a `onRequestSort` prop
   */
  get isSortable() {
    const [firstRow] = Children.toArray(this.props.children) as RowChild[]
    let sortable = false
    if (firstRow && firstRow.props && firstRow.props.children) {
      Children.forEach(firstRow.props.children, (grandchild) => {
        if (grandchild?.props?.onRequestSort) {
          sortable = true
          return
        }
      })
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

  /**
   * This `Select` is used in `stacked` layout. It's populated by iterating
   * through the first child's children (by default `ColHeader`) and reading
   * there the `id`, `stackedSortByLabel`, `sortDirection`, `onRequestSort` props
   */
  renderSelect() {
    const { children, renderSortLabel } = this.props
    const [firstRow] = Children.toArray(children) as RowChild[]

    if (!firstRow?.props?.children) {
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
    Children.forEach(firstRow.props.children, (grandchild) => {
      count += 1
      if (!grandchild.props) return
      const { id, stackedSortByLabel, sortDirection, onRequestSort } =
        grandchild.props
      if (id && onRequestSort) {
        const label = stackedSortByLabel || id
        options.push({ id, label })
        clickHandlers[id] = onRequestSort
        if (sortDirection !== 'none') {
          selectedOption = id
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
    const { children, styles } = this.props
    return this.context.isStacked ? (
      this.renderSelect()
    ) : (
      // TODO remove 'hover' exclude in v11, its passed down for compatibility with custom components
      <thead
        {...omitProps(this.props, Head.allowedProps, ['hover'])}
        css={styles?.head}
      >
        {children}
      </thead>
    )
  }
}

export default Head
export { Head }
