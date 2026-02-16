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

import {
  Component,
  Children,
  ContextType,
  isValidElement,
  type ReactElement
} from 'react'

import { omitProps, safeCloneElement } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import type { TableRowProps } from './props'
import { allowedProps } from './props'
import TableContext from '../TableContext'

/**
---
parent: Table
id: Table.Row
---
**/
@withStyle(generateStyle)
class Row extends Component<TableRowProps> {
  static readonly componentId = 'Table.Row'
  static contextType = TableContext
  declare context: ContextType<typeof TableContext>
  static allowedProps = allowedProps

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    this.props.makeStyles?.({
      isStacked: this.context.isStacked,
      hover: this.context.hover
    })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({
      isStacked: this.context.isStacked,
      hover: this.context.hover
    })
  }

  render() {
    const { children, styles } = this.props
    const isStacked = this.context.isStacked
    const headers = this.context.headers

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
            if (isValidElement(child)) {
              return safeCloneElement(child, {
                key: (child as ReactElement<any>).props.name,
                // used by `Cell` to render its column title in `stacked` layout
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
