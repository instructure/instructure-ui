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
import { Component, Children, ReactElement } from 'react'

import {
  omitProps,
  matchComponentTypes,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { ColHeader } from '../ColHeader'
import { RowHeader } from '../RowHeader'
import { Cell } from '../Cell'
import type { TableRowProps } from './props'
import { allowedProps, propTypes } from './props'

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
            if (matchComponentTypes(child, [ColHeader])) {
              return child
            }
            if (matchComponentTypes(child, [RowHeader])) {
              return safeCloneElement(child as ReactElement, {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
                key: child.props.name,
                isStacked
              })
            }
            if (matchComponentTypes(child, [Cell])) {
              return safeCloneElement(child as ReactElement, {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
                key: child.props.name,
                isStacked,
                header: headers && headers[index]
              })
            }
            return null
          })}
      </View>
    )
  }
}

export default Row
export { Row }
