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
import PropTypes from 'prop-types'

import { ThemeablePropTypes } from '@instructure/ui-themeable'
import {
  matchComponentTypes,
  safeCloneElement,
  omitProps
} from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
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

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Table extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Provide a screen reader friendly description. Anything passed to this
     * prop will be wrapped by `<ScreenReaderContent>` when it is rendered.
     */
    caption: PropTypes.node.isRequired,
    /**
     * Build table via `Table.Head` and `Table.Body`
     */
    children: ChildrenPropTypes.oneOf([Head, Body]),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Provide a reference to the underlying html element
     */
    elementRef: PropTypes.func,
    /**
     * Highlight each row on hover
     */
    hover: PropTypes.bool,
    /**
     * `auto` lets the browser determine table column widths based on cell content,
     * while `fixed` forces columns of equal width. `stacked` renders table in one
     * column to be more readable on narrow screens
     */
    layout: PropTypes.oneOf(['auto', 'fixed', 'stacked'])
  }

  static defaultProps = {
    children: null,
    hover: false,
    layout: 'auto',
    margin: undefined,
    elementRef: undefined
  }

  static Head = Head
  static Body = Body
  static Row = Row
  static ColHeader = ColHeader
  static RowHeader = RowHeader
  static Cell = Cell

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  getHeaders() {
    const { children } = this.props
    const [head] = Children.toArray(children)

    if (matchComponentTypes(head, [Head])) {
      const [row] = Children.toArray(head.props.children)

      if (matchComponentTypes(row, [Row])) {
        return Children.map(row.props.children, (colHeader) => {
          return matchComponentTypes(colHeader, [ColHeader])
            ? colHeader.props.children
            : null
        })
      }
    }
    return null
  }

  render() {
    const {
      margin,
      elementRef,
      layout,
      caption,
      children,
      hover,
      styles
    } = this.props
    const isStacked = layout === 'stacked'
    const headers = isStacked ? this.getHeaders() : null

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Table.propTypes), Table)}
        as={isStacked ? 'div' : 'table'}
        margin={margin}
        elementRef={elementRef}
        css={styles.table}
        role={isStacked ? 'table' : null}
        aria-label={isStacked ? caption : null}
      >
        {!isStacked && (
          <caption>
            <ScreenReaderContent>{caption}</ScreenReaderContent>
          </caption>
        )}
        {Children.map(children, (child) => {
          if (matchComponentTypes(child, [Head])) {
            return safeCloneElement(child, {
              key: child.props.name,
              isStacked
            })
          }
          if (matchComponentTypes(child, [Body])) {
            return safeCloneElement(child, {
              key: child.props.name,
              isStacked,
              hover,
              headers
            })
          }
          return null
        })}
      </View>
    )
  }
}

export default Table
export { Table }
