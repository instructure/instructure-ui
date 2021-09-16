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
  matchComponentTypes,
  safeCloneElement,
  omitProps
} from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Row } from '../Row'
import type { TableBodyProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Table
id: Table.Body
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Body extends Component<TableBodyProps> {
  static readonly componentId = 'Table.Body'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles?.()
  }

  render() {
    const { children, hover, isStacked, headers, styles } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Body.allowedProps), Body)}
        as={isStacked ? 'div' : 'tbody'}
        css={styles?.body}
        role={isStacked ? 'rowgroup' : undefined}
      >
        {Children.map(children, (child) =>
          matchComponentTypes(child, [Row])
            ? safeCloneElement(child as ReactElement, {
                // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
                key: child.props.name,
                hover,
                isStacked,
                headers
              })
            : null
        )}
      </View>
    )
  }
}

export default Body
export { Body }
