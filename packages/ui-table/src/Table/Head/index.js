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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { themeable } from '@instructure/ui-themeable'
import {
  omitProps,
  matchComponentTypes,
  callRenderProp
} from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconCheckLine } from '@instructure/ui-icons'
import { warn } from '@instructure/console'

import styles from './styles.css'
import theme from './theme'

import { Row } from '../Row'
import { ColHeader } from '../ColHeader'

/**
---
parent: Table
id: Table.Head
---
**/
@themeable(theme, styles)
class Head extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * `Table.Row`
     */
    children: ChildrenPropTypes.oneOf([Row]),
    isStacked: PropTypes.bool,
    renderSortLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    children: null
  }

  get isSortable() {
    const [row] = Children.toArray(this.props.children)
    let sortable = false

    Children.forEach(row.props.children, (colHeader) => {
      if (matchComponentTypes(colHeader, [ColHeader])) {
        if (colHeader.props.onRequestSort) sortable = true
      }
    })

    return sortable
  }

  componentDidUpdate() {
    if (this.isSortable && typeof this.props.renderSortLabel === 'undefined') {
      warn(
        false,
        '[Table.Head] The `renderSortLabel` prop should be provided when Table is sortable.'
      )
    }
  }

  renderSelect() {
    const { children, renderSortLabel } = this.props
    const [row] = Children.toArray(children)

    if (!matchComponentTypes(row, [Row])) {
      return null
    }
    const options = []
    const clickHandlers = {}
    let selectedOption = null
    let count = 0

    Children.forEach(row.props.children, (colHeader) => {
      count += 1
      if (matchComponentTypes(colHeader, [ColHeader])) {
        const { id, sortDirection, onRequestSort } = colHeader.props

        if (onRequestSort) {
          options.push(id)
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
    const handleSelect = (event, { value }) => {
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
              value={selectedOption}
              onChange={handleSelect}
            >
              {options.map((option) => (
                <SimpleSelect.Option
                  id={option}
                  key={option}
                  value={option}
                  renderBeforeLabel={
                    option === selectedOption
                      ? IconCheckLine
                      : () => <IconCheckLine style={{ color: 'transparent' }} />
                  }
                >
                  {option}
                </SimpleSelect.Option>
              ))}
            </SimpleSelect>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { children, isStacked } = this.props

    return isStacked ? (
      this.renderSelect()
    ) : (
      <thead {...omitProps(this.props, Head.propTypes)} className={styles.root}>
        {Children.map(children, (child) =>
          matchComponentTypes(child, [Row]) ? child : null
        )}
      </thead>
    )
  }
}

export default Head
export { Head }
