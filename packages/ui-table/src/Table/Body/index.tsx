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

import { safeCloneElement, omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { withStyleRework as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TableBodyProps } from './props'
import { allowedProps } from './props'
import TableContext from '../TableContext'

/**
---
parent: Table
id: Table.Body
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Body extends Component<TableBodyProps> {
  static readonly componentId = 'Table.Body'
  static contextType = TableContext
  declare context: ContextType<typeof TableContext>
  static allowedProps = allowedProps
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
    const { children, styles } = this.props
    const { isStacked } = this.context

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Body.allowedProps), Body)}
        as={isStacked ? 'div' : 'tbody'}
        css={styles?.body}
        role={isStacked ? 'rowgroup' : undefined}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return safeCloneElement(child, {
              key: (child as ReactElement<any>).props.name
            })
          }
          return child
        })}
      </View>
    )
  }
}

export default Body
export { Body }
