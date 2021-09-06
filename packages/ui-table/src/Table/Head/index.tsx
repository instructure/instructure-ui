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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconCheckLine } from '@instructure/ui-icons'
import { warn } from '@instructure/console'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Row } from '../Row'
import { ColHeader } from '../ColHeader'
import type { TableHeadProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Table
id: Table.Head
---
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
    const [row] = Children.toArray(this.props.children)
    let sortable = false

    if (row) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
      Children.forEach(row.props.children, (colHeader) => {
        if (matchComponentTypes(colHeader, [ColHeader])) {
          if (colHeader.props.onRequestSort) sortable = true
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

  renderSelect() {
    const { children, renderSortLabel } = this.props
    const [row] = Children.toArray(children)

    if (!matchComponentTypes(row, [Row])) {
      return null
    }
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'options' implicitly has type 'any[]' in ... Remove this comment to see the full error message
    const options = []
    const clickHandlers = {}
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'selectedOption' implicitly has type 'any... Remove this comment to see the full error message
    let selectedOption = null
    let count = 0

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
    Children.forEach(row.props.children, (colHeader) => {
      count += 1
      if (matchComponentTypes(colHeader, [ColHeader])) {
        const {
          id,
          stackedSortByLabel,
          sortDirection,
          onRequestSort
        } = colHeader.props

        const label = stackedSortByLabel || id

        if (onRequestSort) {
          options.push({ id, label })
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleSelect = (event, { value }) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      clickHandlers[value](event, { id: value })
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
              // @ts-expect-error FIXME: Type 'null' is not assignable to type 'string | number | undefined'.ts(2322)
              value={selectedOption}
              onChange={handleSelect}
            >
              {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'options' implicitly has an 'any[]' type. */}
              {options.map(({ id, label }) => (
                <SimpleSelect.Option
                  id={id}
                  key={id}
                  value={id}
                  renderBeforeLabel={
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'selectedOption' implicitly has an 'any' ... Remove this comment to see the full error message
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
      <thead {...omitProps(this.props, Head.propTypes)} css={styles?.head}>
        {Children.map(children, (child) =>
          matchComponentTypes(child, [Row]) ? child : null
        )}
      </thead>
    )
  }
}

export default Head
export { Head }
