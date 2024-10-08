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
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Cell } from '../Cell'
import { RowHeader } from '../RowHeader'

import type { TableRowProps } from './props'
import { allowedProps, propTypes } from './props'
import type { RowHeaderChild, CellChild } from '../props'

/**
---
parent: Table
id: Table.Row
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Row extends Component<TableRowProps> {
  static readonly componentId = 'Table.Row'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  render() {
    const { children, styles, isStacked, headers } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Row.allowedProps), Row)}
        as={isStacked ? 'div' : 'tr'}
        css={styles?.row}
        role={isStacked ? 'row' : undefined}
      >
        {Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => {
            if (matchComponentTypes<RowHeaderChild>(child, [RowHeader])) {
              return safeCloneElement(child, {
                key: index,
                isStacked
              })
            }
            if (matchComponentTypes<CellChild>(child, [Cell])) {
              return safeCloneElement(child, {
                key: index,
                isStacked,
                header: headers && headers[index]
              })
            }

            return child
          })}
      </View>
    )
  }
}

export default Row
export { Row }
